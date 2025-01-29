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

app.get("/read/:id", (req, res) => {
    const movieId = parseInt(req.params.id);
    const data = fs.readFileSync(DATA_PATH, "utf-8");
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

app.delete("/delete/:id", async (req, res) => {
    const movieId = parseInt(req.params.id);
    try {
        const movies = JSON.parse(await fs.readFile(DATA_PATH, { encoding: "utf-8" }));

        const index = movies.findIndex(movie => movie.id === movieId);

        if(index !== -1) {
            movies.splice(index, 1);
            await fs.writeFile(DATA_PATH, JSON.stringify(movies));

            res.send("Movie with ID "+ movieId +" deleted");
        }else{
            res.status(404).send("Movie not found");
        }

    } catch (error) {
        res.status(500).send("Server error");
    }
});

app.listen(8080, () => {
	console.log(`The server is listening on port ${PORT}`);
})
