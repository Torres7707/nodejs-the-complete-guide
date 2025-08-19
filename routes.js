const fs = require("fs");

function requestHandler(req, res) {
	const url = req.url;
	const method = req.method;
	if (url === "/") {
		res.write("<html>");
		res.write("<head><title>Enter Message</title></head>");
		res.write(
			// 添加按钮，点击按钮后跳转到/users页面
			"<body><h1>Hello World</h1><form action='/create-user' method='POST'><input type='text' name='username'><button type='submit'>Add User</button></form><a href='/users'>Users</a></body>"
		);
		res.write("</html>");
		return res.end();
	}
	if (url === "/users" && method === "POST") {
		res.setHeader("Content-Type", "text/html");
		res.write("<html>");
		res.write("<head><title>Users</title></head>");
		fs.readFile("users.txt", (err, data) => {
			if (err) {
				console.log(err);
				res.write("<body><p>No users found</p></body>");
			} else {
				// 将data转换为数组
				const users = data
					.toString()
					.split("\n")
					.filter((user) => user.trim() !== "");
				console.log(users);
				res.write("<body><ul>");
				users.forEach((user) => {
					res.write("<li>" + user + "</li>");
				});
				res.write("</ul></body>");
			}
			res.write("</html>");
			return res.end();
		});
	}
	if (url === "/create-user" && method === "POST") {
		const body = [];
		req.on("data", (chunk) => {
			body.push(chunk);
		});
		req.on("end", () => {
			const parsedBody = Buffer.concat(body).toString();
			const username = new URLSearchParams(parsedBody).get("username");
			console.log(username);
			// 尝试往users.txt文件写入，如果没有就创建文件并添加username，如果有就追加username，并且添加换行符
			fs.appendFile("users.txt", username + "\n", (err) => {
				if (err) {
					console.log(err);
				}
				res.statusCode = 302;
				res.setHeader("Location", "/");
				return res.end();
			});
		});
	}
}

module.exports = {
	handler: requestHandler,
	someText: "Some hardcoded text",
};
