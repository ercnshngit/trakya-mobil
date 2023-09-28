import * as cheerio from "cheerio-without-node-native";
export const getWebpage = async (url: string) => {
  const response = await fetch(url);
  const htmlString = await response.text();
  const $ = cheerio.load(htmlString);
  const bannersUrls = [];
  const news = [];
  const dateAndMeal = [];
  const events = [];
  const announcements = [];
  const others = [];
  $(".carousel-item") // select result <li>s
    .each((_, img) => {
      bannersUrls.push($("img", img).attr("src"));
    });

  $("strong").each((_, elem) => {
    const element = $(elem).text();
    if (element !== "") {
      dateAndMeal.push(element);
      console.log(dateAndMeal);
    }
  });
  $("#flush-collapseOne > .accordion-body").map((_, elem) => {
    const element = $(elem).text();
    const url = $(elem).find("a").attr("href");
    news.push({ url: url, text: element });
  });

  $("#flush-collapseTwo > .accordion-body").each((_, elem) => {
    const element = $(elem).text();
    const url = $(elem).find("a").attr("href");
    announcements.push({ url: url, text: element });
  });
  $("#flush-collapseThree > .accordion-body").each((_, elem) => {
    const element = $(elem).text();
    const url = $(elem).find("a").attr("href");
    events.push({ url: url, text: element });
  });
  $("#flush-collapseFour > .accordion-body").each((_, elem) => {
    const element = $(elem).text();
    const url = $(elem).find("a").attr("href");
    others.push({ url: url, text: element });
  });

  return {
    banners: bannersUrls,
    date: dateAndMeal[0] + "+" + dateAndMeal[1],
    meal: dateAndMeal[2] + "+" + dateAndMeal[3],
    news: news,
    events: events,
    announcements: announcements,
    others: others,
  };
};
