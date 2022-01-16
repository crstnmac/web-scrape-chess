const fs = require("fs");

var data = fs.readFileSync("src/data.json");

var elements = JSON.parse(data);

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
  var reply = elements.filter(function (row) {
    if (row.move === move) {
      return row.move;
    } else {
      return false;
    }
  });
  var data = reply[0];
  data = { moveName: data.moveName, steps: data.steps };

  res.send(data);
}
