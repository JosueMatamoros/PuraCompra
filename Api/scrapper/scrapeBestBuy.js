
// Función para extraer el skuId de la URL
const extractSkuId = (url) => {
  const regex = /\/(\d+)\.p\?skuId=(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Función para obtener los datos del producto de Best Buy usando el skuId
const getBestBuyProductData = async (url) => {
  const skuId = extractSkuId(url);

  if (!skuId) {
    console.error('No se pudo extraer el skuId de la URL proporcionada.');
    return;
  }

  const dataResponse = await fetch(`https://www.bestbuy.com/suggest/v1/fragment/products/www?skuids=${skuId}`, {
    "headers": {
      "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": "\"Android\""
    },
  });

  const priceResponse = await fetch(`https://www.bestbuy.com/priceview/query/sku?_lazyHydrate=true&context=Product-Page&destinationZipCode=55401&deviceClass=l&effectivePlanPaidMemberType=NULL&includes=openBoxPrice%2Cprice%2CskuDataAnalytics&layout=egpOpbEntryPoint&locale=en-US&openBoxFacet=true&planPaidMember=false&skuId=${skuId}&viewType=price&vt=9f8d9b6c-1c6f-11ef-9e3c-0e70a2874e17`, {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "if-none-match": "W/\"15e-JM4eSVCXeoO0HghYjdWaNfhWi9s-gzip\"",
      "priority": "u=1, i",
      "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": "\"Android\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin"
    },
    "referrer": "https://www.bestbuy.com/site/alienware-m16-r2-qhd-240hz-gaming-laptop-intel-core-ultra-7-16gb-memory-nvidia-geforce-rtx-4070-1tb-ssd-dark-metallic-moon/6571484.p?skuId=6571484",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
  });

  const dataJson = await dataResponse.json();
  const priceJson = await priceResponse.json();

  const product = dataJson.products[0];
  const price = priceJson.skuDataAnalytics.customerPrice;
  console.log(product.imageUrl);
  const imageUrl = `https://pisces.bbystatic.com/image2/${product.imageUrl};maxHeight=1000;maxWidth=1000`;


  const productData = {
    altText: product.altText,
    skushortlabel: product.skushortlabel,
    imageUrl: imageUrl,
    customerrating_facet: product.customerrating_facet,
    regularPrice: price
  };

  console.log(productData);
}

// Ejemplo de uso
const url = 'https://www.bestbuy.com/site/apple-11-inch-ipad-pro-m4-chip-wi-fi-256gb-with-oled-space-black/5495362.p?skuId=5495362';

getBestBuyProductData(url);

export default getBestBuyProductData;
