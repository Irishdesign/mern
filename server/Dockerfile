FROM node:12-alpine
WORKDIR /app
COPY --from=builder /app/dist /app
COPY package.json /app/package.json
RUN npm install --only=prod
EXPOSE 8080 
USER node
CMD ["node", "index.js"]