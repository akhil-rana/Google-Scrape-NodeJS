const puppeteer = require("puppeteer"); // Run JS on chromium browser on server backend
const $ = require("cheerio"); // Run Jquery kind structures on node backend

var searchKey = "hello world",
  numberOfResults = 10,
  output;
searchKey = searchKey.replace(/ /g, "+"); // To replace white space with "+"

var url =
  "https://www.google.com/search?q=" + searchKey + "&num=" + numberOfResults;

google_scrape(url);

function google_scrape(url) {
  (async () => {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "networkidle2"
    });
    var arr = [],
      arr1 = [];
    var HTML = await page.content();
    $(".rc .r .LC20lb", HTML).each(function() {
      arr.push(
        $(this)
          .parent()
          .attr("href")
      );
      arr1.push($(this).text());
    });

    output = { titles: arr1, urls: arr };
    console.log(output);
    browser.close();
    return output;
  })();
}
