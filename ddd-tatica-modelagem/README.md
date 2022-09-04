## Para subir o projeto

### Iniciando instância do Docker
```
docker-compose up -d
```

### Ingressar na instância do Docker
```
docker exec -it nodejs bash
```

### Instalando os pacotes
```
npm i
```

### Instalando o Jest + Executor Typescrypt
```
npm i -D jest @types/jest ts-node --save-dev
```

### Instalando o SWC: compilador em Rust para transpilar TS/JS
```
npm i -D @swc/jest @swc/cli @swc/core
```

### Inicializando o Jest
```
npx jest --init
```

## Comandos úteis utilizados na construção do projeto

### Instalando Typescrypt
```
npm i typescript --save-dev
```

### Iniciando projeto Typescrypt
```
npx tsc --init
```

### Compilar projeto Typescrypt
```
npx tsc
```

### Instalando Lint para Typescrypt
```
npm i tslint --save-dev
```

### Iniciando Lint para Typescrypt
```
npx tslint --init
```

### Executar Testes Unitarios
```
npm test
```
### Adicionar config ao jest.config.ts
```
// serve para passar por todos os arquivos js ou ts (opcionalmente jsx e tsx) na hora de rodar os testes
transform: {
"^.+\.(t|j)sx?$": ["@swc/jest"]
},
```
### Adicionar gerador de UUID
```
npm i uuid @types/uuid
```

### Adicionar Sequelize Typescrypt
```
npm install sequelize reflect-metadata sequelize-typescript
```

### Adicionar SQlite
```
npm install sqlite3
```

### Cobertura atual dos testes
![image](https://user-images.githubusercontent.com/52874054/187035903-b6c8a6db-57f5-4344-8f84-8ff157585587.png)

