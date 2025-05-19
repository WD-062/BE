find crime report

```sql
SELECT * FROM crime_scene_report
WHERE type = 'murder'
AND date = 20180115
AND city = 'SQL City';
```

witness 1 - last house on "Northwestern Dr."

-   id 14887 Morty Schapiro

```sql
SELECT * FROM person
WHERE address_street_name = 'Northwestern Dr'
ORDER BY address_number DESC
LIMIT 1;
```

witness 2 - named Annabel, lives on "Franklin Ave"

-   id 16371 Annabel Miller

```sql
SELECT * FROM person
WHERE address_street_name = 'Franklin Ave'
AND name LIKE 'Annabel%';
```

find their interviews

```sql
SELECT * FROM interview
WHERE person_id IN (14887, 16371);
```

single query

```sql
SELECT * FROM interview
WHERE person_id
IN (
(SELECT id FROM person
WHERE address_street_name = 'Northwestern Dr'
ORDER BY address_number DESC
LIMIT 1),
(SELECT id FROM person
WHERE address_street_name = 'Franklin Ave'
AND name LIKE 'Annabel%'));
```

14877 - Get Fit now bag, gold member, number starts with "48Z", license plate includes "H42W"

```sql
SELECT * FROM get_fit_now_member
WHERE membership_status = 'gold'
AND id LIKE '48Z%';
```

16371 - Killer worked out on Jan 9th

```sql
SELECT * FROM get_fit_now_check_in
JOIN get_fit_now_member
ON get_fit_now_check_in.membership_id = get_fit_now_member.id
WHERE check_in_date = 20180109
AND membership_id
IN (SELECT id FROM get_fit_now_member
WHERE membership_status = 'gold'
AND id LIKE '48Z%');
```

Killer:

```sql
SELECT person.name FROM drivers_license
JOIN person
ON drivers_license.id = person.license_id
WHERE plate_number LIKE '%H42W%'
AND person.id
IN (SELECT person_id FROM get_fit_now_member
WHERE membership_status = 'gold'
AND id LIKE '48Z%')
```

get killer transcript
I was hired by a woman with a lot of money. I don't know her name but I know she's around 5'5" (65") or 5'7" (67"). She has red hair and she drives a Tesla Model S. I know that she attended the SQL Symphony Concert 3 times in December 2017.

```sql
SELECT transcript FROM interview
WHERE person_id = 67318;
```

persons who match description

```sql
SELECT * FROM person
WHERE license_id
IN (SELECT id FROM drivers_license
WHERE height BETWEEN 65 AND 67
AND gender = 'female'
AND hair_color = 'red'
AND car_make = 'Tesla'
AND car_model = 'Model S';
)
```

person ids who went to concert

```sql
SELECT person_id
FROM facebook_event_checkin
WHERE date
BETWEEN 20171201 AND 20171231
AND event_name = 'SQL Symphony Concert'
GROUP BY person_id
HAVING COUNT(person_id) = 3;
```

Mastermind

```sql
SELECT name FROM person
WHERE license_id
IN (SELECT id FROM drivers_license
WHERE height BETWEEN 65 AND 67
AND gender = 'female'
AND hair_color = 'red'
AND car_make = 'Tesla'
AND car_model = 'Model S'
)
AND id
IN (SELECT person_id
FROM facebook_event_checkin
WHERE date
BETWEEN 20171201 AND 20171231
AND event_name = 'SQL Symphony Concert'
GROUP BY person_id
HAVING COUNT(person_id) = 3);
```
