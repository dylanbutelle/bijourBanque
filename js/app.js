import {user} from "./user.js";

document.querySelector("#firstname").textContent = user.firstname;

let ulliCredit = document.querySelector("#detailsCredit");
let ulliDebit = document.querySelector("#detailsDebit");
let totalCredit = document.querySelector("#totalCredit");
let totalDebit = document.querySelector("#totalDebit");
let totalDebitPourcent = document.querySelector("#totalDebitPercent");
let soldeTotal = document.querySelector("#total");
let recupPercent = document.getElementsByClassName("percentDebit");
let recupMontant = document.getElementsByClassName("montantDebit")
let calculTotalCredit = 0;
let calculTotalDebit = 0;

let percent = 0;
let percentTotal = 0;
// on stocke toutes les opérations de compte dans un array[]
let operationsCompte = [];
// on déclare nos variables
let solde = 0;
let operator = "";
let devise = "€";

function calculPercent(operateur) {
    if (operateur === '+') {
        for (let i = 0; i < recupPercent.length; i++) {
            let percentDebit = (parseInt(recupMontant[i].textContent) / parseInt(totalCredit.textContent)) * 100;
            recupPercent[i].textContent = percentDebit.toFixed(2) + "%";
        }
    }

}

function calcul(operateur, libelle, montant) {
    let createLi = document.createElement("li");
    let createSpanIntitule = document.createElement("span");
    let createSpanMontant = document.createElement("span");
    let createSpanPourcent = document.createElement("span");
    createLi.appendChild(createSpanIntitule);
    createLi.appendChild(createSpanMontant);

    if (operateur === '+') {

        createSpanIntitule.setAttribute("class", "intitule");
        createSpanMontant.setAttribute("class", "montant txt-color-gazoil");
        calculTotalCredit += montant;
        solde += montant;

        createSpanMontant.textContent = montant + devise;
        createSpanIntitule.textContent = libelle;
        ulliCredit.appendChild(createLi);

    } else if (operateur === '-') {
        createLi.appendChild(createSpanPourcent);

        createSpanIntitule.setAttribute("class", "intitule");
        createSpanMontant.setAttribute("class", "montant montantDebit txt-color-red");
        createSpanPourcent.setAttribute("class", "percent percentDebit txt-color-red");
        calculTotalDebit += montant;
        solde -= montant;
        percent = (montant / calculTotalCredit) * 100;

        createSpanPourcent.textContent = percent.toFixed(2) + "%";

        createSpanMontant.textContent = montant + devise;
        createSpanIntitule.textContent = libelle;
        ulliDebit.appendChild(createLi);

    }
    percentTotal = (calculTotalDebit / calculTotalCredit) * 100;
    totalCredit.textContent = calculTotalCredit + devise;
    totalDebit.textContent = calculTotalDebit + devise;
    totalDebitPourcent.textContent = percentTotal.toFixed(2) + "%";
    soldeTotal.textContent = solde + devise;

}

// on execute la function
calcul("+", "Salaire Q&DInformatique", 3400);
calcul("-", "Paiement Nico", 235);
calcul("-", "Paiement Jury pour la certif", 459);
calcul("-", "Assurance Porsche 911 Turbo S", 760);

// send form, add operation
const formulaire = document.getElementById("ajoutOperation");
formulaire.addEventListener("submit", function (e) {
    e.preventDefault();
    // on récupère les valeurs des champs du formulaire
    let operateur = document.querySelector("#operation").value;
    let intitule = document.querySelector("#intitule").value;
    let number = document.querySelector("#montant").value;

    // on stocke ces valeurs dans un array[]
    let values = [
        operateur,
        intitule,
        number
    ]


    // on ajoute cet array dans notre array global operationsCompte
    operationsCompte.push(values);

    // on execute la fonction pour actualiser
    calcul(operateur, intitule, parseInt(number));
    calculPercent(operateur);
    // on reset le formulaire
    formulaire.reset();
});
