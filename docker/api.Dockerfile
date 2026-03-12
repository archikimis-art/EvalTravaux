FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./
RUN npm install -g pnpm@9.0.0

COPY . .

RUN pnpm install
RUN pnpm build:api

EXPOSE 3001

CMD ["pnpm", "start:api"]

