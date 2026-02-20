#!/bin/bash
set -euo pipefail

# Install frontend dependencies
cd frontend && bun install && cd ..

# Install backend dependencies
cd backend && bun install && cd ..

# Install Biome globally
bun install -g @biomejs/biome

echo "Sukces! Kontainer sudah siap digunakan."
