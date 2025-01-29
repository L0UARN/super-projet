const express = require("express");
const fs = require("fs/promises");

const PORT = 8080;
const DATA_PATH = "./data.json";

const app = express();
app.use(express.json());

app.post("/api/update/:id", async (request, response) => {
	let currentRawData = "";
	try {
		currentRawData = await fs.readFile(DATA_PATH, { encoding: "utf-8" });
	} catch (e) {
		response.status(500);
		response.send({ error: "Failed to access (read) the database"});
		return;
	}

	let currentData = JSON.parse(currentRawData);

	let requestedDataIndex = currentData.findIndex((e) => e.id == request.params.id);
	if (requestedDataIndex == -1) {
		response.status(404);
		response.send({ error: `There is no data associated with the id ${response.params.id}` });
		return;
	}

	const name = request.body["name"];
	if (name) {
		requestedData[requestedDataIndex]["name"] = name;
	}

	const author = request.body["author"];
	if (author) {
		requestedData[requestedDataIndex]["author"] = author;
	}

	const date = request.body["date"];
	if (date) {
		requestedData[requestedDataIndex]["date"] = date;
	}

	try {
		await fs.writeFile(DATA_PATH, JSON.stringify(currentData));
	} catch (e) {
		response.status(500);
		response.send({ error: "Failed to access (write) the database"});
		return;
	}

	response.status(200);
	response.send(currentData[requestedDataIndex]);
});

app.listen(8080, () => {
	console.log(`The server is listening on port ${PORT}`);
})
