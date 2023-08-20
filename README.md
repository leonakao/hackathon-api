<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

This repository contains one of three parts of the project for Hackathon 2023, organized by Quero Educação.

Team: Chutei o Bard

The **Hackathon-api** has been developed using the following technologies and practices:

- NestJs -> A code base framework chosen to improve our delivery speed.
- JWT -> A secure way to implement authentication without adding unnecessary complexity.
- TypeOrm -> A tool that helps us maintain good practices while interacting with the database.
- AWS -> Our project is currently hosted on the AWS Cloud.
- Presentation - Domain - Data Layer -> A minimal architectural pattern.
- DDD -> Domain-Driven Design.
- YAGNI -> You Ain't Gonna Need It - Emphasizes not adding functionality until deemed necessary.
- KISS -> Keep It Simple and Stupid - Advocates for simplicity in design and code.
- Clean Code -> Focuses on keeping the code clear and easy to understand.

## Installation

This project was developed using Docker:

```bash
# Create a .env file from .env.example. Make sure that all environment variables have the correct values.
cp .env.example .env

# Start the project using Docker
docker-compose up -d
```
## Test

This application focus the test inside the Domain Layer.

After start the application using Docker, tests can be called with:

```bash
# Run all tests
docker-compose exec app npm run test

# Run coverage
docker-compose exec app npm run test:cov
```

## Database Modeling

![image](https://github.com/leonakao/hackathon-api/assets/49794183/63a2f92d-f6c0-4054-9cec-6589d389330a)


## API Project Architecture

![image](https://github.com/leonakao/hackathon-api/assets/49794183/41eff641-4b29-4f53-b462-3c1cbaa511c7)

## Project Architecture

![image](https://github.com/leonakao/hackathon-api/assets/49794183/795c410c-badb-4ad7-8ecf-b82cbab0edf0)

Considering our team's distribution, we decided to separate our project into 3 parts:

Hackathon-front

Hackathon-api

Hackathon-ia

This approach allows us to maintain a fast delivery pace with minimal impact on other contexts.

Another advantage is that, in terms of scaling the project, our IA project requires more resources than our API. Therefore, keeping them separated is advantageous.

## Explanation

- **Hackathon-front** only integrates with Hackathon-api.
- **Hackathon-front** is responsible for all UI and user interactions.
- **Hackathon-api** ensures that all our domain logic is implemented correctly.
- **Hackathon-ia** watches the summary queue (populated by the API) and processes the file to generate a summary PDF.
- **Hackathon-ia** updates the status and links directly in the database once the process is finished.
