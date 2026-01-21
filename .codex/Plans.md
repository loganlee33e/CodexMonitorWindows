# Plans

## Windows Adaptation
- Audit platform-specific backend behaviors (Tauri config, terminal spawning, open-with commands) and map Windows-safe equivalents.
- Add Windows-aware UI/platform handling (platform class, path joins, Explorer labels, titlebar spacing) while keeping mac styling intact.
- Validate with lint, tests, and typecheck; fix any regressions.
