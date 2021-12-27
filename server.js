require('dotenv').config();

/* ==== External Modules ==== */
const express = require("express");
const cors = require("cors");

/* ==== Internal Modules ==== */
const routes = require("./routes");

/* ==== Instanced Modules  ==== */
const app = express();

/* ====  Configuration  ==== */
const PORT = process.env.PORT || 8000;

/* ====  Middleware  ==== */
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ====  Routing  ==== */
app.use("/api", routes);
app.all("/api/*", function (req, res, next) {
    res.send("Where are you going? This is not a route.");
});

/* ====  Server Listener / Connection ==== */
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}! Dope!`);
});