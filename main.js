const express = require("express");
const fs = require("fs");
const app = express();

	const name = request.body["name"];

	if (name) {
		currentData[requestedDataIndex]["name"] = name;
	}

	const author = request.body["author"];
	if (author) {
		currentData[requestedDataIndex]["author"] = author;
	}

	const date = request.body["date"];
	if (date) {
		currentData[requestedDataIndex]["date"] = date;
	}

	try {
		fs.writeFile(DATA_PATH, JSON.stringify(currentData));
	} catch (e) {
		response.status(500);
		response.send({ error: "Failed to access (write) the database" });
		return;
	}

	response.status(200);
	response.send(currentData[requestedDataIndex]);

app.get("/api/read/:id", async (req, res) => {
	const movieId = parseInt(req.params.id);
	const data = await fs.readFile(DATA_PATH, { encoding: "utf-8" });
	console.log(req.params.id);
	const movies = JSON.parse(data);
	const movie = movies.find((movie) => movie.id === movieId);
	if (!movie) {
		res.status(404).send("Movie not found");
		return;
	} else {
		res.status(200).send(movie);
	}
})

app.delete("/api/delete/:id", async (req, res) => {
	const movieId = parseInt(req.params.id);
	try {
		const movies = JSON.parse(await fs.readFile(DATA_PATH, { encoding: "utf-8" }));

		const index = movies.findIndex(movie => movie.id === movieId);



app.listen(8080, () => {
	console.log(`The server is listening on port ${PORT}`);
})

app.get("/read/:id", (req, res) => {
    const movieId = parseInt(req.params.id);
    const data = fs.readFileSync("./data.json", "utf-8");
    console.log(req.params.id);
    const movies = JSON.parse(data);
    const movie = movies.find((movie) => movie.id === movieId);
    if(!movie){
        res.status(404).send("Movie not found");
        return;
    }else{
        res.status(200).send(movie);
    }
})

