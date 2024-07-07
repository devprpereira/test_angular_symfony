To run this project, you'll need to run the application in Docker containers.
To do it, you'll need to initialize the containers doing the following steps:

First of all, make sure you have Docker Desktop installed __INSERIR LINK AQUI__
After this, you'll need to enter in the `backend` folder and run the following command:
`cd test_symfony_angular`
`cd backend`
`docker compose build --no-cache`

After this, the backend containers will run smoothly and it's time to build up our frontend containers!

You need, now, to enter in the `frontend` folder and then do the following commands:
`cd ../frontend`
`docker-compose up -d`

After this process, we'll have either front and backend running in your machine!
You can test the application accessing http://localhost:4200 and you'll see the Angular front end.

## Refazer a parte de cima

To run this application, you'll need to do the following steps:
* Install Docker in your machine, if you don't have it yet;
* Run the following commands:
`cd Docker`
`cp .env.dist .env` 
`docker-compose up -d`
* After this, both back and frontend will be ready to access, but we didn't finished the environment setup yet! You must _run the migrations_ to start!
* Run the commands:
 `docker exec -it symfony bash` - you'll enter in the symfony container
 `php bin/console doctrine:migrations:migrate` - you'll run the migration files to create the "order" table
 