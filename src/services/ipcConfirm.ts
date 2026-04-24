import type { RiskyIpcConfirm } from "../generated/bindings";

const DEFAULT_TTL_MS = 60_000;

export function createRiskyIpcConfirm(
  action: string,
  resource: string,
  options?: { ttlMs?: number }
): RiskyIpcConfirm {
  return {
    confirm: {
      action,
      resource,
      nonce: createNonce(),
      issuedAtMs: Date.now(),
      ttlMs: options?.ttlMs ?? DEFAULT_TTL_MS,
    },
  };
}

function createNonce() {
  const cryptoApi = globalThis.crypto;
  if (cryptoApi?.randomUUID) {
    return cryptoApi.randomUUID();
  }

  const bytes = new Uint8Array(16);
  if (cryptoApi?.getRandomValues) {
    cryptoApi.getRandomValues(bytes);
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 18)}`;
}
