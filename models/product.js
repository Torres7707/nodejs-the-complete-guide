const fs = require("fs");
const path = require("path");

const getProductFromFile = (cb) => {
	const p = path.join(
		path.dirname(require.main.filename),
		"data",
		"products.json"
	);
	fs.readFile(p, (err, fileContent) => {
		if (err) {
			return cb([]);
		}
		try {
			cb(JSON.parse(fileContent));
		} catch (e) {
			cb([]);
		}
	});
};

module.exports = class Product {
	constructor(title) {
		this.title = title;
	}

	save() {
		getProductFromFile((products) => {
			products.push(this);
			fs.writeFile(p, JSON.stringify(products), (err) => {
				console.log(err);
			});
		});
	}

	static fetchAll(cb) {
		getProductFromFile(cb);
	}
};
