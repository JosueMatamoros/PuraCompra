import axios from "axios";
import cheerio from "cheerio";

const scrapeAmazon = async (url, productName) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let products = [];

    // Recorrer todos los elementos de los resultados de la búsqueda
    $('div.s-result-item').each((index, element) => {
      const title = $(element).find('h2 a span').text().trim();
      const priceText = $(element).find('span.a-price span.a-offscreen').text().trim();
      const image = $(element).find('img.s-image').attr('src');

      // Verificar si el título del producto contiene el nombre proporcionado
      if (title.includes(productName) && priceText && image) {
        // Convertir el precio a un número
        const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
        if (!isNaN(price)) {
          products.push({ title, price, image });
        }
      }
    });

    // Calcular el promedio de los precios
    const averagePrice = products.reduce((sum, product) => sum + product.price, 0) / products.length;

    // Filtrar productos cuyo precio esté por encima de la media
    const filteredProducts = products.filter(product => product.price > averagePrice);

    // Mostrar los productos filtrados
    if (filteredProducts.length > 0) {
      console.log('Productos por encima del precio medio:', filteredProducts);
      return filteredProducts;
    } else {
      console.log(`No se encontraron productos que estén por encima del precio medio para "${productName}".`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Ejemplo de uso
// scrapeAmazon('https://www.amazon.com/s?k=apple+watch+ultra', 'Apple Watch Ultra');

export default scrapeAmazon;
