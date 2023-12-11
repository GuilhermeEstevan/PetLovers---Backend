FROM node:18

WORKDIR /app

COPY package*.json /app

# Instalar as dependências
RUN npm install

COPY . /app

ENV PORT=3000


CMD ["npm", "run", "dev"]
