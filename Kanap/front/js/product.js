// Récupération de l'ID du produit
const getProductId = () => {
  return new URL(location.href).searchParams.get("id");
};
const productId = getProductId();

fetch(`http://localhost:3000/api/products/${productId}`)
  .then((response) => {
    return response.json();
  })

  .then((product) => {
    selectedProduct(product);
    registredProduct(product);
  })
  .catch((error) => {
    alert(error);
  });
