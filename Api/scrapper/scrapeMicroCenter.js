import axios from 'axios';
import cheerio from 'cheerio';

const extractSkuId = (url) => {
    const regex = /\/product\/(\d+)\//;
    const match = url.match(regex);
    return match ? match[1] : null;
}

const scrapeMicroCenter = async (url) => {
    const skuId = extractSkuId(url);
    const { data } = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }
    });

    const $ = cheerio.load(data);

    const priceWhole = $('span#pricing').attr('content').split('.')[0];
    const priceFraction = $('sup.cent2022').text().trim();
    const price = `${priceWhole}.${priceFraction}`;


    const productResponse = await fetch(`https://api.bazaarvoice.com/data/products.json?passkey=cakxQphpT04Kbk3t7KwFBA6t0y0dwSLSF79MNdzA524Gs&locale=en_US&allowMissing=true&apiVersion=5.4&filter=id:0${skuId}`, {
        "headers": {
          "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\""
        },
        "referrer": "https://www.microcenter.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "omit"
      });
    
    const dataJson = await productResponse.json();

    const product = dataJson.Results[0];
    const productData = {
        name: product.Name,
        imageUrl: product.ImageUrl,
        price: price,
      };

    return productData;
}

export default scrapeMicroCenter;