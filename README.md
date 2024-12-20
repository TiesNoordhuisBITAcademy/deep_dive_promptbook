# Using containers from docker hub

[Docker hub](https://hub.docker.com/repositories/tiesnoordhuis)

## api

```bash
docker stop deep_dive_api_container
docker rm deep_dive_api_container
docker run -p 8000:8000 --link deep_dive_database_container:db --name deep_dive_api_container tiesnoordhuis/deep_dive_api
```

## database

```bash
docker stop deep_dive_database_container
docker rm deep_dive_database_container
docker run -p 3306:3306 --name deep_dive_database_container tiesnoordhuis/deep_dive_database
```

# Using containers localy

## api

From `/api` folder.

```bash
docker stop deep_dive_api_container
docker rm deep_dive_api_container
docker build -t deep_dive_api .
docker run -p 8000:8000 --link deep_dive_database_container:db --name deep_dive_api_container deep_dive_api
```

## database

From the `/database` folder.

```bash
docker stop deep_dive_database_container
docker rm deep_dive_database_container
docker build -t deep_dive_database .
docker run -p 3306:3306 --name deep_dive_database_container deep_dive_database
```
