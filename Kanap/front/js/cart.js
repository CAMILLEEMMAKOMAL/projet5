// Récupération du localStorage
let cart = JSON.parse(localStorage.getItem("cart"));

// Variable pour stocker les Id de chaque articles présent dans le panier (utilisés pour créer la commande)
let products = [];

// Variable qui récupère l'orderId envoyé comme réponse par le serveur lors de la requête POST
let orderId = "";

