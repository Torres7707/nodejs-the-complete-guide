const fs = require("fs");

function requestHandler(req, res) {
	const url = req.url;
	const method = req.method;
	if (url === "/") {
		res.write("<html>");
		res.write("<head><title>Enter Message</title></head>");
		res.write(
			'<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
		);
		res.write("</html>");
		return res.end();
	}
	if (url === "/message" && method === "POST") {
		const body = [];
		req.on("data", (chunk) => {
			body.push(chunk);
		});
		req.on("end", () => {
			const parsedBody = Buffer.concat(body).toString(); // e.g. "message=hello"
			const message = new URLSearchParams(parsedBody).get("message") || "";
			fs.writeFile("message.txt", message, (err) => {
				res.statusCode = 302;
				res.setHeader("Location", "/");
				res.end();
			});
		});
		return; // 防止继续执行下面的默认响应
	}
	res.setHeader("Content-Type", "text/html");
	res.write("<html>");
	res.write("<head><title>My First Page</title></head>");
	res.write("<body><h1>Hello World</h1></body>");
	res.write("</html>");
	res.end();
}

module.exports = requestHandler;
