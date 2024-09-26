# Project M223 Group 6

The goal of our project was to create a full-stack multi-user application using Spring Boot and React.

## Tooling
For the tooling, we use and recommend having the following installed:

- Docker for providing the PostgreSQL database.
- Java installed and ready to use.
- Gradle installed for building our backend.
- For test purposes, Postman is strongly recommended.
- DBeaver for inspecting the database.
- Git as the version control system.

## Setup Frontend

**1. Clone the repository:**

In your project directory, open a terminal and run the following command:

```
git clone https://github.com/doeme07/M223_Jasmin_Dominic_Frontend.git
```

**2. Install Yarn (as the package manager):**

In your project directory, run the following command:

```
yarn install
```

**3. Deploying the Webserver:**

In your project directory, run the following command:

```
yarn run
```

This should automatically open your browser with our page.

## Setup Backend

**1. Clone the repository:**

```
git clone https://github.com/doeme07/M223_Jasmin_Dominic_Backend.git
```

**2. Create the Docker container:**

Run this command in your terminal to create and run your Docker container containing the PostgreSQL database. Make sure you have Docker installed and running (you can check by executing `docker -v` in your Windows terminal).

```
docker run --name postgres_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

**3. Run the Project:**

Execute the following Gradle task in your project directory:

```
./gradlew bootRun
```

Now you are all set up. Enjoy!

## User Credentials (Test Purposes)

In order to test the application, use the following credentials:

- User:
    - Email: user@example.com
    - Password: 1234
- Admin:
    - Email: admin@example.com
    - Password: 1234

At the end we Tested our application with Lighthouse and this is the resultat:
![Screenshot 2024-02-29 160753](https://github.com/doeme07/M223_Jasmin_Dominic_Frontend/assets/112725311/bbd7d84f-ff50-439a-9480-a30e7abc51c7)
