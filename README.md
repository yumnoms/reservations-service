# Reservations

This reservations service for YumNoms mimics the interface used for Yelp Restaurants reservations.

## Related Projects

  - https://github.com/yumnoms/reviews-service
  - https://github.com/yumnoms/popular-dishes-service
  - https://github.com/yumnoms/photo-carousel-service
  - https://github.com/yumnoms/Laurence-Nguyen-proxy

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)


## Usage

### Setting up database/seeding data

For mySQL, if student/student user does not exist,
run mySQL and run:

```sh
CREATE USER 'student'@'localhost' IDENTIFIED BY 'student';
```

and then in root directory of terminal:

```sh
mysql -u student -p < server/schema.sql  // password is student
npm run seed
```

### Generate bundle.js file and start

```sh
npm run build
npm run start
```

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development


### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```