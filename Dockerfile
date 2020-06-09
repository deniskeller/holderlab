FROM node:lts-alpine

WORKDIR /app/src
COPY . .
RUN rm -r node_modules/
RUN npm install
RUN npm run build

EXPOSE 3000
# CMD ["npm", "run", "start"]
