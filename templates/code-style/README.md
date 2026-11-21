# Code style templates

Reference configuration of the formatters and linters that [GUIDELINES.md](../../GUIDELINES.md) section 6 fixes for every repository. Copy the files for the languages a repository uses to its root. A repository may tighten a setting; loosening one is an exception, recorded as section 10 of the guidelines says.

| File | Tool |
|---|---|
| `.editorconfig` | editors, and shfmt for shell scripts |
| `.clang-format` | clang-format |
| `.clang-tidy` | clang-tidy |
| `verible-format.flags` | verible-verilog-format, passed as `--flagfile=verible-format.flags` |
| `.rules.verible_lint` | verible-verilog-lint |
| `.prettierrc.json` | Prettier |
| `eslint.config.mjs` | ESLint |
| `ruff.toml` | ruff format and ruff check |
| `rustfmt.toml` | rustfmt |
| `.shellcheckrc` | ShellCheck |
| `PSScriptAnalyzerSettings.psd1` | PSScriptAnalyzer |
