# Phone-Horizone-API-Server
API server for Phone Horizone mobile app

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
