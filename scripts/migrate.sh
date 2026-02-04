#!/usr/bin/env bash
set -euo pipefail

cd services/api
npx prisma migrate deploy
