const express = require("express");
const app = express();

const fs = require("fs");

const PORT = 8080;
app.listen(8080, () => {
	console.log(`The server is listening on port ${PORT}`);
})

app.delete("/delete/:id", (req, res) => {
    const movieId = parseInt(req.params.id);
    try {
        const movies = JSON.parse(fs.readFileSync("data.json","utf-8"));

        const index = movies.findIndex(movie => movie.id === movieId);

        if(index !== -1) {
            movies.splice(index, 1);
            fs.writeFileSync("data.json", JSON.stringify(movies), "utf-8");

            res.send("Movie with ID "+ movieId +" deleted");
        }else{
            res.status(404).send("Movie not found");
        }

    } catch (error) {
        res.status(500).send("Server error");
    }
});