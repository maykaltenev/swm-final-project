import puppeteer from "puppeteer";

async function run() {
  const browser = await puppeteer.launch();
  /*  const page = await browser.newPage(
    await page.goto("https://www.javatpoint.com/javascript-interview-questions")
  ) */
  const page = await browser.newPage();
  await page.goto("https://www.interviewbit.com/javascript-mcq/");

  /*  await page.pdf({ path: "example.pdf", format: "A4" }); */
  /* const title = await page.evaluate(() => document.title);
  console.log(title); */

  const questions = await page.$$eval(
    " .ibpage-mcq-problems__item",
    (elements) =>
      elements.map((item) => ({
        question: item.querySelector(".ibpage-mcq-problems__header div p")
          .innerText,
        answers: item.querySelector(
          ".ibpage-mcq-problems__content .ibpage-mcq-problems__checkbox-content p"
        ).innerText,
      }))
  );

  console.log(questions);

  await browser.close();
}

run();
