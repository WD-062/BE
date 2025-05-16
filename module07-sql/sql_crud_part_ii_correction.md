# SQL CRUD Part 2 Solutions

## CREATE posts table

```sql
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    author INT,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(5100) NOT NULL,
    cover VARCHAR(510) NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (author) REFERENCES users(id)
    ON DELETE CASCADE
);
```

## POST `/posts`

```sql
INSERT INTO posts (author, title, content, cover)
VALUES (1, 'How to Write an SQL Query',
        'This is how you write an SQL Query',
        'https://optim.tildacdn.one/tild6238-3035-4335-a333-306335373139/-/resize/824x/-/format/webp/IMG_3349.jpg')
RETURNING *;
```

## GET `/posts`

```sql
SELECT * FROM posts;
```

## GET `posts/:id`

```sql
SELECT * FROM posts
JOIN users
ON posts.author = users.id
WHERE posts.id = 3;
```

## PUT `posts/:id`

```sql
UPDATE posts
SET title = 'How to Mess Up an SQL Query',
    content = 'Here we go! Time to mess things up!',
    cover = 'https://optim.tildacdn.one/tild6238-3035-4335-a333-306335373139/-/resize/824x/-/format/webp/IMG_3349.jpg'
WHERE id = 3
RETURNING *;
```

## DELETE `posts/:id`

```sql
DELETE FROM posts
WHERE id = 5
```

GET `users/:id`

```sql
SELECT id, name, email FROM users
JOIN posts
ON users.id = posts.author
WHERE id = 1;
```
