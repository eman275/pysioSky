# Build Stage
FROM node:18-alpine AS build_image
WORKDIR /app
COPY package*.json ./
COPY patches ./patches/
RUN npm ci --loglevel verbose
RUN npx patch-package
COPY . .
RUN npm run build


# Production Stage
FROM node:18-alpine AS production_stage
WORKDIR /app
COPY --from=build_image /app/package*.json ./
COPY --from=build_image /app/.next ./.next
COPY --from=build_image /app/public ./public
COPY --from=build_image /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]