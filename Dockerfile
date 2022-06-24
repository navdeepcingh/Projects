FROM node:14
WORKDIR /app
COPY package-lock.jason ./
RUN npm install
COPY . . 
EXPOSE 8080
CMD ["node","assesment.js"]


