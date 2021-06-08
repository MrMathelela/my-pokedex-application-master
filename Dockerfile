FROM node:16.3.0-alpine
WORKDIR /core
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm run build
CMD ["npm","start"]