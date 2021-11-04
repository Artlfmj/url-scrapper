const axios = require('axios').default
const cheerio = require('cheerio');
const url = require('url');


const urlScrapper = (uri) => {
    return new Promise((resolve, reject) => {
        axios.get(uri)
        .then(response => {
            const $ = cheerio.load(response.data);
            const links = $('a');
            const newPaths = [];
            links.each((index, link) => {
            const href = $(link).attr('href');
            if (href) {
                const newUrl = url.resolve(uri, href);
                newPaths.push(newUrl);
            }
            });
            resolve(newPaths);
        })
        .catch(error => {
            reject(error);
        });
    });
    }

    module.exports = urlScrapper;

