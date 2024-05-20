FROM node:20-alpine3.16
WORKDIR /app

COPY . .
RUN npm install && npm cache clean --force && npm install -g typescript
RUN npm run build
CMD ["npm", "run", "preview"]