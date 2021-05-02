This app was created during our time as students at Code Chrysalis

# restfinder - an app for finding Flying K highway rest stops

**restfinder** is our first fullstack group project application, using the [Google Maps Platform](https://developers.google.com/maps).
  This project was an opportunity for us to gain experience working in a real Agile workflow on a realistic CD pipeline. As well as to be
  able to create a full stack application from scratch, based on employer expectations and user stories.


## Built With

* [Vuex] UI
* [Knex] Query Builder
* [ApolloServer] Serves queries
* [Graphql] API Queries
* [Postgres] Database

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### Installing

Everything you need is in the package.json, so just a basic install from your package manager of choice will suffuce:

```
npm install
```

Next, create a .env file in the root directory and populate it with the following:

** FOR WINDOWS USERS **

```
DB_NAME= // your database name
DB_USER=postgres
DB_PW=// your postgres password
DB_HOST=localhost
```

** FOR MAC USERS **

```
DB_NAME= // your database name
DB_USER=// your postgres username
DB_PW=// your postgres password
DB_HOST=localhost
```

Head over to your postgres terminal and create a local database with whatever name you entered for DB_NAME in your .env file, and then run

```
npm run migrate
npm run seed
```

You can then start the two dev servers (in separate terminals):

```
npm run hack:client
npm run hack:server
```

And then open your localhost8080 to see the site in action!

Note: the servers will automatically run a migration and seed.

## Running the tests

Query tests are set up using chai and mocha, and can be run with 

```
npm run test
```

WHAT DO THE TESTS TEST?

## Deployment

We deployed with Heroku. It makes sense to have the heroku CLI installed:

```
npm install heroku
```

Additionally, Heroku Postgres is a prerequisite for hosting over there.


## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

// this needs to be fleshed out


## Authors

* **Ken** - [CC19](https://github.com/********)
* **Alix** - [CC19](https://github.com/********)
* **Will** - [CC19](https://github.com/********)
* **Evan** - [CC19](https://github.com/Evomatic)
* **Pete Griffith** - [CC19](https://github.com/griffitp12)


## License

?????

## Acknowledgments

* Google
* Stack Overflow
* tha bmts
