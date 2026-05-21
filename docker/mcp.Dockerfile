FROM node:20-alpine AS base

RUN corepack enable && corepack prepare pnpm@10 --activate

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc ./
COPY packages/mcp-server/package.json packages/mcp-server/
RUN pnpm install --frozen-lockfile

FROM base AS runner
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3100
CMD ["pnpm", "--filter", "@knitstudio/mcp-server", "dev"]
