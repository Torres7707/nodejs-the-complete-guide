const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(expressLayouts);
app.set("layout", "layouts/main-layout");

app.get("/test", (req, res) => {
	res.render("404", {
		pageTitle: "Test Page",
		path: "/test",
	});
});

app.listen(3001, () => {
	console.log("Test server running on port 3001");
});
