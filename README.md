# cc19-project.continuous-delivery-vue-b
DATABASE SETUP

be sure to run npm install with dependencies 
1. in 'knex.js'  change line 7 with the proper database name
2. create a database from PSQL with 'create database bmt'
3. USERS will run npm migrate and npm run seed. devs must create this script in the scripts of package.json
4. create a knexfile by npx knex init
5. set up graphQL for query builder
