const express = require("express");
const { connectDB } = require("./config/connectMongo");
const errorHandling = require("./middlewares/errorHandling");
const router = require("./routes/route");



const app = express();
const port = process.env.PORT || 4001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errorHandling);

// app.listen(port, () => {
//     console.log(`user services is listening to port ${port}`);
// });

connectDB()
    .then((db) => {
        // console.log(db);
        app.listen(port, () => {
            console.log(`user services is listening to port ${port}`);
        });
    }).catch((error) => {
        console.log(error, `<<< eror dari koneksi mongodb`);
    });
