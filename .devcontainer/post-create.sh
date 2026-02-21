#!/bin/bash
set -euo pipefail

# Install all workspace dependencies
bun install

# Disable Encore stealing your data
cd backend && encore telemetry disable

echo "Sukces! Kontainer sudah siap digunakan."
