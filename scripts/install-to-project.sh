#!/usr/bin/env bash
set -euo pipefail

target="${1:-.}"
root="/Users/edy/.agents/team-os"

mkdir -p \
  "$target/docs/agent-runs" \
  "$target/docs/team-os" \
  "$target/docs/test-reports" \
  "$target/docs/adr" \
  "$target/docs/okrs" \
  "$target/docs/prd" \
  "$target/docs/ue" \
  "$target/docs/architecture" \
  "$target/docs/release"

cat > "$target/AGENT-TEAM-OS.md" <<'EOF'
# Agent Team OS

This project follows the host-level Agent Team OS:

```text
/Users/edy/.agents/team-os
```

Before product, UE, architecture, engineering, test, release, or operations work:

1. Read `/Users/edy/.agents/team-os/AGENT-TEAM-CHARTER.md`.
2. Read `/Users/edy/.agents/team-os/operating-system/loop-engineering.md`.
3. For meaningful product, UI, architecture, engineering, review, test, release, autonomy, or multi-Agent work, read:
   - `/Users/edy/.agents/team-os/operating-system/capability-registry.md`
   - `/Users/edy/.agents/team-os/operating-system/evidence-standard.md`
   - `/Users/edy/.agents/team-os/operating-system/adversarial-review-protocol.md`
   - `/Users/edy/.agents/team-os/operating-system/task-ledger.md`
4. Select the relevant workflow from `/Users/edy/.agents/team-os/workflows`.
5. Read only the needed role files from `/Users/edy/.agents/team-os/agents`.
6. Keep reusable rules in Team OS.
7. Keep project-specific PRDs, specs, task ledgers, test reports, ADRs, and release notes in this repository.

Default gates:

```text
Product -> UE -> Architecture -> Engineering -> Code Review -> Test -> Release -> Ops
```

Default execution is Loop Engineering: Agents may challenge weak evidence, assign work to each other, and run bounded repair loops before Hermes decides to continue, ship, roll back, or escalate.
EOF

cp "$root/templates/task-ledger.md" "$target/docs/team-os/task-ledger.md"

cat > "$target/docs/agent-runs/.gitkeep" <<'EOF'
EOF

cat > "$target/docs/test-reports/.gitkeep" <<'EOF'
EOF

cat > "$target/docs/adr/.gitkeep" <<'EOF'
EOF

cat > "$target/docs/okrs/.gitkeep" <<'EOF'
EOF

cat > "$target/docs/prd/.gitkeep" <<'EOF'
EOF

cat > "$target/docs/ue/.gitkeep" <<'EOF'
EOF

cat > "$target/docs/architecture/.gitkeep" <<'EOF'
EOF

cat > "$target/docs/release/.gitkeep" <<'EOF'
EOF

echo "Installed Agent Team OS pointer into $target"
echo "Source: $root"
