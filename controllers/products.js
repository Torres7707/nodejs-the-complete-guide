const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
	res.render("add-product", {
		pageTitle: "Add Product",
		path: "/admin/add-product",
		activeProduct: true,
	});
};

exports.postAddProduct = (req, res, next) => {
	// products.push({ title: req.body.title });
	const product = new Product(req.body.title);
	product.save();
	res.redirect("/");
};

exports.getProducts = (req, res, next) => {
	// res.sendFile(path.join(rootDir, "views", "shop.html"));
	// const products = adminData.products;

	Product.fetchAll((products) => {
		res.render("shop", {
			prods: products,
			pageTitle: "Shop",
			path: "/",
			hasProds: products.length > 0,
			activeShop: true,
		});
	});
};
