const express = require("express");
const app = express();

const PORT = 8080;
app.listen(8080, () => {
	console.log(`The server is listening on port ${PORT}`);
})
