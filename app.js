// const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

const rootDir = require("./utils/path");

// app.use((req, res, next) => {
// 	console.log("In the middleware!");
// 	next(); // Allows the request to continue to the next middleware in line
// });
// app.use("/", (req, res, next) => {
// 	console.log("This always runs!");
// 	next();
// });

app.use(express.static(path.join(rootDir, "public")));

app.use(bodyParser.urlencoded());

app.use("/admin", adminRouter);
app.use(shopRouter);

app.use("/", (req, res, next) => {
	res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

app.listen(3000);
