# Used Car Pricing Api
> Use the Api to get an estimate for how much their car is worth based on the make - model - year and mileage.
> Live demo [_here_](https://car-estimator-api.herokuapp.com/). <!-- If you have the project hosted somewhere, include the link here. -->

## Table of Contents
- [](#)
  - [General Information](#general-information)
  - [Technologies Used](#technologies-used)
  - [Features](#features)
  - [Screenshots](#screenshots)
  - [Usage](#usage)
  - [Project Status](#project-status)
  - [Room for Improvement](#room-for-improvement)
  - [Acknowledgements](#acknowledgements)



## General Information
- The general purpose for the project was to learn and understand NestJS and build a professional application
- The idea is to give users a simple way to get an estimate for their car
<!-- - What is the purpose of your project? -->
<!-- - Why did you undertake it? -->
<!-- You don't have to answer all the questions - just the ones relevant to your project. -->


## Technologies Used
- NestJS
- TypeOrm
- SQLite for Dev -> Postgresql for Production


## Features
<!-- List the ready features here: -->
- Users can sign up with email/password
- Users can get an estimate value for their car based on make/model/mileage/year/latitude/longitude
- Users can report what they sold their cars for
- Admins have to approve reported sales


## Screenshots
![Example screenshot](./img/screenshot.png)
<!-- If you have screenshots you'd like to share, include them here. -->


<!-- ## Setup
What are the project requirements/dependencies? Where are they listed? A requirements.txt or a Pipfile.lock file perhaps? Where is it located?

Proceed to describe how to install / setup one's local environment / get started with the project. -->


## Usage
How does one go about using it?
Provide various use cases and code examples here.

### Create a new user
POST https://car-estimator-api.herokuapp.com/auth/signup content-type: application/json

{
  "email": "test-admin@test.com",
  "password": "asdf1234"
}

### Signin as an existing user
POST https://car-estimator-api.herokuapp.com/auth/signin content-type: application/json

{
  "email": "test-admin@test.com",
  "password": "asdf1234"
}

### Get the currently signed in user
GET https://car-estimator-api.herokuapp.com/auth/whoami

### Signout
POST https://car-estimator-api.herokuapp.com/auth/signout

### Find a user with Id
GET https://car-estimator-api.herokuapp.com/auth/3

### Find all users with given email
GET https://car-estimator-api.herokuapp.com/auth?email=asdfghjk@asdf.com

### Delete a user with a given ID
DELETE https://car-estimator-api.herokuapp.com/auth/243

### Update a user
PATCH https://car-estimator-api.herokuapp.com/auth/434 content-Type: application/json

{
  "password": "aaa"
}

### Create a new Report
POST https://car-estimator-api.herokuapp.com/reports content-type: application/json

{
  "make": "ford",
  "model": "mustang",
  "year": 1982,
  "mileage": 50000,
  "lng": 45,
  "lat": 45,
  "price": 20000
}

### Approve an existing report
PATCH https://car-estimator-api.herokuapp.com/reports/15
content-type: application/json

{
  "approved": true
}

### Get an estimate for an existing vehicle
GET https://car-estimator-api.herokuapp.com/reports?make=ford&model=mustang&lng=45&lat=45&mileage=50000&year=1981



## Project Status
Project is: _complete_ / _no longer being worked on_. If you are no longer working on it, provide reasons why.


## Room for Improvement
Include areas you believe need improvement / could be improved. Also add TODOs for future development.

Room for improvement:
- Improvement to be done 1
- Improvement to be done 2

To do:
- Feature to be added 1
- Feature to be added 2


## Acknowledgements
<!-- Give credit here. -->
<!-- - This project was inspired by... -->
- This project was based on [NestJS: The Complete Developer's Guide by Stephen Grider on Udemy](https://www.udemy.com/course/nestjs-the-complete-developers-guide/).
<!-- - Many thanks to... -->


<!-- ## Contact -->
<!-- Created by [@flynerdpl](https://www.flynerd.pl/) - feel free to contact me! -->


<!-- Optional -->
<!-- ## License -->
<!-- This project is open source and available under the [... License](). -->

<!-- You don't have to include all sections - just the one's relevant to your project -->
