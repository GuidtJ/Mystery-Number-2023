const max = 10;
let secretNumber = Math.floor(Math.random() * max) + 1;
let numberInput = document.getElementById("number");
let generateBtn = document.getElementById("generateBtn");
let resetBtn = document.getElementById("reset");
let essais = [
  document.getElementById("essai1"),
  document.getElementById("essai2"),
  document.getElementById("essai3"),
];
let essaisCounter = 0;

generateBtn.addEventListener("click", function () {
  let choixUtilisateur = parseInt(numberInput.value);

  if (essaisCounter < 3) {
    if (choixUtilisateur === secretNumber) {
      essais[essaisCounter].textContent =
        "Gagné 🙂 ! le numéro mystère était " + secretNumber + " ";
      generateBtn.disabled = true;
      resetBtn.style.display = "block";
    } else {
      if (choixUtilisateur < secretNumber) {
        essais[essaisCounter].textContent =
          "C'est ➕ que : " + choixUtilisateur + " ";
      } else {
        essais[essaisCounter].textContent =
          "C'est ➖ que : " + choixUtilisateur + " ";
      }
      essaisCounter++;
    }
  }

  if (essaisCounter === 3) {
    essais[essaisCounter - 1].textContent =
      "YOU LOSE 😔 ! Le nombre mystère était " + secretNumber + ".";
    generateBtn.disabled = true;
    resetBtn.style.display = "block";
  }

  numberInput.value = "";
});

resetBtn.addEventListener("click", function () {
  generateBtn.disabled = false;
  essaisCounter = 0;
  secretNumber = Math.floor(Math.random() * max) + 1;
  for (let i = 0; i < 3; i++) {
    essais[i].innerHTML = "";
  }
  numberInput.value = "";
  resetBtn.style.display = "none";
});
