#!/usr/bin/env bash
set -euo pipefail

target="${1:-.}"
root="/Users/edy/.agents/team-os"

mkdir -p "$target/docs/agent-runs" "$target/docs/test-reports" "$target/docs/adr"

cat > "$target/AGENT-TEAM-OS.md" <<'EOF'
# Agent Team OS

This project follows the host-level Agent Team OS:

```text
/Users/edy/.agents/team-os
```

Before product, UE, architecture, engineering, test, release, or operations work:

1. Read `/Users/edy/.agents/team-os/AGENT-TEAM-CHARTER.md`.
2. Select the relevant workflow from `/Users/edy/.agents/team-os/workflows`.
3. Read only the needed role files from `/Users/edy/.agents/team-os/agents`.
4. Keep reusable rules in Team OS.
5. Keep project-specific PRDs, specs, test reports, ADRs, and release notes in this repository.

Default gates:

```text
Product -> UE -> Architecture -> Engineering -> Code Review -> Test -> Release -> Ops
```
EOF

cat > "$target/docs/agent-runs/.gitkeep" <<'EOF'
EOF

cat > "$target/docs/test-reports/.gitkeep" <<'EOF'
EOF

cat > "$target/docs/adr/.gitkeep" <<'EOF'
EOF

echo "Installed Agent Team OS pointer into $target"
echo "Source: $root"
