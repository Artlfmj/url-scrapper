const axios = require("axios").default;
const cheerio = require("cheerio");
const url = require("url");

const urlScrapper = (uri) => {
  return new Promise((resolve, reject) => {
    axios
      .get(uri)
      .then((response) => {
        const $ = cheerio.load(response.data);
        const links = $("a");
        const newPaths = [];
        links.each((index, link) => {
          const href = $(link).attr("href");
          if (href) {
            const newUrl = url.resolve(uri, href);
            newPaths.push(newUrl);
          }
        });
        resolve(newPaths);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Get all images from a website
const getImages = (uri) => {
    return new Promise((resolve, reject) => {
        axios
            .get(uri)
            .then((response) => {
                const $ = cheerio.load(response.data);
                const images = $("img");
                const newPaths = [];
                images.each((index, image) => {
                    const src = $(image).attr("src");
                    if (src) {
                        const newUrl = url.resolve(uri, src);
                        newPaths.push(newUrl);
                    }
                });
                resolve(newPaths);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

module.exports = {urlScrapper, getImages};
