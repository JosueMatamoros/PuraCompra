import axios from 'axios';
import cheerio from 'cheerio';

const scrapeWalmart = async (url) => {
    try {
        // Realiza una solicitud GET a la URL del producto
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });

        // Carga el HTML en cheerio
        const $ = cheerio.load(data);

        // Extrae la información deseada
        const productName = $('.vtex-store-components-3-x-productBrand').text().trim();
        const price = $('span.vtex-store-components-3-x-currencyContainer').first().text().trim();
        const imageUrl = $('img.vtex-store-components-3-x-productImageTag').attr('src');

        // Muestra la información extraída
        console.log(`Product Name: ${productName}`);
        console.log(`Price: ${price}`);
        console.log(`Image URL: ${imageUrl}`);
    } catch (error) {
        console.error(`Error scraping data: ${error.message}`);
    }
}

// URL del producto en Walmart
scrapeWalmart('https://www.walmart.co.cr/harina-maiz-pan-precoc-blanco-1000gr-4/p');

export default scrapeWalmart;
