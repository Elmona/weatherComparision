# Assignment 3 - Final Project

By Anton Strand (as224xs) and Emil Larsson (el223nc)

## Tasks

### 1. Idea

We chose to create a "Compare weather" app. The user is able to compare the weather between two cities during a specified time limit.

This application is directed to people who are either looking for a place to spend their holiday or perhaps even looking for a new city to move to. By be able to compare the weather between two cities the decision to where could be easier to make.

This is just a prototype so the number of cities will be limited. The main functionality will be to be able to compare the average temperature and rain count between two cities during the time span specified by the user.

The data will be imported from SMHI.

### 2. Logical model

![ER diagram](https://github.com/Elmona/weatherComparision/blob/master/documents/images/er-diagram-weather.png)

We chose to have a set for the city containing the name of the city as well as some information about it. The weather data is collected by different types of weather stations. We chose to separate the relation to the stations, one for each type. This is to only have the right type of station in the set when trying to find data. There is no need to go through all rain stations when trying to find the temperature. The actual weather data is also separated to each other for the same reason and from the station set to reduce duplication. Instead of letting the city contain all possible stations for the city we chose to let the station know which city it belongs to.

### 3. Design in SQL

#### City

As for now all the information we need for the city is the name and the information text. The name is unique and can be used as a primary key. Since the name is use a lot in the queries we chose to use it as an index as well.

```SQL
CREATE TABLE IF NOT EXISTS city
(
  name varchar(20),
  informationText text,
  INDEX(name),
  PRIMARY KEY (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

#### The Stations

We chose to convert the relation between the city and the temperature to a table called "tempStation" and the other one "rainStation". It contains all the information mentioned in the E/R diagram. Station is a unique name that SMHI has given the station. We will use this as a primary key. Even though they are more or less identical we chose to separate them since they contains different types of stations. This could have been solved by adding a "type" attribute but it would resolve in unnecessary stations to loop through to find the ones containing the specific type of information when doing queries.

```SQL
CREATE TABLE IF NOT EXISTS tempStation
(
  city varchar(20),
  station varchar(20),
  INDEX(station, city),
  PRIMARY KEY (station)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

```SQL
CREATE TABLE IF NOT EXISTS rainStation
(
  city varchar(20),
  station varchar(20),
  INDEX(station, city),
  PRIMARY KEY (station)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

#### Temperature

The temperature for each day and station will be stored in the temperature table. Since the combination of the timestamp and the station is unique we chose to use it as primary key. Since the timestamps contains both date and time we chose to use the type TIMESTAMP since queries using timestamp can be cached.

```SQL
CREATE TABLE IF NOT EXISTS temperature
(
  timestamp TIMESTAMP,
  station varchar(20),
  temperature FLOAT,
  INDEX(timestamp, station, temperature),
  PRIMARY KEY (timestamp, station)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

#### Rain reports

The rain amount will be stored together with the date and station. In temperature we chose to use TIMESTAMP as type of the timestamp but since it is limited to 1970 and some of the rain reports are older and only has dates we chose to use DATE instead.

```SQL
CREATE TABLE IF NOT EXISTS rainReports
(
  timestamp DATE,
  station varchar(20),
  amount FLOAT,
  INDEX(timestamp, station, amount),
  PRIMARY KEY (timestamp, station)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 4. SQL queries

All queries will be implemented using prepared statements but for this demos we will use dummy data instead.

#### Get all available cities

To be able to present the cities to be compared we need to find all cities in the database. Since it is almost impossible to do this in any other way it is hard to motivate the query.

```SQL
SELECT name FROM city
```

#### Get information about the city

The application will provide some information about the chosen cities. This query will get that information. Since all information is available in one table a simple WHERE clause is used to find the specific informationText. "Kalmar" will be changed to a prepared statement.

```SQL
SELECT informationText FROM city WHERE name='Kalmar'
```

#### Get aggregated rain information

We join the rain reports and the rain stations where the rain station is in the provided city ("Kalmar" in this example) and where the station is matching the rain report station. Then we select sum of the amount of rain as well as the average amount of rain in the rain reports within and including the provided dates. A similar query will be used for getting the average temperature during the time span.

```SQL
SELECT Sum(amount) AS totalRain,
       Avg(amount) AS avgRain
FROM   rainReports
       INNER JOIN rainStation
               ON rainStation.city = 'Kalmar'
                  AND rainStation.station = rainReports.station
WHERE  rainReports.timestamp BETWEEN '2018-01-01' AND '2019-01-01'
```

#### Get coldest day

We want to be able to present both the date and the temperature of the coldest day within the time span. To be able to do this we use a similar query as the other one as a base to find the coldest day and then select the temperature and the timestamp. There is no real reason to why `Min(temperature)` is re assigned to `coldestDay` more than to make the query easier to read and understand.

```SQL
SELECT temperature,
       timestamp
FROM   temperature
WHERE  temperature = (SELECT Min(temperature) AS coldestDay
                      FROM   temperature
                              INNER JOIN tempStation
                                      ON tempStation.city = 'Kalmar'
                                        AND tempStation.station =
                                            temperature.station
                      WHERE  temperature.timestamp BETWEEN '2018-01-01' AND '2019-01-01' )
    AND temperature.timestamp BETWEEN '2018-01-01' AND '2019-01-01'
```

#### Get rainiest day

This query is very similar to the coldest day but uses the rain reports and the rain stations instead. The inner join is used to combine the two tables where the provided arguments matches.

```SQL
SELECT amount,
       timestamp
FROM   rainReports
WHERE  amount = (SELECT Max(amount) AS rainiestDay
                  FROM   rainReports
                          INNER JOIN rainStation
                                  ON rainStation.city = 'Kalmar'
                                    AND rainStation.station =
                                    rainReports.station
                  WHERE  rainReports.timestamp BETWEEN '2018-01-01' AND '2019-01-01')
    AND rainReports.timestamp BETWEEN '2018-01-01' AND '2019-01-01'
```

### 5. Implementation

The implementation can be found [here](https://github.com/Elmona/weatherComparision). We used all the queries in the previous section but turned them into prepared statements. We also added queries for average temperature as well as warmest day.

#### Installation instructions

##### Prerequisite
* Node installed
* Npm installed
* Docker installed

##### Steps
Everything in `this style` are scripts that should be executed in your console.
1. `git clone https://github.com/Elmona/weatherComparision.git`  
2. `cd weatherComparision`  
3. `chmod +x createConfigs.sh dockerOnlyMysql.sh`  
4. `./createConfigs.sh prod`  
5. `./dockerOnlyMysql.sh`  
6. Open new terminal  
7. `cd weatherComparision/addToMysql`  
8. `node app.js` <<- Adding data to database  
9. `cd ../server && npm i`
10. `npm start` <<- Starting server
11. Open new terminal  
12. `cd weatherComparision/client`  
13. `npm i && npm start` <<- Starting client  
14. Open browser at port 3000  
  
### 6. Supplemental video

[https://youtu.be/S023h3rrxbE](https://youtu.be/S023h3rrxbE)
