# Build app
FROM node:18.0.0-alpine3.15 as builder

RUN mkdir /app && chown node:node /app
WORKDIR /app

USER node

COPY --chown=node:node package*.json ./
RUN npm ci

COPY --chown=node:node . .
RUN npx prisma generate
RUN npm run build


# Create image
FROM node:18.0.0-alpine3.15

RUN mkdir /app && chown node:node /app
WORKDIR /app

USER node

COPY --chown=node:node --from=builder /app/package*.json ./
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/build ./
COPY --chown=node:node --from=builder /app/startup.sh ./
COPY --chown=node:node --from=builder /app/src/prisma ./prisma

RUN npm prune --production

EXPOSE 3000
CMD [ "./startup.sh" ]
