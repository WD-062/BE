# How to access protected endpoints for the events API in Postman

-   Assuming the API is up and running, and you are able to get responses from unprotected endpoints, follow these instructions

## Create a new user

-   on endpoint POST: /api/users
-   add a username and password to the body in JSON format. Make sure you select `raw` and `JSON`
    ![Screenshot 2025-02-06 131958](https://github.com/user-attachments/assets/5685a465-09c4-4c70-a5f4-8a1d85b77d46)

## Login the new user

-   on endpoint POST: /api/auth/login
-   Add the same username and password to the body
-   copy the token you get in the response
    ![Screenshot 2025-02-06 132112](https://github.com/user-attachments/assets/8661d8a3-4bca-400b-b416-577965d4fa40)

## Access protected route

-   endpoint used in example (but will work for all protected routes) GET: /api/auth/profile
-   add a new header
    -   Key: `Authorization`
    -   Value: `Bearer <paste_the_token_here>`
        ![Screenshot 2025-02-06 132313](https://github.com/user-attachments/assets/7231d018-f71c-4f25-993a-706fdd2e2ba4)
