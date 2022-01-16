const rp = require("request-promise");
const url = "https://www.chessgames.com/chessecohelp.html";
const $ = require("cheerio").load(url);

const fs = require("fs");

rp(url)
  .then((html) => {
    const scrapedData = [];
    console.log("Adding Data....");

    $("table > tbody > ", html).each((i, elm) => {
      ++i;
      const move = $(
        "tr:nth-child(" + i + ") > td:nth-child(1) > font",
        html
      ).text();

      const moveName = $(
        "tr:nth-child(" + i + ") > td:nth-child(2) > font > b",
        html
      ).text();

      const steps = $(
        "tr:nth-child(" + i + ") > td:nth-child(2) > font > font",
        html
      ).text();

      const row = { move, moveName, steps };
      if (row.move !== "") {
        scrapedData.push(row);
      }
    });
    var newData = JSON.stringify(scrapedData, null, 2);

    fs.writeFile("./src/data.json", newData, (err) => {
      if (err) throw err;
    });
    console.log("New Data Added :)");
  })
  .catch((err) => {
    console.log("Error", err);
  });
