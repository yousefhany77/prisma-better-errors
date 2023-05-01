Sure, here's a possible README file based on the information you provided:

# Prisma Better Errors

This module provides a way to handle errors thrown by the [Prisma ORM](https://www.prisma.io/) in a more descriptive way. By default, Prisma throws errors with error codes that can be hard to understand for developers not familiar with the specific error codes used by Prisma. This module maps Prisma error codes to error messages and HTTP status codes, making it easier for developers to understand what went wrong and return appropriate error responses in their APIs.

## Installation

You can install this module using npm:

```
npm install prisma-better-errors
```

## Usage

To use this module, you need to import the `prismaError` class and use it to catch Prisma errors in your code. Here's an example:

```javascript
import { PrismaClient } from '@prisma/client';
import { prismaError } from 'prisma-better-errors';

const prisma = new PrismaClient();

async function getUser(id: number) {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    throw new prismaError(error);
  }
}
```

In this example, the `getUser` function tries to fetch a user from the database using Prisma's `findUnique` method. If an error is thrown, the `prismaError` class is used to wrap the error and provide a more descriptive error message and HTTP status code.

The `prismaError` class extends the built-in `Error` class and adds three properties:

- `message`: the error message.
- `statusCode`: the HTTP status code to return in the API response.
- `metaData` (optional): an object containing additional metadata about the error. This can be useful for debugging purposes.


### With express middleware
Add the `prismaError` class to your error handling middleware and return the `statusCode` and `title` properties as part of the API error response. The `metaData` property can also be returned if it contains any additional information about the error.
```ts
app.use((err, req, res, next) => {
  if (err instanceof prismaError) {
    res.status(err.statusCode).json({
      title: err.title,
      message: err.message,
      metaData: err.metaData,
    });
  } else {
    // Handle other errors here
  }
});
```

```ts

// response
{
    "title": "Prisma Error",
    "statusCode": 409,
    "message": "Unique constraint failed",
    "metaData": {
        "target": [
            "email"
        ]
    }
}


```
### Custom Error Messages
You can customize the error message and HTTP status code for each Prisma error code by modifying the `QueryError` map in the `prisma-better-errors` module. For example:

```ts
import { QueryError, prismaError } from 'prisma-better-errors';

// Add a new error code mapping
QueryError.set('P3000', { message: 'My custom error message', httpStatus: 422 });

// Use the new error code in your code
try {
  // Prisma code here
} catch (error) {
    // these are the query errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    throw new prismaError(error)
  }
}
```


### Error Codes

The following table lists the error codes and their corresponding error messages and HTTP status codes:

| Error Code | Message                                                                   | HTTP Status Code |
| ---------- | ------------------------------------------------------------------------- | ---------------- |
| P2000      | The provided value for the column is too long for the column's type       | 400              |
| P2001      | The record searched for in the where condition does not exist             | 404              |
| P2002      | Unique constraint failed                                                 | 409              |
| P2003      | Foreign key constraint failed                                             | 409              |
| P2004      | A constraint failed on the database                                       | 400              |
| P2005      | The value stored in the database for the field is invalid for the field's type | 400              |
| P2006      | The provided value for the field is not valid                             | 400              |
| P2007      | Data validation error                                                     | 400              |
| P2008      | Failed to parse the query                                                 | 400              |
| P2009      | Failed to validate the query                                              | 400              |
| P2010      | Raw query failed                                                          | 500              |
| P2011      | Null constraint violation                                                 | 400              |
| P2012      | Missing a required value                                                  | 400              |
| P2013      | Missing a required argument                                               | 400              |
| P2014      | The change you are trying to make would violate the required relation      | 400              |
| P2015      | A related record could not be found                                        | 404              |
| P2016      | Query interpretation error                                                | 400              |
| P2017      | The records for relation between the parent and child models are not connected | 400           |
| P2018      | The required connected records were not found                              | 404              |
| P2019      | Input error                                                                | 400              |
| P2020      | Value out of range for the type                                            | 400              |
| P2021      | The table does not exist in the current database                           | 404              |
| P2022      | The column does not exist in the current database                          | 404              |
| P2023      | Inconsistent column data                                                   | 400              |
| P2024      | Timed out fetching a new connection from the pool                          | 500              |
| P2025      | An operation failed because it depends on one or more records that were required but not found | 404 |
| P2026      | The current database provider doesn't support a feature that the query used | 400           |
| P2027      | Multiple errors occurred on the database during query execution             | 500              |

## Author

Youssef Hany

[Check out my portfolio](http://youssefhany.dev/)
