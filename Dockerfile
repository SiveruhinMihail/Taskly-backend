FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm install -g nodemon
EXPOSE 3001
CMD ["npm", "start"]