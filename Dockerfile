FROM node:18.17.0

WORKDIR /app
COPY package.json .
RUN yarn install --save
COPY . .
EXPOSE 8000
CMD ["npm", "start"]