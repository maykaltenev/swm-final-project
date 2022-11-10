import puppeteer from "puppeteer";

const scrapeData = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.javatpoint.com/javascript-mcq");

  const questions = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".pq "), (e) => ({
      title: e.innerText,
    }))
  );
  console.log(questions);

  await browser.close();
};

scrapeData();
