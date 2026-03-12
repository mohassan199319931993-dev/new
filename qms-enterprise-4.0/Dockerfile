# Root convenience image builds backend service by default.
FROM node:20-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --omit=dev
COPY backend/src ./src
EXPOSE 8080
CMD ["node", "src/server.js"]
