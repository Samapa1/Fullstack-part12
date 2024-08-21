FROM node:20
  
WORKDIR /usr/src/app

# COPY --chown=node:node . .

COPY . .

RUN npm ci 
# RUN npm install

ENV DEBUG=todo-express-backend:*
  
# USER node

CMD npm start



