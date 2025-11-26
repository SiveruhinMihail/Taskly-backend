# Multi-stage build
FROM node:18-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Development stage
FROM node:18-alpine AS development
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/node_modules ./node_modules
COPY package*.json ./
CMD ["npm", "run", "dev"]

# Production stage (уже рабочий)  
FROM base AS production
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/node_modules ./node_modules
COPY . .
CMD ["npm", "start"]