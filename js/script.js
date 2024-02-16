// Déclaration de la valeur maximale pour le nombre mystère
const max = 10;

// Génération du nombre mystère aléatoire entre 1 et 10 inclus
let secretNumber = Math.floor(Math.random() * max) + 1;

// Récupération de l'élément HTML correspondant au champ d'entrée pour le numéro choisi par l'utilisateur
let numberInput = document.getElementById("number");

// Récupération des éléments HTML correspondant aux boutons "Jouer" et "Rejouer"
let generateBtn = document.getElementById("generateBtn");
let resetBtn = document.getElementById("reset");

// Création d'un tableau contenant les éléments HTML correspondant à chaque tentative d'affichage du résultat
let essais = [
  document.getElementById("essai1"),
  document.getElementById("essai2"),
  document.getElementById("essai3"),
];

// Compteur pour suivre le nombre de tentatives effectuées par l'utilisateur
let essaisCounter = 0;

// Ajout d'un gestionnaire d'événements pour la touche "Entrer"
numberInput.addEventListener("keypress", function (event) {
  // Vérification si la touche appuyée est "Entrer" (code 13)
  if (event.key === "Enter") {
    // Empêcher le comportement par défaut (soumission du formulaire)
    event.preventDefault();
    // Appeler la fonction pour exécuter le jeu
    playGame();
  }
});

// Fonction pour jouer au jeu
function playGame() {
  // Récupération de la valeur saisie par l'utilisateur
  let choixUtilisateur = parseInt(numberInput.value);

  // Vérification si l'utilisateur a saisi un chiffre
  if (isNaN(choixUtilisateur)) {
    // Affichage du message d'erreur
    document.getElementById("error-message").style.display = "block";
    return; // Arrêt de l'exécution de la fonction
  } else {
    // Masquage du message d'erreur s'il est affiché
    document.getElementById("error-message").style.display = "none";
  }

  // Vérification si l'utilisateur a encore des tentatives disponibles
  if (essaisCounter < 3) {
    // Vérification si l'utilisateur a trouvé le nombre mystère
    if (choixUtilisateur === secretNumber) {
      // Affichage du message de victoire
      essais[essaisCounter].textContent =
        "Gagné 🙂 ! le numéro mystère était " + secretNumber + " ";
      // Désactivation du bouton "Jouer"
      generateBtn.disabled = true;
      // Affichage du bouton "Rejouer"
      resetBtn.style.display = "block";
    } else {
      // Affichage du message indiquant si le nombre choisi est plus petit ou plus grand que le nombre mystère
      if (choixUtilisateur < secretNumber) {
        essais[essaisCounter].textContent =
          "C'est ➕ que : " + choixUtilisateur + " ";
      } else {
        essais[essaisCounter].textContent =
          "C'est ➖ que : " + choixUtilisateur + " ";
      }
      // Incrémentation du compteur de tentatives
      essaisCounter++;
    }
  }

  // Vérification si l'utilisateur a épuisé toutes ses tentatives
  if (essaisCounter === 3) {
    // Affichage du message de défaite
    essais[essaisCounter - 1].textContent =
      "YOU LOSE 😔 ! Le nombre mystère était " + secretNumber + ".";
    // Désactivation du bouton "Jouer"
    generateBtn.disabled = true;
    // Affichage du bouton "Rejouer"
    resetBtn.style.display = "block";
  }

  // Réinitialisation du champ d'entrée après chaque tentative
  numberInput.value = "";

  // Affichage de la liste des résultats
  document.getElementById("resultList").style.display = "block";
}

// Ajout d'un gestionnaire d'événements pour le clic sur le bouton "Jouer"
generateBtn.addEventListener("click", playGame);

// Ajout d'un gestionnaire d'événements pour le clic sur le bouton "Rejouer"
resetBtn.addEventListener("click", function () {
  // Masquage de la liste des résultats
  document.getElementById("resultList").style.display = "none";

  // Réinitialisation des variables et des éléments HTML
  generateBtn.disabled = false;
  essaisCounter = 0;
  secretNumber = Math.floor(Math.random() * max) + 1;
  for (let i = 0; i < 3; i++) {
    essais[i].innerHTML = "";
  }
  numberInput.value = "";

  // Masquage du bouton "Rejouer"
  resetBtn.style.display = "none";
});

// JavaScript pour afficher le bouton "Rejouer" seulement si le joueur a gagné ou perdu
function toggleResetButton(displayValue) {
  resetBtn.style.display = displayValue;
}
