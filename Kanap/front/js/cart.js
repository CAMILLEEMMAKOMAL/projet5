// Récupération du localStorage
let cart = JSON.parse(localStorage.getItem("cart"));

// Variable pour stocker les Id de chaque articles présent dans le panier (utilisés pour créer la commande)
let products = [];

// Variable qui récupère l'orderId envoyé comme réponse par le serveur lors de la requête POST
let orderId = "";

// Affichage du contenu du panier
async function displayCart() {
    const parser = new DOMParser();
    const positionEmptyCart = document.getElementById("cart__items");
    let cartArray = [];
  
 // Si le localstorage est vide
 if (cart === null || cart === 0) {
    positionEmptyCart.textContent = "Votre panier est vide";
  } else {
    console.log("Des produits sont présents dans le panier");
  }

// Si le localstorage contient des produits
  for (i = 0; i < cart.length; i++) {
    const product = await getProductById(cart[i].id);
    const totalPriceItem = (product.price *= cart[i].quantity);
    cartArray += `<article class="cart__item" data-id="${cart[i].id}" data-color="${cart[i].color}">
                  <div class="cart__item__img">
                      <img src="${product.imageUrl}" alt="${product.altTxt}">
                  </div>
                  <div class="cart__item__content">
                      <div class="cart__item__content__description">
                          <h2>${product.name}</h2>
                          <p>${cart[i].color}</p>
                          <p>Prix unitaire: ${product.price}€</p>
                      </div>
                      <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p id="quantité">
                              Qté : <input data-id= ${cart[i].id} data-color= ${cart[i].color} type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${cart[i].quantity}>
                            </p>
                            <p id="sousTotal">Prix total pour cet article: ${totalPriceItem}€</p> 
                        </div>
                        <div class="cart__item__content__settings__delete">
                          <p data-id= ${cart[i].id} data-color= ${cart[i].color} class="deleteItem">Supprimer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  </article>`;
  }
  // Boucle d'affichage du nombre total d'articles dans le panier et de la somme totale
  let totalQuantity = 0;
  let totalPrice = 0;

  for (i = 0; i < cart.length; i++) {
    const article = await getProductById(cart[i].id);
    totalQuantity += parseInt(cart[i].quantity);
    totalPrice += parseInt(article.price * cart[i].quantity);
  }

  document.getElementById("totalQuantity").innerHTML = totalQuantity;
  document.getElementById("totalPrice").innerHTML = totalPrice;

  if (i == cart.length) {
    const displayBasket = parser.parseFromString(cartArray, "text/html");
    positionEmptyCart.appendChild(displayBasket.body);
    changeQuantity();
    deleteItem();
  }
}

// Récupération des produits de l'API
async function getProductById(productId) {
    return fetch("http://localhost:3000/api/products/" + productId)
      .then(function (res) {
        return res.json();
      })
      .catch((err) => {
        // Erreur serveur
        console.log("erreur");
      })
      .then(function (response) {
        return response;
      });
  }
  displayCart();

  // Modification de la quantité
function changeQuantity() {
    const quantityInputs = document.querySelectorAll(".itemQuantity");
    quantityInputs.forEach((quantityInput) => {
      quantityInput.addEventListener("change", (event) => {
        event.preventDefault();
        const inputValue = event.target.value;
        const dataId = event.target.getAttribute("data-id");
        const dataColor = event.target.getAttribute("data-color");
        let cart = localStorage.getItem("cart");
        let items = JSON.parse(cart);
  
        items = items.map((item, index) => {
          if (item.id === dataId && item.color === dataColor) {
            item.quantity = inputValue;
          }
          return item;
        });
        // Mise à jour du localStorage
      let itemsStr = JSON.stringify(items);
      localStorage.setItem("cart", itemsStr);
      // Refresh de la page Panier
      location.reload();
    });
  });
}

// Suppression d'un article
function deleteItem() {
    const deleteButtons = document.querySelectorAll(".deleteItem");
    deleteButtons.forEach((deleteButton) => {
      deleteButton.addEventListener("click", (event) => {
        event.preventDefault();
        const deleteId = event.target.getAttribute("data-id");
        const deleteColor = event.target.getAttribute("data-color");
        cart = cart.filter(
          (element) => !(element.id == deleteId && element.color == deleteColor)
        );
        console.log(cart);
        // Mise à jour du localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
      // Refresh de la page Panier
      location.reload();
      alert("Article supprimé du panier.");
    });
  });
}

/* LE FORMULAIRE */

// sélection du bouton Valider
const btnValidate = document.querySelector("#order");

// Écoute du bouton Valider sur le click pour pouvoir valider le formulaire
btnValidate.addEventListener("click", (event) => {
  event.preventDefault();

  let contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };

  console.log(contact);
