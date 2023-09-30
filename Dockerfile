FROM node:alpine
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install react-router-dom --legacy-peer-deps
COPY . /app
CMD ["npm", "start"]
