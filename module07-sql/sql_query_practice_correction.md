# SQL Query Practice (Netflix) Solutions

List the titles of all content released in 2008

```sql
SELECT title FROM netflix_shows
WHERE release_year = 2008;
```

List the titles of all content with a release year on or after 2018, in alphabetical order.

```sql
SELECT title, release_year FROM netflix_shows
WHERE release_year >= 2018
ORDER BY title;
```

Determine the number of movies with a maturity rating of PG-13

```sql
SELECT COUNT(*) as pg_13_movies FROM netflix_shows
WHERE type = 'Movie'
AND rating = 'PG-13';
```

List the maturity ratings, and determine the number of content with each rating

```sql
SELECT rating, COUNT(rating) FROM netflix_shows
GROUP BY rating;
```

List the titles and release years of all Barbie movies, in chronological order.
You can assume all Barbie movies will start with “Barbie”, and that if a movie starts with “Barbie” it is a Barbie movie.

```sql
SELECT title, release_year
FROM netflix_shows
WHERE title ILIKE 'Barbie%'
ORDER BY release_year;
```

List the names of all people who starred in a movie in which Kevin Bacon also starred

```sql
SELECT cast_members
FROM netflix_shows
WHERE cast_members ILIKE '%Kevin Bacon%';
```

List the title, release year, rating and description of TV shows where:
Matt LeBlanc appeared

```sql
SELECT title, release_year, rating, description
FROM netflix_shows
WHERE type = 'TV Show'
AND cast_members LIKE '%Matt LeBlanc%';
```

Gerard Butler starred

```sql
SELECT title, release_year, rating, description
FROM netflix_shows
WHERE type = 'TV Show'
AND cast_members LIKE '%Gerard Butler%';
```

Benedict Cumberbatch appeared

```sql
SELECT title, release_year, rating, description
FROM netflix_shows
WHERE type = 'TV Show'
AND cast_members LIKE '%Benedict Cumberbatch%';
```

List the title, release year, rating and description of Movies where:
Robert Pattinson appeared

```sql
SELECT title, release_year, rating, description
FROM netflix_shows
WHERE type = 'Movie'
AND cast_members LIKE '%Robert Pattinson%';
```

Quentin Tarantino directed

```sql
SELECT title, release_year, rating, description
FROM netflix_shows
WHERE type = 'Movie'
AND director LIKE '%Quentin Tarantino%';
```

List the types, and determine the average release year of each type

```sql
SELECT type, ROUND(AVG(release_year))
FROM netflix_shows
GROUP BY type;
```
