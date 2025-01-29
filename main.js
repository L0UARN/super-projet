const express = require("express");
const fs = require("fs/promises");

const PORT = 8080;
const DATA_PATH = "./data.json";

const app = express();
app.use(express.json());

app.get("/api/create", async (request, response) => {
	const name = request.body["name"];
	if (!name) {
		response.status(400);
		response.send({ error: "Missing \"name\" parameter."});
		return;
	}

	const date = request.body["date"];
	if (!date) {
		response.status(400);
		response.send({ error: "Missing \"date\" parameter."});
		return;
	}

	const author = request.body["author"];
	if (!author) {
		response.status(400);
		response.send({ error: "Missing \"author\" parameter."});
		return;
	}

	let currentRawData = "";
	try {
		currentRawData = await fs.readFile(DATA_PATH, { encoding: "utf-8" });
	} catch (e) {
		response.status(500);
		response.send({ error: "Failed to access (read) the database"});
		return;
	}

	let currentData = JSON.parse(currentRawData);
	const maxId = currentData.reduce((acc, curr) => Math.max(acc, curr), 0);
	const id = maxId + 1;

	currentData.push({
		id,
		name,
		author,
		date,
	});

	try {
		fs.writeFile(DATA_PATH, JSON.stringify(currentData));
	} catch (e) {
		response.status(500);
		response.send({ error: "Failed to access (write) the database"});
		return;
	}

	response.status(200);
	response.send({ id });
});

app.listen(8080, () => {
	console.log(`The server is listening on port ${PORT}`);
})
