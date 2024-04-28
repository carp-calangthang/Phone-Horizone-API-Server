# Phone Horizone

## Description

Mobile application for selling phones: Phone Horizone.

## Technologies used:

- Frontend: React Native built on the Expo platform.
- Backend: Node.js with Express library.
- Database: MongoDB.

## Installation Guide

- Install Node.js (Application version: 20.11.0) - <a href="https://nodejs.org/en/download/current">Install</a>
- Install required packages: npm install
- Install MongoDB:
- Download MongoDB Compact: <a href="https://www.mongodb.com/try/download/community">Install</a>

## Running the Application
- Open terminal and run command: npm start

## Accounts
- Create a new account by opening the application and registering.
- Alternatively, you can use the following API to register:
```http
POST /api/users/register
```
<hr>
## API Reference

### Product

#### Get all products

```http
  GET api/product/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `null` | `null` | **** |

#### Get detail product

```http
  GET api/product/find/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Require**. Id of product 
 
#### Create new product

```http
  POST api/product/upload
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Require**. Name of product 
| `image`      | `[string]` | **Require**. Array contains the images
| `price`      | `string` | **Require**. Price of product
| `description`      | `string` | **Require**. Description 

#### Delete Product

```http
  DELETE api/product/delete/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Require**. Name of product |

#### Update product

```http
  PATCH api/product/update/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Require**. Name of product 
| `image`      | `[string]` | **Require**. Array contains the images
| `price`      | `string` | **Require**. Price of product
| `description`      | `string` | **Require**. Description 

<hr>

### Users

#### Current User (For check authorization)
```http
  GET api/users/current
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `null`      | `string` | **Require**. Beared Token (From login)

#### Login
```http
  POST api/users/login
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Require**. Username 
| `password`      | `string` | **Require**. password

#### Register
```http
  POST api/users/register
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Require**. Username 
| `password`      | `string` | **Require**. password
| `email`      | `string` | **Require**. Email

<hr>

### Cart

#### Show cart of user
```http
  POST api/cart/
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `null`      | `string` | **Require**. Beared Token (From login)

#### Add to cart 
```http
  POST api/cart/add
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `null`      | `string` | **Require**. Beared Token (From login)
| `productid`      | `string` | **Require**. Id of product
| `quantity`      | `string` | **Require**. quantity of product

#### Remove from cart
```http
  POST api/cart/remove
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `null`      | `string` | **Require**. Beared Token (From login)
| `productid`      | `string` | **Require**. Id of product
