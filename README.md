
![](docs/productdevbook.png)

## Discord
![productdevbook](https://discordapp.com/api/guilds/982896043463180310/widget.png?style=shield)

### Website
* http://localhost:3000 - vue
* http://localhost:5000 - vue-mobile
* http://localhost:4000/graphql - api

# Setup

```properties
pnpm install
docker-compose up
```

### Env setup
Example env file change name to .env
```
/apps/nestjs/.env.example -> /apps/nestjs/.env
/apps/vue-web/.env.example -> /apps/vue-web/.env
```

### Docker running
```properties
pnpm db:up // migrations db
pnpm dev
```