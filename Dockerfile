FROM node:latest
RUN npm i -g pnpm
WORKDIR /app/
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm install
RUN pnpm build
CMD ["pnpm", "start"]