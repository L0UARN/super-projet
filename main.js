const express = require("express");
const fs = require("fs");
const app = express();

const PORT = 8080;



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

