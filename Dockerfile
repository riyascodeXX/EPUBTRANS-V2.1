FROM node:22-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_SERVER_URL=http://localhost:3000
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL NEXT_TELEMETRY_DISABLED=1 PAYLOAD_SECRET=build-only-placeholder-not-a-runtime-secret
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0 NEXT_TELEMETRY_DISABLED=1 PRIVATE_UPLOAD_DIR=/app/private-uploads
RUN addgroup -S -g 1001 epubtrans && adduser -S -u 1001 -G epubtrans epubtrans
COPY --from=builder --chown=epubtrans:epubtrans /app/.next/standalone ./
COPY --from=builder --chown=epubtrans:epubtrans /app/.next/static ./.next/static
COPY --from=builder --chown=epubtrans:epubtrans /app/public ./public
# Payload's migration CLI needs its TS config, migrations and dependencies.
COPY --from=builder --chown=epubtrans:epubtrans /app/node_modules ./node_modules
COPY --from=builder --chown=epubtrans:epubtrans /app/src ./src
COPY --from=builder --chown=epubtrans:epubtrans /app/package.json /app/tsconfig.json ./
COPY --from=builder --chown=epubtrans:epubtrans /app/scripts ./scripts
RUN mkdir -p /app/private-uploads /app/public/media && chown -R epubtrans:epubtrans /app/private-uploads /app/public/media
USER epubtrans
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=45s CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node","server.js"]
