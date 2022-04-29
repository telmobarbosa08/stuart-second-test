# Stuart's second test

This source code contains the implementation of a system using the [requirements provided by the Stuart's second test](./TestDescription.md).


## Quick start

### Setup development:
1. Clone the repository with `git clone --depth=1 git@github.com:telmobarbosa08/stuart-second-test.git`
2. CD to directory `cd ..`
3. Install the dependencies with `npm i`
4. Apply database migrations with `npx prisma migrate dev` (you can run a db locally with `docker run -e POSTGRES_PASSWORD=mysecretpassword -d postgres`)
5. Run the application in development mode with `npm run dev`
6. Api will be accessible from `http://localhost:3000/`!
7. Try to make a get request to `http://localhost:3000/healthcheck`

### Deploy locally with docker-compose:
1. Clone the repository with `git clone --depth=1 git@github.com:telmobarbosa08/stuart-second-test.git`
2. CD to directory `cd ..`
3. Run `docker-compose up -d`
4. Try to make a get request to `http://localhost:3000/healthcheck`

### Deploy to AWS Elastic Beanstalk using EB CLI:
1. Clone the repository with `git clone --depth=1 git@github.com:telmobarbosa08/stuart-second-test.git`
2. Init eb project and create the application using `eb init`
3. Create a new environment using `eb create`
4. Everytime you commit a change use `eb deploy` to update the deployment server with new code
5. Run `eb open` to open the api home on the browser


## Additional info:
### Environment variables
- DATABASE_URL - PostgreSQL database connection string
- PORT - API port (default: 3000)
- NODE_ENV - Node environment (default: development)

### API Documentation
- API docs cant be consulted using the swagger-ui at the `/api-docs` url (eg: `http://localhost:3000/api-docs`).
- You can also find postman environment and collection files on the `postman` folder.

### What can be improved with more time
- Documentation
- Create a CI/CD pipeline
- More types of tests to increase test coverage
- Compile using a faster compiler (eg: swc.rs)
