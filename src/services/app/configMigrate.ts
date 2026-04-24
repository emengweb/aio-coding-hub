import { commands, type ConfigImportResult } from "../../generated/bindings";
import { invokeGeneratedIpc, type GeneratedCommandResult } from "../generatedIpc";
import { createRiskyIpcConfirm } from "../ipcConfirm";

export type { ConfigImportResult } from "../../generated/bindings";

export async function configExport(filePath: string) {
  return invokeGeneratedIpc<boolean>({
    title: "导出配置失败",
    cmd: "config_export",
    args: { filePath },
    invoke: () => commands.configExport(filePath) as Promise<GeneratedCommandResult<boolean>>,
  });
}

export async function configImport(filePath: string) {
  const confirm = createRiskyIpcConfirm("config_import", filePath);
  return invokeGeneratedIpc<ConfigImportResult>({
    title: "导入配置失败",
    cmd: "config_import",
    args: { filePath, confirm },
    invoke: () =>
      commands.configImport(filePath, confirm) as Promise<
        GeneratedCommandResult<ConfigImportResult>
      >,
  });
}
