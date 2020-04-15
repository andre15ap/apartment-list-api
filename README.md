# Kiper back

Project developed with Node and Mysql for data base relacional.

login with token and control authenticated, with Mysql, rest application.

### Installation

Requires [Node.js](https://nodejs.org/) v10+ to run and Docker.

Create database

```sh
create database kiper;

```

Install the dependencies and devDependencies and start the server.

```sh
$ cd kiper-back
$ yarn
$ yarn sequelize db:migrate
$ yarn dev
```

