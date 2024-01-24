# Dogs App Documentation

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Requirements](#requirements)
- [Features](#features)
- [API Endpoints](#api-endpoints)
  - [GET /dogs](#get-dogs)
  - [GET /dogs/:breedId](#get-dogsbreedid)
  - [GET /dogs/name?="..."](#get-dogsname)
  - [POST /dogs](#post-dogs)
  - [GET /temperaments](#get-temperaments)
- [Frontend Structure](#frontend-structure)
  - [Landing Page](#landing-page)
  - [Home Page](#home-page)
  - [Detail Page](#detail-page)
  - [Form Page](#form-page)
- [Testing](#testing)
- [Conclusion](#conclusion)

## Introduction

The Dogs App is a Single Page Application developed using React, Redux, Node, Express, and Sequelize. It allows users to explore various dog breeds, search for specific breeds, view details, filter, sort, and even create new dog breeds.

## Technologies Used

- Node.js
- Express
- React
- Redux
- Sequelize
- React Router DOM

## Requirements

- **Node:** 12.18.3 or higher
- **NPM:** 6.14.16 or higher

## Features

- Search for dog breeds.
- View detailed information about each dog breed.
- Filter dog breeds based on various criteria.
- Sort dog breeds alphabetically or by weight.
- Create new dog breeds.

## API Endpoints

### GET /dogs

- Retrieves an array of objects, where each object represents a dog breed.

### GET /dogs/:breedId

- Fetches the details of a specific breed using the breed ID.
- Returns an object with information about the requested dog breed.
- Includes data on the temperaments associated with this breed.
- Works for both API and database dog breeds.

### GET /dogs/name?="..."

- Retrieves dog breeds that match the provided name (case-insensitive).
- Displays both API and database dog breeds.
- Shows an appropriate message if the breed does not exist.

### POST /dogs

- Creates a new dog breed in the database.
- Associates the breed with the specified temperaments.
- Receives all information through the request body.

### GET /temperaments

- Retrieves all existing temperaments from the API.
- Saves them in the database for future consumption.

## Frontend Structure

### Landing Page

- Button to enter the home page with validation and error handling.

### Home Page

- SearchBar: an input for searching dog breeds by name.
- Section displaying a list of cards with dog breeds.
- Buttons/Options to filter and sort dog breeds.
- Pagination to display 8 dogs per page.

### Detail Page

- Displays detailed information about a specific dog breed.

### Form Page

- Form for creating a new dog breed.
- Fields include name, height, weight, lifespan, and temperaments.

## Testing

- Testing is encouraged for components, routes, and database models.

## Conclusion

The Dogs App provides a user-friendly interface to explore, search, and interact with a variety of dog breeds. The combination of React, Redux, Node, Express, and Sequelize ensures a smooth and responsive experience for users.
