# Next.js OpenJira App
Para correr localmente se necesita la base de datos

```
docker-compose up -d
```

* El -d, significa __detached__


MongoDB url local:

```
mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__

## Llenar la base de datos con la infomacion de pruebas

```
http://localhost:3000/api/seed
```