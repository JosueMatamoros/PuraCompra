import scrapeAmazon from "../scrapper/scrapeAmazon.js";

export const scrapProduct = async (request, response) => {
  const { url, productName } = request.body;
  try {
    const product = await scrapeAmazon(url, productName);
    response.json(product);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}
