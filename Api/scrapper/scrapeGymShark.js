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
        const productName = $('.product-information_title__3jR8K').text().trim();
        const price = $('.product-information_price__pEWjj').first().text().trim();
        const imageUrl = $('img.image-gallery_gallery--item').attr('srcset');

        // Muestra la información extraída
        console.log(`Product Name: ${productName}`);
        console.log(`Price: ${price}`);
        console.log(`Image URL: ${imageUrl}`);
    } catch (error) {
        console.error(`Error scraping data: ${error.message}`);
    }
}

// URL del producto en Walmart
scrapeWalmart('https://row.gymshark.com/products/gymshark-crew-socks-5pk-white-ss23');

export default scrapeWalmart;
