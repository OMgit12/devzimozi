FROM node:18-alpine
# Set the working directory
LABEL maintainer="Hariom"
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev && npm audit fix
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
