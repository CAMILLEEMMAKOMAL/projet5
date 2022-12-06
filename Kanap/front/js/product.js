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

  // Sélection de l'ID colors
const selectedColor = document.querySelector("#colors");

// Sélection de l'ID quantity
const selectedQuantity = document.querySelector("#quantity");

// Sélection du bouton Ajouter au panier
const button = document.querySelector("#addToCart");

// Fonction qui récupère les données de la promesse .then(product) pour injecter les valeurs dans le fichier Html
let selectedProduct = (product) => {
  // Intégration des données du produit sélectionné dans la page HTML
  document.querySelector("head > title").textContent = product.name;
  document.querySelector(".item__img")
  .innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  document.querySelector("#title").textContent += product.name;
  document.querySelector("#price").textContent += product.price;
  document.querySelector("#description").textContent += product.description;

  // Boucle intégrant les différentes couleurs du produit dans le HTML
  for (color of product.colors) {
    let option = document.createElement("option");
    option.innerHTML = `${color}`;
    option.value = `${color}`;
    selectedColor.appendChild(option);
  }
};