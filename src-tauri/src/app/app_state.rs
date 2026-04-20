//! Usage: Shared Tauri state types and DB initialization gate used by `commands/*`.

use crate::shared::error::AppResult;
use crate::shared::mutex_ext::MutexExt;
use crate::{blocking, db, gateway};
use std::sync::Mutex;
use tauri::Manager;
use tokio::sync::{Mutex as AsyncMutex, MutexGuard};

#[derive(Default)]
pub(crate) struct GatewayState(pub(crate) Mutex<gateway::GatewayManager>);

#[derive(Default)]
pub(crate) struct DbInitState(pub(crate) AsyncMutex<Option<AppResult<db::Db>>>);

pub(crate) fn with_gateway_manager<T, F>(state: &GatewayState, access: F) -> T
where
    F: FnOnce(&gateway::GatewayManager) -> T,
{
    let manager = state.0.lock_or_recover();
    access(&manager)
}

pub(crate) fn with_gateway_manager_mut<T, F>(state: &GatewayState, access: F) -> T
where
    F: FnOnce(&mut gateway::GatewayManager) -> T,
{
    let mut manager = state.0.lock_or_recover();
    access(&mut manager)
}

pub(crate) fn with_app_gateway_manager<R, T, F>(app: &tauri::AppHandle<R>, access: F) -> T
where
    R: tauri::Runtime,
    F: FnOnce(&gateway::GatewayManager) -> T,
{
    let state = app.state::<GatewayState>();
    with_gateway_manager(state.inner(), access)
}

pub(crate) fn with_app_gateway_manager_mut<R, T, F>(app: &tauri::AppHandle<R>, access: F) -> T
where
    R: tauri::Runtime,
    F: FnOnce(&mut gateway::GatewayManager) -> T,
{
    let state = app.state::<GatewayState>();
    with_gateway_manager_mut(state.inner(), access)
}

pub(crate) fn try_with_app_gateway_manager<R, T, F>(
    app: &tauri::AppHandle<R>,
    access: F,
) -> Option<T>
where
    R: tauri::Runtime,
    F: FnOnce(&gateway::GatewayManager) -> T,
{
    app.try_state::<GatewayState>()
        .map(|state| with_gateway_manager(state.inner(), access))
}

pub(crate) async fn ensure_db_ready<R: tauri::Runtime>(
    app: tauri::AppHandle<R>,
    state: &DbInitState,
) -> AppResult<db::Db> {
    let mut guard = state.0.lock().await;
    if let Some(db) = guard.as_ref() {
        return db.clone();
    }

    let db = blocking::run("db_init", move || db::init(&app)).await;
    *guard = Some(db.clone());
    db
}

pub(crate) async fn prepare_db_reset<'a>(
    state: &'a DbInitState,
) -> MutexGuard<'a, Option<AppResult<db::Db>>> {
    let mut guard = state.0.lock().await;
    // Hold the cache lock through file deletion so no concurrent command can
    // recreate the pool midway through a destructive reset.
    let _ = guard.take();
    guard
}
