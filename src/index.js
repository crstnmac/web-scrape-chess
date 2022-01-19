const fs = require("fs");

var data = fs.readFileSync("src/data.json");

let elements = JSON.parse(data);

const express = require("express");

const cors = require("cors");

const app = express();

app.listen(process.env.PORT || 3000, () =>
  console.log("Server started at port: 3000")
);

app.use(express.static("public"));
app.use(cors());
app.get("/", allData);

function allData(req, res) {
  res.send(elements);
}

app.get("/:move", searchElement);

function searchElement(req, res) {
  var move = req.params.move;
  move = move.toUpperCase();
  if (elements.find((element) => element.move === move)) {
    res.send(elements.find((element) => element.move === move));
  } else {
    res.send({ status: "Not found" });
  }
}
