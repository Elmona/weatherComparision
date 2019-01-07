#!/bin/bash
docker run --link weather-mysql:db --net=weathercomparision_default -p 8080:80 phpmyadmin/phpmyadmin