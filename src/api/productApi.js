import productsData from "../data/product";

let products = [...productsData]; //copy

//GET /products
export function getProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...products]);
    }, 500);
  });
}

// UPDATE PRODUCT TITLE
export function updateProductTitle(productId, newTitle) {
  return new Promise((resolve) => {
    setTimeout(() => {
      products = products.map((product) =>
        product.id === productId
          ? { ...product, title: newTitle }
          : product
      );

      resolve(products);
    }, 500);
  });
}



//DELETE /products/:id
export function deleteProduct(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      products = products.filter((product) => product.id !== id);
      resolve([...products]);
    }, 500);
  });
}


