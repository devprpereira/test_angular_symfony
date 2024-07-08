
## Instalation ##
This application was designed to work in Docker containers, this provides security and garantees the application will run smoothly in any device it is running.
To run the application correctly, please, follow the steps described below:

* Install [Docker](https://www.docker.com/products/docker-desktop/) in your machine, if you don't have it yet;
* Download the [the project](https://github.com/devprpereira/test_angular_symfony) from GitHub;
* Open the terminal in project's folder;
* Enter in `Docker` folder:
    * `cd Docker`
* Build and run the Docker containers by typing the following command: 
    * `docker-compose up -d`
    * This can take some time while Docker downloads the images in order to run the containers;
* After the build is up, you'll see a message from Docker saying the containers are running, so you can proceed!
* You should run the following commands to create the `orders` table in Database:
    *  `docker exec symfony php bin/console doctrine:migrations:migrate`
* After this, the database now has `orders` table. It's time to _import data from **orders.json** file_. To do this, you should run the following command in your terminal:
    * `docker exec symfony php bin/console app:import-data`
    * The command above will read _orders.json_ provided file and will update the `orders`table in database; 
* Now you can access Angular's frontend by accessing [localhost:4200](http://localhost:4200).

## Features

The application was designed following the instructions and has these features:

* You can access your database by opening (Adminer)[http://localhost:8080] and use the following credentials:
   * User: `dbUser`; Password: `dbPassword`; Database: `myDatabase`; Server: `db` (name of Docker Service);
* Frontend retrieves all `orders` from backend doing a GET request in the endpoint http://localhost/orders.
* It's possible to cancel an order by clicking in 'Cancel' icon at the last table column. This action will fire a _PUT_ request to the backend in the endpoint http://localhost/orders/{orderid}
* A snackbar is showed everytime an order is cancelled, improving user experience with visual feedback;
* The table is also re-rendered in user's position when a cancel action is fired to show updated  data;
* It's possible to filter orders by customer (search bar) or status (select field);
* The table has pagination, showing 10 items per page. The pagination works also with filtered data;
* The table has a currency mask for Amount column;
* The table has a date mask for "Date" and "Updated At";

## Improves for future
This application could be improved in the future with the following points:
* Create sorting for main columns (Id, Date, Country, Amount, Deleted);
* Create a filter for Delete column;
* Use lazy loading components;