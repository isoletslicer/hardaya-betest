## Endpoints

List of Available Endpoints:

- `POST /login`
- `POST /register`
- `GET /users/`
- `GET /users/:id`
- `PUT /users/:id`
- `DELETE /users/:id`
- `GET /users/user/i/:identityNumber`
- `GET /users/user/a/:accountNumber`

Assumtion : identityNumber & accountNumber are same data

### POST /register

Request:

- body:

```json
{
  "userName": "string",
  "emailAddress": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "user with username <username> has been created"
}
```

_Response (400 - Bad Request)_

```json
{
  "message":"Username must be unique"
}
OR
{
  "message": "password cannot be null"
}
OR
{
  "message": "password cannot be empty"
}

```

&nbsp;

### POST /login

Request:

- body:

```json
{
  "userName": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (401 - invalid email/password)_

```json
{
  "message": "error invalid username or password"
}
```

&nbsp;

### GET /users

#### Description

- Get all user data.

#### Request

- Headers

```json
  {
    "access_token":String

  }
```

#### Response

_200 - OK_

- Body

  ```json
    [
        {
            "_id":String,
            "userName":String,
            "emailAddress":String,
            "identityNumber":Integer,
            "accountNumber": Integer
        },
    ...
    ]
  ```

_400 - Bad Request_

### GET /users/:id

#### Description

- Get user data by id.

#### Request

- Headers

```json
  {
    "access_token":String

  }
```

- Params : id : String

#### Response

_200 - OK_

- Body

  ```json
    {
    "_id":String,
    "userName":String,
    "emailAddress":String,
    "identityNumber":Integer,
    "accountNumber": Integer
    },
  ```

_400 - Bad Request_

_404 - Not Found_

```json
{ "message": "username not found" }
```

### PUT /users/:id

#### Description

- edit user data by id.
- Authorization : only user that login can manipulate itself

#### Request

- Headers

```json
  {
    "access_token":String

  }
```

- Body

- Body

  ```json
  { "userName" : "String" }
  OR
  { "emailAddress": "String" }
  OR
  { "password": "String" }

  ```

- Params : id : String

#### Response

_200 - OK_

- Body

  ```json
  { "message": "updated user account, please re login" }
  OR
  { "message": "updated user detail" }
  ```

_400 - Bad Request_

_401 - Unauthorized_

```json
{ "message": "username not found" }
```

_403 - Forbidden_

```json
{ "message": "forbidden to access" }
```

_404 - Not Found_

```json
{ "message": "username not found" }
```

### DELETE /users/:id

#### Description

- delete user data by id.
- Authorization : only user that login can delete itself

#### Request

- Headers

```json
  {
    "access_token":String

  }
```

- Params : id : String

#### Response

_200 - OK_

- Body

  ```json
  { message: `success deleted user ${findUser.userName}, please create again / login to other account` }
  ```

_400 - Bad Request_

_404 - Not Found_

```json
{ "message": "username not found" }
```

### GET /users/user/i/:identityNumber

#### Description

- Get user data by idetityNumber.

#### Request

- Headers

```json
  {
    "access_token":String

  }
```

- Params : identityNumber : Integer

#### Response

_200 - OK_

- Body

  ```json
    {
    "_id":String,
    "userName":String,
    "emailAddress":String,
    "identityNumber":Integer,
    "accountNumber": Integer
    },
  ```

_400 - Bad Request_

_404 - Not Found_

```json
{ "message": "username not found" }
```

### GET /users/user/a/:accountNumber

#### Description

- Get user data by accountNumber.

#### Request

- Headers

```json
  {
    "access_token":String

  }
```

- Params : accountNumber : Integer

#### Response

_200 - OK_

- Body

  ```json
    {
    "_id":String,
    "userName":String,
    "emailAddress":String,
    "identityNumber":Integer,
    "accountNumber": Integer
    },
  ```

_400 - Bad Request_

_404 - Not Found_

```json
{ "message": "username not found" }
```

## Global Error :

_500 - Internal Server Error_
