FROM node:20-slim AS base
ENV NEXT_TELEMETRY_DISABLED 1
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS prod-deps
ENV NEXT_TELEMETRY_DISABLED 1
RUN --mount=type=cache,id=npm,target=/npm/store npm install --prod --frozen-lockfile

FROM base AS build
ENV NEXT_TELEMETRY_DISABLED 1
RUN --mount=type=cache,id=npm,target=/npm/store npm install --frozen-lockfile
RUN npm run build

FROM base
ENV NEXT_TELEMETRY_DISABLED 1
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/.next /app/.next
# COPY --from=build /app/dist /app/dist
CMD [ "npm", "start" ]