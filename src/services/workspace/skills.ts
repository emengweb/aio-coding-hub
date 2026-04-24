import {
  commands,
  type AvailableSkillSummary as GeneratedAvailableSkillSummary,
  type InstalledSkillSummary as GeneratedInstalledSkillSummary,
  type LocalSkillSummary as GeneratedLocalSkillSummary,
  type SkillImportIssue as GeneratedSkillImportIssue,
  type SkillImportLocalBatchReport as GeneratedSkillImportLocalBatchReport,
  type SkillRepoSummary as GeneratedSkillRepoSummary,
  type SkillsPaths as GeneratedSkillsPaths,
  type SkillUpdateInfo as GeneratedSkillUpdateInfo,
} from "../../generated/bindings";
import { invokeGeneratedIpc, type GeneratedCommandResult } from "../generatedIpc";
import { createRiskyIpcConfirm } from "../ipcConfirm";
import type { CliKey } from "../providers/providers";

export type SkillRepoSummary = GeneratedSkillRepoSummary;
export type InstalledSkillSummary = GeneratedInstalledSkillSummary;
export type AvailableSkillSummary = GeneratedAvailableSkillSummary;
export type SkillsPaths = GeneratedSkillsPaths;
export type LocalSkillSummary = GeneratedLocalSkillSummary;
export type SkillImportIssue = GeneratedSkillImportIssue;
export type SkillImportLocalBatchReport = GeneratedSkillImportLocalBatchReport;
export type SkillUpdateInfo = GeneratedSkillUpdateInfo;

export type SkillRepoUpsertInput = {
  repoId?: number | null;
  gitUrl: string;
  branch: string;
  enabled: boolean;
};

export type SkillInstallInput = {
  workspaceId: number;
  gitUrl: string;
  branch: string;
  sourceSubdir: string;
  enabled: boolean;
};

export type SkillInstallToLocalInput = {
  workspaceId: number;
  gitUrl: string;
  branch: string;
  sourceSubdir: string;
};

export type SkillSetEnabledInput = {
  workspaceId: number;
  skillId: number;
  enabled: boolean;
};

export type SkillReturnToLocalInput = {
  workspaceId: number;
  skillId: number;
};

export type SkillLocalDeleteInput = {
  workspaceId: number;
  dirName: string;
};

export type SkillImportLocalInput = {
  workspaceId: number;
  dirName: string;
};

export type SkillsImportLocalBatchInput = {
  workspaceId: number;
  dirNames: string[];
};

export type SkillUpdateInput = {
  workspaceId: number;
  skillId: number;
};

export async function skillReposList() {
  return invokeGeneratedIpc<SkillRepoSummary[]>({
    title: "读取技能仓库列表失败",
    cmd: "skill_repos_list",
    invoke: () => commands.skillReposList() as Promise<GeneratedCommandResult<SkillRepoSummary[]>>,
  });
}

export async function skillRepoUpsert(input: SkillRepoUpsertInput) {
  return invokeGeneratedIpc<SkillRepoSummary>({
    title: "保存技能仓库失败",
    cmd: "skill_repo_upsert",
    args: {
      repoId: input.repoId ?? null,
      gitUrl: input.gitUrl,
      branch: input.branch,
      enabled: input.enabled,
    },
    invoke: () =>
      commands.skillRepoUpsert(
        input.repoId ?? null,
        input.gitUrl,
        input.branch,
        input.enabled
      ) as Promise<GeneratedCommandResult<SkillRepoSummary>>,
  });
}

export async function skillRepoDelete(repoId: number) {
  return invokeGeneratedIpc<boolean>({
    title: "删除技能仓库失败",
    cmd: "skill_repo_delete",
    args: { repoId },
    invoke: () => commands.skillRepoDelete(repoId) as Promise<GeneratedCommandResult<boolean>>,
  });
}

export async function skillsInstalledList(workspaceId: number) {
  return invokeGeneratedIpc<InstalledSkillSummary[]>({
    title: "读取已安装技能失败",
    cmd: "skills_installed_list",
    args: { workspaceId },
    invoke: () =>
      commands.skillsInstalledList(workspaceId) as Promise<
        GeneratedCommandResult<InstalledSkillSummary[]>
      >,
  });
}

export async function skillsDiscoverAvailable(refresh: boolean) {
  return invokeGeneratedIpc<AvailableSkillSummary[]>({
    title: "发现可用技能失败",
    cmd: "skills_discover_available",
    args: { refresh },
    invoke: () =>
      commands.skillsDiscoverAvailable(refresh) as Promise<
        GeneratedCommandResult<AvailableSkillSummary[]>
      >,
  });
}

export async function skillInstall(input: SkillInstallInput) {
  return invokeGeneratedIpc<InstalledSkillSummary>({
    title: "安装技能失败",
    cmd: "skill_install",
    args: {
      workspaceId: input.workspaceId,
      gitUrl: input.gitUrl,
      branch: input.branch,
      sourceSubdir: input.sourceSubdir,
      enabled: input.enabled,
    },
    invoke: () =>
      commands.skillInstall(
        input.workspaceId,
        input.gitUrl,
        input.branch,
        input.sourceSubdir,
        input.enabled
      ) as Promise<GeneratedCommandResult<InstalledSkillSummary>>,
  });
}

export async function skillInstallToLocal(input: SkillInstallToLocalInput) {
  return invokeGeneratedIpc<LocalSkillSummary>({
    title: "安装到当前 CLI 失败",
    cmd: "skill_install_to_local",
    args: {
      workspaceId: input.workspaceId,
      gitUrl: input.gitUrl,
      branch: input.branch,
      sourceSubdir: input.sourceSubdir,
    },
    invoke: () =>
      commands.skillInstallToLocal(
        input.workspaceId,
        input.gitUrl,
        input.branch,
        input.sourceSubdir
      ) as Promise<GeneratedCommandResult<LocalSkillSummary>>,
  });
}

export async function skillSetEnabled(input: SkillSetEnabledInput) {
  return invokeGeneratedIpc<InstalledSkillSummary>({
    title: "更新技能启用状态失败",
    cmd: "skill_set_enabled",
    args: {
      workspaceId: input.workspaceId,
      skillId: input.skillId,
      enabled: input.enabled,
    },
    invoke: () =>
      commands.skillSetEnabled(input.workspaceId, input.skillId, input.enabled) as Promise<
        GeneratedCommandResult<InstalledSkillSummary>
      >,
  });
}

export async function skillUninstall(skillId: number) {
  return invokeGeneratedIpc<boolean>({
    title: "卸载技能失败",
    cmd: "skill_uninstall",
    args: { skillId },
    invoke: () => commands.skillUninstall(skillId) as Promise<GeneratedCommandResult<boolean>>,
  });
}

export async function skillReturnToLocal(input: SkillReturnToLocalInput) {
  return invokeGeneratedIpc<boolean>({
    title: "返回本机技能失败",
    cmd: "skill_return_to_local",
    args: {
      workspaceId: input.workspaceId,
      skillId: input.skillId,
    },
    invoke: () =>
      commands.skillReturnToLocal(input.workspaceId, input.skillId) as Promise<
        GeneratedCommandResult<boolean>
      >,
  });
}

export async function skillsLocalList(workspaceId: number) {
  return invokeGeneratedIpc<LocalSkillSummary[]>({
    title: "读取本地技能列表失败",
    cmd: "skills_local_list",
    args: { workspaceId },
    invoke: () =>
      commands.skillsLocalList(workspaceId) as Promise<GeneratedCommandResult<LocalSkillSummary[]>>,
  });
}

export async function skillLocalDelete(input: SkillLocalDeleteInput) {
  const confirm = createRiskyIpcConfirm(
    "skill_local_delete",
    `workspace:${input.workspaceId}:skill-local:${input.dirName}`
  );
  return invokeGeneratedIpc<boolean>({
    title: "删除本地技能失败",
    cmd: "skill_local_delete",
    args: {
      workspaceId: input.workspaceId,
      dirName: input.dirName,
      confirm,
    },
    invoke: () =>
      commands.skillLocalDelete(input.workspaceId, input.dirName, confirm) as Promise<
        GeneratedCommandResult<boolean>
      >,
  });
}

export async function skillImportLocal(input: SkillImportLocalInput) {
  return invokeGeneratedIpc<InstalledSkillSummary>({
    title: "导入本地技能失败",
    cmd: "skill_import_local",
    args: {
      workspaceId: input.workspaceId,
      dirName: input.dirName,
    },
    invoke: () =>
      commands.skillImportLocal(input.workspaceId, input.dirName) as Promise<
        GeneratedCommandResult<InstalledSkillSummary>
      >,
  });
}

export async function skillsImportLocalBatch(input: SkillsImportLocalBatchInput) {
  return invokeGeneratedIpc<SkillImportLocalBatchReport>({
    title: "批量导入本地技能失败",
    cmd: "skills_import_local_batch",
    args: {
      workspaceId: input.workspaceId,
      dirNames: input.dirNames,
    },
    invoke: () =>
      commands.skillsImportLocalBatch(input.workspaceId, input.dirNames) as Promise<
        GeneratedCommandResult<SkillImportLocalBatchReport>
      >,
  });
}

export async function skillsPathsGet(cliKey: CliKey) {
  return invokeGeneratedIpc<SkillsPaths>({
    title: "读取技能路径失败",
    cmd: "skills_paths_get",
    args: { cliKey },
    invoke: () => commands.skillsPathsGet(cliKey) as Promise<GeneratedCommandResult<SkillsPaths>>,
  });
}

export async function skillCheckUpdates(workspaceId: number) {
  return invokeGeneratedIpc<SkillUpdateInfo[]>({
    title: "检查技能更新失败",
    cmd: "skill_check_updates",
    args: { workspaceId },
    invoke: () =>
      commands.skillCheckUpdates(workspaceId) as Promise<GeneratedCommandResult<SkillUpdateInfo[]>>,
  });
}

export async function skillUpdate(input: SkillUpdateInput) {
  return invokeGeneratedIpc<InstalledSkillSummary>({
    title: "更新技能失败",
    cmd: "skill_update",
    args: {
      workspaceId: input.workspaceId,
      skillId: input.skillId,
    },
    invoke: () =>
      commands.skillUpdate(input.workspaceId, input.skillId) as Promise<
        GeneratedCommandResult<InstalledSkillSummary>
      >,
  });
}
