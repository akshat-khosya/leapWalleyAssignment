# Installation Steps

1. **Run the following command :**

```
sudo docker-compose up --build -d
```

2. **To run the test**

```
npm i

npm run test
```

### Postgres should be ruuning in background for the test to run the above setup 1 will do the task

# API Documentation

## Postman Collection Link

### https://documenter.getpostman.com/view/17713663/2s9Xy5LVsu

This document provides information about the APIs available in the system for managing users, content, and likes.

## Endpoints

1. **Create User**

   - Method: POST
   - URL: `/api/user/create`
   - Description: Creates a new user for testing purposes.
   - Request Body:
     ```json
     {
       "name": "LeapWallet",
       "type": "User",
       "description": "User is created for testing purpose"
     }
     ```

2. **Create Content**

   - Method: POST
   - URL: `/api/content/create`
   - Description: Creates content associated with a user.
   - Request Body:
     ```json
     {
       "user_id": "f4dcbfb8-95f3-4c51-914a-2c4ea6bdfc16"
     }
     ```

3. **Store Like**

   - Method: POST
   - URL: `/api/likes/store`
   - Description: Stores a like from a user for a specific content.
   - Request Body:
     ```json
     {
       "user_id": "a38a067e-5b19-4920-910b-94a3574b26e6",
       "content_id": "0d7fbea3-8ad3-4590-a015-55466fd41763"
     }
     ```

4. **Like Status**

   - Method: POST
   - URL: `/api/likes/status`
   - Description: Retrieves the status of a like for a specific user and content.
   - Request Body:
     ```json
     {
       "user_id": "a38a067e-5b19-4920-910b-94a3574b26e6",
       "content_id": "0d7fbea3-8ad3-4590-a015-55466fd41763"
     }
     ```

5. **Get Likes Count**
   - Method: POST
   - URL: `/api/likes/count`
   - Description: Retrieves the count of likes for specific content.
   - Request Body:
     ```json
     {
       "user_id": "f4dcbfb8-95f3-4c51-914a-2c4ea6bdfc1e",
       "content_id": "cadcc5b9-1828-4218-abc1-62b3e73e6884"
     }
     ```

## Note

This documentation provides an overview of the available APIs. Please ensure proper authentication and error handling mechanisms are in place in the actual implementation.
