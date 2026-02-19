// Cette fonction construit et affiche l'email
function contactRapide(nom, prenom, tel, email, message) {
    let mailto = `mailto:jpedrosmarcos@gmail.com?subject=Portfolio | Samuel PEDROS MARCOS&body=Salut, je suis ${nom} ${prenom}, joignable au ${email} et au ${tel}. ${message}.`
    location.href = mailto
}

// Cette fonction contient toutes les autres et permet de lancer le jeu
function MeContacter(){
/**/
    let form = document.querySelector("form") 
    form.addEventListener("submit", (event) => {
	event.preventDefault()

	let inputNom = document.getElementById("nom")
	let nom = inputNom.value
	let inputPrenom = document.getElementById("prenom")
	let prenom = inputPrenom.value
	let inputTel = document.getElementById("tel")
	let tel = inputTel.value
	let inputEmail = document.getElementById("email")
	let email = inputEmail.value
	let inputMessage = document.getElementById("message")
	let message = inputMessage.value

	console.log(nom)
	console.log(prenom)
	console.log(tel)
	console.log(email)
	console.log(message)
        
	contactRapide(nom, prenom, tel, email, message)
    })
}