# ARG NODE_ALPINE=node:22-alpine
# FROM ${NODE_ALPINE} AS builder
# WORKDIR /app
# COPY ./package*.json ./
# COPY ./tsconfig*.json ./
# COPY ./src ./src
# ARG NPMRC
# RUN echo "$NPMRC" > ./.npmrc
# ENV PATH /app/node_modules/.bin:$PATH
# RUN npm ci
# RUN npm run build

# FROM ${NODE_ALPINE} AS runner
# WORKDIR /app
# RUN apk add --no-cache bash graphicsmagick ghostscript
# COPY --from=builder /app/package.json /app/package.json
# COPY --from=builder /app/package-lock.json /app/package-lock.json
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/node_modules /app/node_modules
# COPY --from=builder /app/src/static ./src/static
# # For excel google files
# COPY ./config/credentials/google/careful-synapse-309410-f9273fb361cc.json /app/config/credentials/google/careful-synapse-309410-f9273fb361cc.json
# RUN mkdir -p /app/tmp && chmod 777 /app/tmp

# CMD ["node", "dist/main.js"]
