FROM node:21.7.3-alpine AS builder

WORKDIR /main

RUN apk add --no-cache libc6-compat

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build
RUN yarn next telemetry disable
RUN yarn install --production --ignore-scripts --prefer-offline --frozen-lockfile

FROM node:21.7.3-alpine AS runner

RUN apk add --no-cache tini

WORKDIR /main

ENV NODE_ENV=production


RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /main/node_modules ./node_modules
COPY --from=builder /main/public ./public
COPY --from=builder --chown=nextjs:nodejs /main/.next ./.next
COPY --from=builder /main/package.json ./
COPY --from=builder /main/next.config.js ./
COPY --from=builder /main/entry-point.sh ./

USER nextjs
EXPOSE 3000

ENTRYPOINT ["/bin/sh", "/main/entry-point.sh"]
