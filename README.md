ms-hardaya-betest

A BE Test (Local)

Instruction (after cloning this repo):

## Project Setup (Local)

1. First, open this repo with your VSCODE
2. open two terminal inside on it,
3. Change directory based on folder name in each terminal

- **Server**

  - after you `cd ms-hardaya-betest`
    **Install depedency modules**

```
npm install
```

**Make sure to run `mongod` and also turn on your mongodb via mongodb compass (local)**

BEFORE USE : MAKE SURE THAT YOUR LOCAL ALREADY INSTALLED MONGODB (if possible) mongodb compass too.

Turn it on by running `mongod` and open your mongodb compass, connect mongodb to local

**Make sure to run your Redis in local too before run the express server app (local)**

BEFORE RUNNING : MAKE SURE THAT YOUR CONFIG OF PORT/HOST/PASSWORD IN `ms-hardaya-betest/config/connectRedis` ARE MATCHING WITH YOUR DATABASE USERNAME AND PASSSWORD. IF NOT, PLEASE EDIT THE CONFIG IN `ms-hardaya-betest/config/connectRedis`.

**Run server**

```
npm run dev
```

Please refer to `API_DOC` for API Documentations.

I also included postman collection if you want to use postman for better REST API manipulation procedures, you can just import the json file of `hardaya_betes_pmanhit.postman_collection.json`
