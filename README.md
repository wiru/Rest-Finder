This app was created during our time as students at Code Chrysalis

![src/assets/croc2.png]

# restfinder - an app for finding Flying K highway rest stops

**restfinder** is a fullstack group project application, using the [Google Maps Platform](https://developers.google.com/maps).
  This project was an opportunity for us to gain experience working in a real Agile workflow on a realistic CD pipeline while creating a full stack application from scratch, based on employer expectations and user stories.
You can find the live version in production at: <https://navigatorz.herokuapp.com>

## Built With

* [Vuex](https://vuejs.org) for the UI
* [Knex](http://knexjs.org) Query Builder
* [ApolloServer](https://www.apollographql.com) Serves queries
* [Graphql](https://graphql.org) API Queries
* [Postgres](https://www.postgresql.org) Database

## Overall repo structure
* Configuration files are in the `root` folder.
* Initial seeding data (in a JSON file) is located in the `data` folder.
* In the `migrations` folder are located all the migrations for the PostgreSQL database
* In the `server` folder are located all the files necessary to the back-end node server, and the corresponding test file.
* In the `src` file are located all the source files related with the `client` 


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
The tests are checking whether the GraphQL API returns the proper values for each GraphQL resolver.

## Deployment

We deployed with Heroku. 
Should you want to deploy the app on Heroku servers, we recommend to install the Heroku CLI.
Please refer to the official Heroku help for further details:
<https://devcenter.heroku.com/articles/git>

```
npm install heroku
```

Additionally, Heroku Postgres is a prerequisite for hosting over there.


## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

// this needs to be fleshed out


## Authors

* **Ken** - [CC19](https://github.com/********)
* **Alix** - [CC19](https://github.com/AlixFachin)
* **Will** - [CC19](https://github.com/********)
* **Evan** - [CC19](https://github.com/Evomatic)
* **Pete** - [CC19](https://github.com/griffitp12)


## License

MIT

## Helpful links
* 


