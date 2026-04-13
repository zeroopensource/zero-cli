---
"@zeroopensource/zero-cli": patch
---

chore: replace cpx with fs copy and bump zero-cliUpdate package configs and lockfile to remove the cpx dependencyand a Node fs-based copy in the zero-cli prepack script.iminates the external c tool favor of a lightweight inlinecopy to avoid an extra and potential version.
