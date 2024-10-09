FROM oven/bun:latest

WORKDIR /project

COPY . /project

RUN bun install

RUN bun run build

CMD bun run preview -- --host 0.0.0.0

