#!/bin/bash
set -euo pipefail

# Install root dependencies
bun install

# Install frontend dependencies
cd frontend && bun install && cd ..

# Install backend dependencies
cd backend && bun install && cd ..

echo "Sukces! Kontainer sudah siap digunakan."
