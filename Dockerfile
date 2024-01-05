FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install \
    && npm cache clean --force

# ENV PORT=3000
# ENV URI=
# ENV JWT_SECRET_KEY=HIBRO

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]


