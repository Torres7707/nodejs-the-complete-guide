const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const errorController = require("./controllers/error");
const app = express();

// app.engine(
// 	"hbs",
// 	expressHbs.engine({
// 		layoutsDir: "views/layouts",
// 		defaultLayout: "main-layout",
// 		extname: "hbs",
// 	})
// );
app.set("view engine", "ejs");
app.set("views", "views");
app.use(expressLayouts);
app.set("layout", "layouts/main-layout");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
