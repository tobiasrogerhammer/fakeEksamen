require("dotenv").config();
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose");
const cors = require("cors");
const getchats = require("./getChats");
const users = require("./createUser");
const admin = require("./admin");

const app = express();
const port = 5001;

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "fakeEksamen"
    })
    .then(() => console.log("Connected to mongoDB"))
    .catch((err) => console.log(err));

app.use(express.json());


app.use(
	cors({
		origin: "http://localhost:3000", 
		methods: "GET,POST,PUT,DELETE",
		credentials: true
	})
);

app.use("/get", getchats)
app.use("/user", users)
app.use("/meeting", admin)


app.listen(port, () => {
	console.log(`Backend server listening on port ${port}`);
});