FROM node:latest
RUN npm i -g pnpm
WORKDIR /app/
COPY . .
RUN pnpm install
RUN pnpm build
CMD ["pnpm", "start"]