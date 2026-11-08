#!/usr/bin/env bash
# Audit public/images: classify assets, report reclaimable space, optionally delete.
#   ./scripts/image-audit.sh            -> dry run (default, never deletes)
#   ./scripts/image-audit.sh --apply    -> dry run + typed confirmation + rm
set -euo pipefail
shopt -s nullglob nocasematch

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
IMAGE_DIR="$PROJECT_ROOT/public/images"
APPLY=false
[[ "${1:-}" == "--apply" ]] && APPLY=true

command -v rg >/dev/null || { echo "ripgrep (rg) is required" >&2; exit 1; }
cd "$PROJECT_ROOT"

RG_EXCLUDES=(--hidden -g '!node_modules' -g '!dist' -g '!.git' -g '!public/images/**'
             -g '!.agents/**' -g '!package-lock.json' -g '!scripts/image-audit.sh')

# Referenced if the exact basename appears, or an extension-less template like
# `images/<stem>` + quote / `images/<stem>.${ext}` (so hero-logo.webp doesn't count for hero-logo.png).
is_referenced() {
  local name="$1" stem; stem="$(printf '%s' "${1%.*}" | sed 's/[][\.*^$+?(){}|/]/\\&/g')"
  rg -q -F "${RG_EXCLUDES[@]}" -e "$name" . 2>/dev/null ||
    rg -q "${RG_EXCLUDES[@]}" -e "images/${stem}(['\"\`]|\\.\\\$\\{)" . 2>/dev/null
}

kb() { du -k "$1" | cut -f1; }

# Dynamic paths like `/images/${slug}.webp` make orphan detection unsafe.
DYNAMIC_HITS="$(rg -n "${RG_EXCLUDES[@]}" -e 'images/\$\{' -e "images/['\"]\s*\+" -e '\+\s*['\''"]\.(webp|png|jpe?g)' src index.html 2>/dev/null || true)"

active=() redundant=() orphaned=() legacy_active=()
reclaim_kb=0

for file in "$IMAGE_DIR"/*; do
  [[ -f "$file" ]] || continue
  name="$(basename "$file")" base="${file%.*}" ext="${file##*.}"

  if [[ "$ext" == "webp" ]]; then
    if is_referenced "$name"; then active+=("$name"); else orphaned+=("$file"); fi
    continue
  fi

  # Legacy raster: find a sibling .webp regardless of extension case.
  webp=""
  for cand in "$base".webp "$base".WEBP; do [[ -f "$cand" ]] && webp="$cand" && break; done

  if is_referenced "$name"; then
    legacy_active+=("$name")            # still used directly — never delete
  elif [[ -n "$webp" ]] && is_referenced "$(basename "$webp")"; then
    redundant+=("$file")
  else
    orphaned+=("$file")
  fi
done

print_group() {
  local title="$1"; shift
  local sum=0
  echo -e "\n=== $title (${#}) ==="
  for f in "$@"; do
    local s; s=$(kb "$f"); sum=$((sum + s))
    local tracked="untracked"; git ls-files --error-unmatch "$f" >/dev/null 2>&1 && tracked="git-tracked"
    printf '  %-28s %6sK  %s\n' "$(basename "$f")" "$s" "$tracked"
  done
  echo "  subtotal: ${sum}K"
  reclaim_kb=$((reclaim_kb + sum))
}

echo "=== ACTIVE_WEBP (${#active[@]}) ==="
printf '  %s\n' "${active[@]}"
if ((${#legacy_active[@]})); then
  echo -e "\n=== ACTIVE_LEGACY — referenced non-webp, kept (${#legacy_active[@]}) ==="
  printf '  %s\n' "${legacy_active[@]}"
fi
print_group "REDUNDANT_LEGACY — .webp sibling exists and is referenced" "${redundant[@]}"
print_group "ORPHANED_DEAD — zero references" "${orphaned[@]}"

echo -e "\n=== BROKEN REFERENCES — /images/* paths in code with no file ==="
broken=0
while IFS= read -r ref; do
  [[ -f "public$ref" ]] || { echo "  MISSING: $ref"; broken=1; }
done < <(rg -o --no-filename "${RG_EXCLUDES[@]}" '/images/[A-Za-z0-9._-]+\.[A-Za-z]+' . 2>/dev/null | sort -u)
((broken)) || echo "  none"

total=$(( ${#redundant[@]} + ${#orphaned[@]} ))
echo -e "\nTOTAL slated for deletion: $total files, $(awk "BEGIN{printf \"%.2f\", $reclaim_kb/1024}") MB reclaimable"

if [[ -n "$DYNAMIC_HITS" ]]; then
  echo -e "\n[!] Dynamic image path templates found — orphan results may be false positives:\n$DYNAMIC_HITS"
fi

$APPLY || { echo -e "\nDry run only. Re-run with --apply to delete."; exit 0; }
((total)) || { echo "Nothing to delete."; exit 0; }
[[ -z "$DYNAMIC_HITS" ]] || { echo "Refusing --apply while dynamic templates exist. Review manually." >&2; exit 1; }

read -r -p $'\nType DELETE to remove the files above: ' answer
[[ "$answer" == "DELETE" ]] || { echo "Aborted. Nothing removed."; exit 1; }

rm -v -- "${redundant[@]}" "${orphaned[@]}"
echo "Done. Git-tracked files are recoverable via: git checkout -- public/images/"
