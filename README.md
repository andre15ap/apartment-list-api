# Kiper back

Project developed with Node and Mysql for data base relacional.

login with token and control authenticated, with Mysql, rest application.

### Installation

Requires [Node.js](https://nodejs.org/) v10+ to run and Msql Database.

Create database

```sh
create database kiper;

```

rename file `.env.exemple` for `.env` and insert your DB_USER and DB_PASS

Install the dependencies and devDependencies and start the server.

```sh
$ cd kiper-back
$ yarn
$ yarn sequelize db:migrate
$ yarn dev
```

