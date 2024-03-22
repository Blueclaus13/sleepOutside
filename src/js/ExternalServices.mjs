//const baseURL = "http://server-nodejs.cit.byui.edu:3000/";
const baseURL = import.meta.env.VITE_SERVER_URL

async function convertToJson(res) {
  // const response = await res.json();
  // console.log(response);
  if (res.ok) {
    return res.json();
  } else {
    throw { name: "Service Error", message: response.message};
  }
}

export default class ExternalServices {
  constructor(category) {

  }

  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const product = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(product);
    return data.Result;
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch("https://wdd330-backend.onrende.com:3000" + "/checkout/", options).then(convertToJson);
  }
}
