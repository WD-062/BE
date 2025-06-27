# Brainstorming for adding admin dashboard to Travel Journal

Feature idea: if user role is admin, when they login they are redirected to an admin dashboard where they can:

- See all users of the app
- Create a new user with role of `partner` or `staff`
- Delete users

## Needs for this feature

### Backend

- new endpoints
  - create user
  - get users
  - get user by id?
  - update user
  - delete user
- protect the endpoints, so only admin can access
- add needed roles to user model

### Frontend

- dashboard Page
  - should be protected - only admin can access it
  - some kind of form for updating users (and button to access it)
  - some kind of list or table for seeing users (user table with add/edit/delete buttons/functionality)
  - button for deleting
- fetch functions to hit our new endpoints
