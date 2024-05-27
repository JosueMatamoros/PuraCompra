import axios from "axios";
import cheerio from "cheerio";

const scrapeAmazon = async (url, productName) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let products = [];
    let currentProduct = null;

    // Recorrer todos los elementos de los resultados de la búsqueda
      $('div.s-result-item').each((index, element) => {
        const title = $(element).find('h2 a span').text().trim();
        const priceText = $(element).find('span.a-price span.a-offscreen').text().trim();
        const image = $(element).find('img.s-image').attr('src');
        //console.log(currentProduct);
        //if (title && priceText && image) {
        const price = parseFloat(priceText.replace('$', '').replace(',', ''));
        currentProduct = { title, price, image };
        //console.log(currentProduct);
        products.push(currentProduct);
          
        //}
      });
      console.log(products);
      let maxPriceProduct = null;
      let maxPrice = 0.0;
      // Guardar el producto con el mayor precio para luego hacer un return del mismo
      //products.forEach(product => {
        //if (product.price > maxPrice) {
          //maxPrice = product.price;
          //maxPriceProduct = product;
        //}
      //});
      //return maxPriceProduct;
      //return products;

    } catch (error) {
      console.error('Error:', error);
  }
}

// Ejemplo de uso
// scrapeAmazon('https://www.amazon.com/s?k=apple+watch+ultra', 'Apple Watch Ultra');

export default scrapeAmazon;
