

const extractSkuId = (url) => {
    const regex = /\/product\/(\d+)\//;
    const match = url.match(regex);
    return match ? match[1] : null;
}

const getMicroCenterData = async (url) => {
    const skuId = extractSkuId(url);
    console.log(skuId);
    const product = await fetch(`https://api.bazaarvoice.com/data/products.json?passkey=cakxQphpT04Kbk3t7KwFBA6t0y0dwSLSF79MNdzA524Gs&locale=en_US&allowMissing=true&apiVersion=5.4&filter=id:0${skuId}`, {
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


    console.log(await product.json());
}

const url = "https://www.microcenter.com/product/673279/lian-li-o11-vision-tempered-glass-atx-mid-tower-computer-case-white";

getMicroCenterData(url);