import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { gatewayEventNames } from "../../../../constants/gatewayEvents";
import { useWindowForeground } from "../../../../hooks/useWindowForeground";
import { subscribeGatewayEvent } from "../../../../services/gateway/gatewayEventBus";
import { useHomeFreshnessOwner } from "../useHomeFreshnessOwner";

vi.mock("../../../../hooks/useWindowForeground", () => ({
  useWindowForeground: vi.fn(),
}));

vi.mock("../../../../services/gateway/gatewayEventBus", () => ({
  subscribeGatewayEvent: vi.fn(),
}));

describe("pages/home/hooks/useHomeFreshnessOwner", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
    vi.mocked(subscribeGatewayEvent).mockReturnValue({
      ready: Promise.resolve(),
      unsubscribe: vi.fn(),
    });
  });

  it("coalesces duplicate complete signals into one request logs refresh", async () => {
    vi.useFakeTimers();
    const refreshRequestLogs = vi.fn().mockResolvedValue(null);
    let eventHandler:
      | ((payload: {
          trace_id: string;
          cli_key: string;
          phase: "start" | "complete";
          ts: number;
        }) => void)
      | null = null;

    vi.mocked(subscribeGatewayEvent).mockImplementation((event: string, handler: any) => {
      expect(event).toBe(gatewayEventNames.requestSignal);
      eventHandler = handler;
      return {
        ready: Promise.resolve(),
        unsubscribe: vi.fn(),
      };
    });

    renderHook(() =>
      useHomeFreshnessOwner({
        overviewActive: true,
        foregroundActive: true,
        requestLogsRefreshWindowMs: 1000,
        onRefreshRequestLogs: refreshRequestLogs,
      })
    );

    expect(eventHandler).not.toBeNull();

    act(() => {
      eventHandler?.({ trace_id: "t-1", cli_key: "claude", phase: "start", ts: 1 });
      eventHandler?.({ trace_id: "t-1", cli_key: "claude", phase: "complete", ts: 2 });
      eventHandler?.({ trace_id: "t-1", cli_key: "claude", phase: "complete", ts: 2 });
    });

    expect(refreshRequestLogs).not.toHaveBeenCalled();

    await act(async () => {
      await vi.runOnlyPendingTimersAsync();
      await Promise.resolve();
    });

    expect(refreshRequestLogs).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it("waits for foreground-active state before refreshing after foreground events", async () => {
    vi.useFakeTimers();
    const refreshRequestLogs = vi.fn().mockResolvedValue(null);
    let foregroundArgs: { onForeground: () => void } | null = null;

    vi.mocked(useWindowForeground).mockImplementation((args: any) => {
      foregroundArgs = args;
    });

    const view = renderHook(
      (props: { overviewActive: boolean; foregroundActive: boolean }) =>
        useHomeFreshnessOwner({
          ...props,
          requestLogsRefreshWindowMs: 400,
          onRefreshRequestLogs: refreshRequestLogs,
        }),
      {
        initialProps: {
          overviewActive: true,
          foregroundActive: false,
        },
      }
    );

    act(() => {
      foregroundArgs?.onForeground();
    });

    await act(async () => {
      await vi.runOnlyPendingTimersAsync();
      await Promise.resolve();
    });

    expect(refreshRequestLogs).not.toHaveBeenCalled();

    view.rerender({
      overviewActive: true,
      foregroundActive: true,
    });

    await act(async () => {
      await vi.runOnlyPendingTimersAsync();
      await Promise.resolve();
    });

    expect(refreshRequestLogs).toHaveBeenCalledTimes(1);

    act(() => {
      foregroundArgs?.onForeground();
    });

    await act(async () => {
      await vi.runOnlyPendingTimersAsync();
      await Promise.resolve();
    });

    expect(refreshRequestLogs).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });

  it("drops queued request log refresh when overview leaves foreground", async () => {
    vi.useFakeTimers();
    const refreshRequestLogs = vi.fn().mockResolvedValue(null);
    let eventHandler:
      | ((payload: { trace_id: string; cli_key: string; phase: "complete"; ts: number }) => void)
      | null = null;

    vi.mocked(subscribeGatewayEvent).mockImplementation((event: string, handler: any) => {
      expect(event).toBe(gatewayEventNames.requestSignal);
      eventHandler = handler;
      return {
        ready: Promise.resolve(),
        unsubscribe: vi.fn(),
      };
    });

    const view = renderHook(
      (props: { overviewActive: boolean; foregroundActive: boolean }) =>
        useHomeFreshnessOwner({
          ...props,
          requestLogsRefreshWindowMs: 400,
          onRefreshRequestLogs: refreshRequestLogs,
        }),
      {
        initialProps: {
          overviewActive: true,
          foregroundActive: true,
        },
      }
    );

    act(() => {
      eventHandler?.({ trace_id: "t-1", cli_key: "claude", phase: "complete", ts: 2 });
    });

    view.rerender({
      overviewActive: true,
      foregroundActive: false,
    });

    await act(async () => {
      await vi.runOnlyPendingTimersAsync();
      await Promise.resolve();
    });

    expect(refreshRequestLogs).not.toHaveBeenCalled();
    vi.useRealTimers();
  });
});
