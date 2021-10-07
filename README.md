# Another Todo API project

This project was made for educational purpose and portfolio enrichment. It's a todo api when users will be able to create, edit, delete, and group task into dashboards.

### Technologies used

Until now the main technologies used are:

- Node.js
- Express
- MongoDB
- Mongoose
- Docker & Docker Compose

## How to run this project

Before all, make sure you have the right environment variables, without them, this project won't run.

To have a populated database, I recommend you to execute the seeders on your MongoDB database through the script.

```
md-seed run --dropdb
```

More info on [mongoose-data-seed](https://github.com/sharvit/mongoose-data-seed) documentation.

If you don't use docker compose, you can run this project executing the next npm scripts.

### On development

```
npm run dev
```

### On production

```
npm start
```
