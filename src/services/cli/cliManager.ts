import {
  commands,
  type ClaudeCliInfo as GeneratedClaudeCliInfo,
  type ClaudeEnvState as GeneratedClaudeEnvState,
  type ClaudeSettingsPatch as GeneratedClaudeSettingsPatch,
  type ClaudeSettingsState as GeneratedClaudeSettingsState,
  type CodexConfigPatch as GeneratedCodexConfigPatch,
  type CodexConfigState as GeneratedCodexConfigState,
  type CodexConfigTomlState as GeneratedCodexConfigTomlState,
  type CodexConfigTomlValidationError as GeneratedCodexConfigTomlValidationError,
  type CodexConfigTomlValidationResult as GeneratedCodexConfigTomlValidationResult,
  type GeminiConfigPatch as GeneratedGeminiConfigPatch,
  type GeminiConfigState as GeneratedGeminiConfigState,
  type SimpleCliInfo as GeneratedSimpleCliInfo,
} from "../../generated/bindings";
import { invokeGeneratedIpc, type GeneratedCommandResult } from "../generatedIpc";

export type ClaudeCliInfo = GeneratedClaudeCliInfo;
export type SimpleCliInfo = GeneratedSimpleCliInfo;
export type ClaudeEnvState = GeneratedClaudeEnvState;
export type ClaudeSettingsState = GeneratedClaudeSettingsState;
export type ClaudeSettingsPatch = Partial<GeneratedClaudeSettingsPatch>;
export type CodexConfigState = GeneratedCodexConfigState;
export type CodexConfigPatch = Partial<GeneratedCodexConfigPatch>;
export type CodexConfigTomlState = GeneratedCodexConfigTomlState;
export type CodexConfigTomlValidationError = GeneratedCodexConfigTomlValidationError;
export type CodexConfigTomlValidationResult = GeneratedCodexConfigTomlValidationResult;
export type GeminiConfigState = GeneratedGeminiConfigState;
export type GeminiConfigPatch = Partial<GeneratedGeminiConfigPatch>;

function toCodexConfigPatch(patch: CodexConfigPatch) {
  return {
    model: patch.model ?? null,
    approval_policy: patch.approval_policy ?? null,
    sandbox_mode: patch.sandbox_mode ?? null,
    model_reasoning_effort: patch.model_reasoning_effort ?? null,
    plan_mode_reasoning_effort: patch.plan_mode_reasoning_effort ?? null,
    web_search: patch.web_search ?? null,
    personality: patch.personality ?? null,
    model_context_window: patch.model_context_window ?? null,
    model_auto_compact_token_limit: patch.model_auto_compact_token_limit ?? null,
    service_tier: patch.service_tier ?? null,
    sandbox_workspace_write_network_access: patch.sandbox_workspace_write_network_access ?? null,
    features_unified_exec: patch.features_unified_exec ?? null,
    features_shell_snapshot: patch.features_shell_snapshot ?? null,
    features_apply_patch_freeform: patch.features_apply_patch_freeform ?? null,
    features_shell_tool: patch.features_shell_tool ?? null,
    features_exec_policy: patch.features_exec_policy ?? null,
    features_remote_compaction: patch.features_remote_compaction ?? null,
    features_fast_mode: patch.features_fast_mode ?? null,
    features_responses_websockets_v2: patch.features_responses_websockets_v2 ?? null,
    features_multi_agent: patch.features_multi_agent ?? null,
  };
}

function toGeminiConfigPatch(patch: GeminiConfigPatch) {
  return {
    modelName: patch.modelName ?? null,
    modelMaxSessionTurns: patch.modelMaxSessionTurns ?? null,
    modelCompressionThreshold: patch.modelCompressionThreshold ?? null,
    defaultApprovalMode: patch.defaultApprovalMode ?? null,
    enableAutoUpdate: patch.enableAutoUpdate ?? null,
    enableNotifications: patch.enableNotifications ?? null,
    vimMode: patch.vimMode ?? null,
    retryFetchErrors: patch.retryFetchErrors ?? null,
    maxAttempts: patch.maxAttempts ?? null,
    uiTheme: patch.uiTheme ?? null,
    uiHideBanner: patch.uiHideBanner ?? null,
    uiHideTips: patch.uiHideTips ?? null,
    uiShowLineNumbers: patch.uiShowLineNumbers ?? null,
    uiInlineThinkingMode: patch.uiInlineThinkingMode ?? null,
    usageStatisticsEnabled: patch.usageStatisticsEnabled ?? null,
    sessionRetentionEnabled: patch.sessionRetentionEnabled ?? null,
    sessionRetentionMaxAge: patch.sessionRetentionMaxAge ?? null,
    planModelRouting: patch.planModelRouting ?? null,
    securityAuthSelectedType: patch.securityAuthSelectedType ?? null,
  };
}

function toClaudeSettingsPatch(patch: ClaudeSettingsPatch) {
  return {
    model: patch.model ?? null,
    output_style: patch.output_style ?? null,
    language: patch.language ?? null,
    always_thinking_enabled: patch.always_thinking_enabled ?? null,
    show_turn_duration: patch.show_turn_duration ?? null,
    spinner_tips_enabled: patch.spinner_tips_enabled ?? null,
    terminal_progress_bar_enabled: patch.terminal_progress_bar_enabled ?? null,
    respect_gitignore: patch.respect_gitignore ?? null,
    disable_git_participant: patch.disable_git_participant ?? null,
    permissions_allow: patch.permissions_allow ?? null,
    permissions_ask: patch.permissions_ask ?? null,
    permissions_deny: patch.permissions_deny ?? null,
    env_mcp_timeout_ms: patch.env_mcp_timeout_ms ?? null,
    env_mcp_tool_timeout_ms: patch.env_mcp_tool_timeout_ms ?? null,
    env_experimental_agent_teams: patch.env_experimental_agent_teams ?? null,
    env_claude_code_auto_compact_window: patch.env_claude_code_auto_compact_window ?? null,
    env_disable_background_tasks: patch.env_disable_background_tasks ?? null,
    env_disable_terminal_title: patch.env_disable_terminal_title ?? null,
    env_claude_bash_no_login: patch.env_claude_bash_no_login ?? null,
    env_claude_code_attribution_header: patch.env_claude_code_attribution_header ?? null,
    env_claude_code_blocking_limit_override:
      patch.env_claude_code_blocking_limit_override ?? null,
    env_claude_code_max_output_tokens: patch.env_claude_code_max_output_tokens ?? null,
    env_enable_experimental_mcp_cli: patch.env_enable_experimental_mcp_cli ?? null,
    env_enable_tool_search: patch.env_enable_tool_search ?? null,
    env_max_mcp_output_tokens: patch.env_max_mcp_output_tokens ?? null,
    env_claude_code_disable_nonessential_traffic:
      patch.env_claude_code_disable_nonessential_traffic ?? null,
    env_claude_code_disable_1m_context: patch.env_claude_code_disable_1m_context ?? null,
    env_claude_code_proxy_resolves_hosts: patch.env_claude_code_proxy_resolves_hosts ?? null,
    env_claude_code_skip_prompt_history: patch.env_claude_code_skip_prompt_history ?? null,
  };
}

export async function cliManagerClaudeInfoGet() {
  return invokeGeneratedIpc<ClaudeCliInfo>({
    title: "获取 Claude CLI 信息失败",
    cmd: "cli_manager_claude_info_get",
    invoke: () =>
      commands.cliManagerClaudeInfoGet() as Promise<GeneratedCommandResult<ClaudeCliInfo>>,
  });
}

export async function cliManagerCodexInfoGet() {
  return invokeGeneratedIpc<SimpleCliInfo>({
    title: "获取 Codex CLI 信息失败",
    cmd: "cli_manager_codex_info_get",
    invoke: () =>
      commands.cliManagerCodexInfoGet() as Promise<GeneratedCommandResult<SimpleCliInfo>>,
  });
}

export async function cliManagerCodexConfigGet() {
  return invokeGeneratedIpc<CodexConfigState>({
    title: "读取 Codex 配置失败",
    cmd: "cli_manager_codex_config_get",
    invoke: () =>
      commands.cliManagerCodexConfigGet() as Promise<GeneratedCommandResult<CodexConfigState>>,
  });
}

export async function cliManagerCodexConfigSet(patch: CodexConfigPatch) {
  const normalizedPatch = toCodexConfigPatch(patch);
  return invokeGeneratedIpc<CodexConfigState>({
    title: "保存 Codex 配置失败",
    cmd: "cli_manager_codex_config_set",
    args: { patch: normalizedPatch },
    invoke: () =>
      commands.cliManagerCodexConfigSet(normalizedPatch) as Promise<
        GeneratedCommandResult<CodexConfigState>
      >,
  });
}

export async function cliManagerCodexConfigTomlGet() {
  return invokeGeneratedIpc<CodexConfigTomlState>({
    title: "读取 Codex TOML 配置失败",
    cmd: "cli_manager_codex_config_toml_get",
    invoke: () =>
      commands.cliManagerCodexConfigTomlGet() as Promise<
        GeneratedCommandResult<CodexConfigTomlState>
      >,
  });
}

export async function cliManagerCodexConfigTomlValidate(toml: string) {
  return invokeGeneratedIpc<CodexConfigTomlValidationResult>({
    title: "校验 Codex TOML 配置失败",
    cmd: "cli_manager_codex_config_toml_validate",
    args: { toml },
    invoke: () =>
      commands.cliManagerCodexConfigTomlValidate(toml) as Promise<
        GeneratedCommandResult<CodexConfigTomlValidationResult>
      >,
  });
}

export async function cliManagerCodexConfigTomlSet(toml: string) {
  return invokeGeneratedIpc<CodexConfigState>({
    title: "保存 Codex TOML 配置失败",
    cmd: "cli_manager_codex_config_toml_set",
    args: { toml },
    invoke: () =>
      commands.cliManagerCodexConfigTomlSet(toml) as Promise<
        GeneratedCommandResult<CodexConfigState>
      >,
  });
}

export async function cliManagerGeminiInfoGet() {
  return invokeGeneratedIpc<SimpleCliInfo>({
    title: "获取 Gemini CLI 信息失败",
    cmd: "cli_manager_gemini_info_get",
    invoke: () =>
      commands.cliManagerGeminiInfoGet() as Promise<GeneratedCommandResult<SimpleCliInfo>>,
  });
}

export async function cliManagerGeminiConfigGet() {
  return invokeGeneratedIpc<GeminiConfigState>({
    title: "读取 Gemini 配置失败",
    cmd: "cli_manager_gemini_config_get",
    invoke: () =>
      commands.cliManagerGeminiConfigGet() as Promise<
        GeneratedCommandResult<GeminiConfigState>
      >,
  });
}

export async function cliManagerGeminiConfigSet(patch: GeminiConfigPatch) {
  const normalizedPatch = toGeminiConfigPatch(patch);
  return invokeGeneratedIpc<GeminiConfigState>({
    title: "保存 Gemini 配置失败",
    cmd: "cli_manager_gemini_config_set",
    args: { patch: normalizedPatch },
    invoke: () =>
      commands.cliManagerGeminiConfigSet(normalizedPatch) as Promise<
        GeneratedCommandResult<GeminiConfigState>
      >,
  });
}

export async function cliManagerClaudeEnvSet(input: {
  mcp_timeout_ms: number | null;
  disable_error_reporting: boolean;
}) {
  return invokeGeneratedIpc<ClaudeEnvState>({
    title: "保存 Claude 环境变量失败",
    cmd: "cli_manager_claude_env_set",
    args: {
      mcpTimeoutMs: input.mcp_timeout_ms,
      disableErrorReporting: input.disable_error_reporting,
    },
    invoke: () =>
      commands.cliManagerClaudeEnvSet(
        input.mcp_timeout_ms,
        input.disable_error_reporting
      ) as Promise<GeneratedCommandResult<ClaudeEnvState>>,
  });
}

export async function cliManagerClaudeSettingsGet() {
  return invokeGeneratedIpc<ClaudeSettingsState>({
    title: "读取 Claude 设置失败",
    cmd: "cli_manager_claude_settings_get",
    invoke: () =>
      commands.cliManagerClaudeSettingsGet() as Promise<
        GeneratedCommandResult<ClaudeSettingsState>
      >,
  });
}

export async function cliManagerClaudeSettingsSet(patch: ClaudeSettingsPatch) {
  const normalizedPatch = toClaudeSettingsPatch(patch);
  return invokeGeneratedIpc<ClaudeSettingsState>({
    title: "保存 Claude 设置失败",
    cmd: "cli_manager_claude_settings_set",
    args: { patch: normalizedPatch },
    invoke: () =>
      commands.cliManagerClaudeSettingsSet(normalizedPatch) as Promise<
        GeneratedCommandResult<ClaudeSettingsState>
      >,
  });
}
