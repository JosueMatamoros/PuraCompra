import path from 'path';
console.log(path.resolve('../scrapper/scrapeWalmart'));
console.log(path.resolve('../scrapper/scrapeMicroCenter'));
console.log(path.resolve('../scrapper/scrapeBestBuy'));


import scrapeWalmart from '../scrapper/scrapeWalmart.js';
import scrapeMicroCenter from '../scrapper/scrapeMicroCenter.js';
import scrapeBestBuy from '../scrapper/scrapeBestBuy.js';

export const scrapProduct = async (request, response) => {
    const { url } = request.body;
    try {
        let product;
        if (url.includes("bestbuy.com")) {
            product = await scrapeBestBuy(url);
        } else if (url.includes("walmart.com")) {
            product = await scrapeWalmart(url);
        } else if (url.includes("microcenter.com")) {
            product = await scrapeMicroCenter(url);
        } else {
            response.status(400).json({ message: "URL no soportada" });
        }
        response.status(200).json(product);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}
