# Assignment 3 - Final Project

By Anton Strand (as224xs) and Emil Larsson (el223nc)

## Tasks

### 1. Idea

We chose to create a "Compare weather" app. The user is able to compare the weather between two cities during a specified time limit.

This application is directed to people who are either looking for a place to spend there holiday or perhaps even looking for a new city to move to. By be able to compare the weather between two cities the decision to where could be easier to make.

This is just a prototype so the number of cities will be limited. The main functionality will be to be able to compare the average temperature and rain count between two cities during the time span specified by the user.

The data will be imported from SMHI.

### 2. Logical model

![ER diagram](https://github.com/Elmona/weatherComparision/blob/master/documents/images/er-diagram-weather.png)

We chose to have a set for the city containing the name of the city as well as some information about it. The weather data is collected by different types of weather stations. We chose to seperate the relation to the stations, one for each type. This is to only have the right type of station in the set when trying to find data. There is no need to go through all rain stations when trying to find the temperature. The actual weather data is also seperated to each other for ther same reason and from the station set to reduce duplication. Instead of letting the city contain all possible stations for the city we chose to let the station know which city it belongs to.

### 3. Design in SQL
#### City
As for now all the information we need for the city is the name and the information text. The name is unique and can be used as a primary key. Since the name is use a lot in the queries we chose to use it as an index as well. 
```
CREATE TABLE IF NOT EXISTS city
(
  name varchar(20),
  informationText text,
  INDEX(name),
  PRIMARY KEY (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

#### Stations
We chose to convert the relation between the city and the temperature to a table called "tempStation" and the other one "rainStation". It contains all the information mentioned in the E/R diagram. Station is a unique name that SMHI has given the station. We will use this as a primary key. Eventhough they are more or less identical we chose to seperate them since they contains different types of stations. This could have been solved by adding a "type" attribute but it would resolve in unnecessary stations to loop through to find the ones containing the specific type of information when doing queries.
```
CREATE TABLE IF NOT EXISTS tempStation
(
  city varchar(20),
  station varchar(20),
  INDEX(station, city),
  PRIMARY KEY (station)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

```
CREATE TABLE IF NOT EXISTS rainStation
(
  city varchar(20),
  station varchar(20),
  INDEX(station, city),
  PRIMARY KEY (station)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 4. SQL queries

### 5. Implementation

### 6. Supplemental video
