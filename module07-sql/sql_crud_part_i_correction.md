# SQL CRUD Part 1 Solutions

## CREATE users table

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```

## INSERT users

```sql
INSERT INTO users (name, email, password) VALUES ('Aang Air', 'aang@air.com', 'aangpass');

INSERT INTO users (name, email, password) VALUES ('Katara Water', 'katara@water.com', 'katarapass');

INSERT INTO users (name, email, password) VALUES ('Zuko Fire', 'zuko@fire.com', 'zukopass');
```

## Queries without `WHERE` clause

### READ - get all users

```sql
SELECT * FROM users
```

### CREATE - create and return user

```sql
INSERT INTO users (name, email, password) VALUES ('Toph Beifong', 'toph@beifong.com', 'tophpass')
RETURNING *;
```

## Queries with `WHERE` clause

### READ- get all information about a single user, except their password

```sql
SELECT id, name, email FROM users
WHERE id = 1;
```

### UPDATE – update a single user based on their id, returns updated user

```sql
UPDATE posts
SET name = 'Aang Avatar',
    email = 'aang@avatar.com'
WHERE id = 1
RETURNING *;
```

### DELETE – deletes a single user based on their id

```sql
DELETE FROM users
WHERE id = 1
```
