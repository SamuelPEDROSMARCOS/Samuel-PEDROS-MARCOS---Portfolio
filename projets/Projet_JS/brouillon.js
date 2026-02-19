const monFilmPrefere = "Titanic"
const monPremierFilm = "Le Seigneur des Anneaux"

const maCollectionDeFilms = [monFilmPrefere, monPremierFilm]

// maCollectionDeFilms vaut ["Titanic", "Le Seigneur des Anneaux"]
let premierFilmDuTableau = maCollectionDeFilms[0]
const maCollectionDeFilms = ["Titanic", "Le Seigneur des Anneaux"]
const nombreDeFilms = maCollectionDeFilms.length
console.log(nombreDeFilms)
// nombreDeFilms vaut 2
let mesFilms = ["Titanic", "Jurassic Park"]
mesFilms.push("Retour vers le futur")

console.log(mesFilms)
// mesFilms vaut ["Titanic", "Jurassic Park", "Retour vers le Futur"]

let mesFilms = ["Titanic", "Jurassic Park", "Retour vers le futur"]
mesFilms.pop()

// mesFilms vaut ["Titanic", "Jurassic Park"]
// Copie par valeur
let variableSimple1 = 25
let variableSimple2 = variableSimple1
let variableComplexe1 = ['pomme', 'cerise']
let variableComplexe2 = variableComplexe1
let variableComplexe3 = [...variableComplexe1];
////////////////////
// Copie par valeur
////////////////////
let variableSimple1 = 25
let variableSimple2 = variableSimple1

variableSimple2 = 30

// Le console.log va afficher 25, le fait d’avoir changé la valeur de variableSimple2 ne change rien pour variableSimple1
console.log("variableSimple1", variableSimple1)
console.log("variableSimple2", variableSimple2)

///////////////////////
// Copie par référence
///////////////////////
let variableComplexe1 = ['pomme', 'cerise']
let variableComplexe2 = variableComplexe1
let variableComplexe3 = [...variableComplexe1];

variableComplexe2.push('poire')

// Le console.log va afficher pomme cerise ET poire. On a modifié la seconde variable, mais le contenu de la première a été changé aussi, parce que c’est le même contenu.
console.log('variableComplexe1', variableComplexe1)
console.log('variableComplexe2', variableComplexe2)
console.log('variableComplexe3', variableComplexe3)

let motTapeOk = true 
if (motTapeOk) {
    console.log("Bravo, vous avez correctement tapé le mot")
} else {
    console.log("Échec, le mot n'est pas correct")
}

// Méthode basique
let motUtilisateur = prompt("Entrez un mot :")
console.log(motUtilisateur)
if (motUtilisateur === motApplication) {
    console.log("Bravo !")
} else {
    if (motUtilisateur === "Gredin") {
        console.log("Restez correct !")
    } else {
        if (motUtilisateur === "Mécréant") {
            console.log("Restez correct !")
        } else {
            if (motUtilisateur === "Vilain") {
                console.log("Soyez gentil !")
            } else {
                console.log("Vous avez fait une erreur de frappe.")
            }
        }
    }
}

// Avec optimisation on a
switch (motUtilisateur) {
    case motApplication:
        console.log("Bravo !")
        break
    case "Gredin":
        console.log("Restez correct !")
        break
    case "Mécréant":
        console.log("Restez correct !")
        break
    case "Vilain":
        console.log("Soyez gentil !")
        break
    default:
        console.log("Vous avez fait une erreur de frappe.")
}

<body>
    /*
    //Récupérez un élément avec getElementById
    <div id="zoneProposition">Cachalot</div>
    let baliseZoneProposition = document.getElementById("zoneProposition");
    //Pour accéder à cette balise
    console.log(baliseZoneProposition);
    //pour afficher la hauteur de l’élément dans votre console
    console.log(baliseZoneProposition.clientHeight);
    */
    /*
    //Récupérez un élément QuerySelector
    <div id="zoneProposition">
        Entrez le mot : <span>Cachalot</span>
    </div>
    //Pour mettre le mot Cachalot en gras en CSS
    #zoneProposition span {
	font-weight: bold;
    }
    let baliseZonePropositionSpan = document.querySelector("#zoneProposition span");
    console.log(baliseZonePropositionSpan);
    */
    /*
    //Récupérez plusieurs éléments avec QuerySelectorAll
    <div class="zoneChoix">
        <input type="radio" name="optionSource" id="mots" value="1" checked>
        <label for="mots">Mots</label>
        <input type="radio" name="optionSource" id="phrases" value="2">
        <label for="phrases">Phrases</label>
    </div>
    <div class="zoneProposition">
        Entrez le mot : <span>Cachalot</span>
    </div>
    //Pour récupérer tous les inputs de type radio d’un seul coup
    let listeInputRadio = document.querySelectorAll(".zoneChoix input");
    console.log(listeInputRadio);*/

</body>
/*
// Définition des variables contenant le texte du titre et du paragraphe
let contenuTitre = "Azertype"
let contenuParagraphe = "L'application pour apprendre à taper plus vite !"

// Création d'un div avec createElement. Dans cette div, on va créer un titre h1 et un paragraphe p
let nouvelleDiv = document.createElement("div")
let nouveauTitre = document.createElement("h1")
let nouveauParagraphe = document.createElement("p")

// On ajoute du texte dans le titre et le paragraphe
nouveauTitre.textContent = contenuTitre
nouveauParagraphe.textContent = contenuParagraphe

// On ajoute le titre et le paragraphe dans la div
nouvelleDiv.appendChild(nouveauTitre)
nouvelleDiv.appendChild(nouveauParagraphe)

// On ajoute la div dans le body
let body = document.querySelector("body")
body.appendChild(nouvelleDiv)
let contenuTitre = "Azertype"
let contenuParagraphe = "L'application pour apprendre à taper plus vite !"

let div = `
    <div>
        <h1>${contenuTitre}</h1>
        <p>${contenuParagraphe}</p>
    </div>
    `;
let body = document.querySelector("body")
body.innerHTML = div
*/
