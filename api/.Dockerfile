version: '3.8'
name: code_service
services:
  app:
    build:
      context: .
      dockerfile: deployment/image/Dockerfile_api
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    environment:
      - TZ=America/Caracas
    env_file:
      - .env
    restart: always