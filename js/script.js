// Écouteur d'événement pour le chargement du document
document.addEventListener("DOMContentLoaded", function () {
  // Initialisation des variables
  let max = 10; // Valeur maximale par défaut
  let secretNumber = Math.floor(Math.random() * max) + 1; // Génération d'un nombre aléatoire
  let numberInput = document.getElementById("number"); // Récupération de l'élément pour entrer le nombre
  let generateBtn = document.getElementById("generateBtn"); // Bouton pour générer le nombre
  let resetBtn = document.getElementById("reset"); // Bouton pour réinitialiser le jeu
  let restartBtn = document.getElementById("restart"); // Bouton pour rejouer
  let essais = [
    // Tableau pour stocker les éléments d'affichage des essais
    document.getElementById("essai1"),
    document.getElementById("essai2"),
    document.getElementById("essai3"),
  ];
  let essaisCounter = 0; // Compteur d'essais
  let gameInProgress = false; // Indicateur pour vérifier si le jeu est en cours

  // Fonction pour mettre à jour le score et le stocker dans le stockage local
  function updateScore(points) {
    let score = localStorage.getItem("score")
      ? parseInt(localStorage.getItem("score"))
      : 0;
    score += points;
    document.getElementById("scoreValue").textContent = score;
    localStorage.setItem("score", score.toString());
  }

  // Fonction pour jouer le jeu
  function playGame() {
    let choixUtilisateur = parseInt(numberInput.value);
    // Vérification si le nombre choisi par l'utilisateur est valide
    if (
      isNaN(choixUtilisateur) ||
      choixUtilisateur < 1 ||
      choixUtilisateur > max
    ) {
      document.getElementById("error-message").style.display = "block"; // Affichage du message d'erreur
      return;
    } else {
      document.getElementById("error-message").style.display = "none"; // Masquage du message d'erreur
    }

    // Vérification du nombre d'essais
    if (essaisCounter < 3) {
      // Si le nombre choisi est correct
      if (choixUtilisateur === secretNumber) {
        essais[essaisCounter].textContent =
          "Gagné 🙂 ! le numéro mystère était " + secretNumber + " ";
        generateBtn.disabled = true; // Désactivation du bouton pour générer
        restartBtn.style.display = "block"; // Affichage du bouton pour rejouer
        updateScore(10); // Mise à jour du score
      } else {
        // Si le nombre choisi est incorrect
        if (choixUtilisateur < secretNumber) {
          essais[essaisCounter].textContent =
            "C'est ➕ que : " + choixUtilisateur + " ";
        } else {
          essais[essaisCounter].textContent =
            "C'est ➖ que : " + choixUtilisateur + " ";
        }
        essaisCounter++; // Incrémentation du compteur d'essais
      }
    }

    // Si le joueur a épuisé tous ses essais sans trouver le nombre mystère
    if (essaisCounter === 3 && choixUtilisateur !== secretNumber) {
      essais[essaisCounter - 1].textContent =
        "YOU LOSE 😔 ! Le nombre mystère était " + secretNumber + ".";
      generateBtn.disabled = true; // Désactivation du bouton pour générer
      restartBtn.style.display = "block"; // Affichage du bouton pour rejouer
      updateScore(-5); // Mise à jour du score
    }
    numberInput.value = ""; // Réinitialisation de l'entrée utilisateur
    document.getElementById("resultList").style.display = "block"; // Affichage de la liste des résultats
    document.getElementById("score").style.display = "block"; // Affichage du score
  }

  // Écouteur d'événement pour la pression de la touche Entrée dans le champ de saisie
  numberInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      playGame(); // Appel de la fonction pour jouer
    }
  });

  // Écouteur d'événement pour le clic sur le bouton de génération
  generateBtn.addEventListener("click", function () {
    if (!gameInProgress) {
      playGame(); // Appel de la fonction pour jouer
      gameInProgress = true; // Mise à jour de l'indicateur de jeu en cours
    }
  });

  // Écouteur d'événement pour le clic sur le bouton de réinitialisation
  resetBtn.addEventListener("click", function () {
    generateBtn.disabled = false; // Réactivation du bouton pour générer
    essaisCounter = 0; // Réinitialisation du compteur d'essais
    secretNumber = Math.floor(Math.random() * max) + 1; // Génération d'un nouveau nombre mystère
    for (let i = 0; i < 3; i++) {
      essais[i].innerHTML = ""; // Réinitialisation de l'affichage des essais
    }
    numberInput.value = ""; // Réinitialisation de l'entrée utilisateur
    restartBtn.style.display = "none"; // Masquage du bouton pour rejouer
    gameInProgress = false; // Mise à jour de l'indicateur de jeu en cours

    // Réinitialisation du score
    localStorage.removeItem("score");
    document.getElementById("scoreValue").textContent = "0";
  });

  // Écouteur d'événement pour le clic sur le bouton pour rejouer
  restartBtn.addEventListener("click", function () {
    document.getElementById("resultList").style.display = "none"; // Masquage de la liste des résultats
    generateBtn.disabled = false; // Réactivation du bouton pour générer
    essaisCounter = 0; // Réinitialisation du compteur d'essais
    secretNumber = Math.floor(Math.random() * max) + 1; // Génération d'un nouveau nombre mystère
    for (let i = 0; i < 3; i++) {
      essais[i].innerHTML = ""; // Réinitialisation de l'affichage des essais
    }
    numberInput.value = ""; // Réinitialisation de l'entrée utilisateur
    restartBtn.style.display = "none"; // Masquage du bouton pour rejouer
    gameInProgress = false; // Mise à jour de l'indicateur de jeu en cours
  });

  // Écouteur d'événement pour les changements de niveau de difficulté
  document.querySelectorAll('input[name="difficulty"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      // Vérification si le jeu est en cours
      if (gameInProgress) {
        this.checked = false; // Désélection de l'option
        return;
      }
      // Mise à jour de la valeur maximale en fonction du niveau de difficulté sélectionné
      switch (this.value) {
        case "easy":
          max = 10;
          break;
        case "medium":
          max = 50;
          break;
        case "hard":
          max = 100;
          break;
        default:
          max = 10;
      }
      secretNumber = Math.floor(Math.random() * max) + 1; // Génération d'un nouveau nombre mystère
      numberInput.max = max; // Mise à jour de la valeur maximale du champ de saisie
    });
  });
});
