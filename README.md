# cc19-project.continuous-delivery-vue-b
DATABASE SETUP

be sure to run npm install with dependencies 
1. in 'knex.js'  change line 7 with the proper database name
2. create a database from PSQL with 'create database bmt'
3. USERS will run npm migrate and npm run seed. devs must create this script in the scripts of package.json
4. create a knexfile by npx knex init
5. set up graphQL for query builder
 
 # Project Title

One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites



```
npm install
```

### Installing

Everything you need is in the package.json, so just a basic install from your package manager of choice will suffuce:

```
npm install
```

If you are deploying via heroku, you might want to install the heroku CLI as well:

```
npm run heroku
```

Next, create a .env file and populate it with the following:

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

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc