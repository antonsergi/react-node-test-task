# Requirements
- Docker

### Stack
- Nest.js for backend
- Next.js for frontend
- PostgreSQL for database

### To run application follow these steps:
- inside back folder copy .env.example to .env with command ```cp ./back/.env.example ./back/.env```
- run in your command line ```docker-compose up```

### You have to follow next steps only on first launch:
- open another terminal window
- enter backend container with command ```docker exec -it react-node-test-task-back-1 bash```
- apply database migrations with command ```npm run migration:run```
- seed database with initial data with command ```node ./dist/database/seeds```


Open project on http://localhost:3000 

It may take some time, because Next.js should compile views on first enter.

Use these credentials for initial user:
```
admin@admin.com
12345
```
