import { createConnection } from "typeorm";

createConnection()
    .then(() => {
        console.log('Connected on database')
    }).catch((err) => {
        console.log(`Database connection error: ${err}`)
    });