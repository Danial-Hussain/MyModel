FROM node:15.13-alpine
WORKDIR /react
COPY ./package.json ./
COPY ./tsconfig.json ./
COPY ./package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]