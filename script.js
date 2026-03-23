/* ==============================================
   PORTFOLIO SAMUEL PEDROS MARCOS - Script principal
   ============================================== */

// ==============================================
// FORMULAIRE DE CONTACT
// ==============================================
function initFormulaire() {
    const form = document.querySelector("form");
    
    if (!form) return; // Sortir si le formulaire n'existe pas
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();     // quand on l'envoie, on intercepte l'action pour la contrôler nous-mêmes.
        
        // Récupérer les champs et enlève les espaces au début/fin
        const nom = document.getElementById("nom")?.value.trim() || "";     // Si l'élément n'existe pas alors la variable prend "" (chaîne vide)
        const prenom = document.getElementById("prenom")?.value.trim() || "";
        const tel = document.getElementById("tel")?.value.trim() || "";
        const email = document.getElementById("email")?.value.trim() || "";
        const message = document.getElementById("message")?.value.trim() || "";
        
        // Validation des champs
        if (!validerFormulaire(nom, prenom, tel, email, message)) {
            return; // Arrêter si validation échoue
        }
        
        // Afficher message de confirmation
        afficherConfirmation();
        
        // Envoyer l'email
        contactRapide(nom, prenom, tel, email, message);
    });
}

// ==============================================
// VALIDATION DU FORMULAIRE
// ==============================================
function validerFormulaire(nom, prenom, tel, email, message) {
    
    // Vérifier que les champs ne sont pas vides
    if (nom === "" || prenom === "" || tel === "" || email === "" || message === "") {
        alert("❌ Tous les champs doivent être remplis !");
        return false;
    }
    
    // Validation email (simple)
    if (!email.includes("@") || !email.includes(".")) {
        alert("❌ Veuillez entrer un email valide (ex: nom@domaine.com)");
        return false;
    }
    
    // Validation téléphone (au moins 10 chiffres)
    const telNumerique = tel.replace(/\D/g, ''); // Garde seulement les chiffres et supprime tout le reste
    if (telNumerique.length < 10) {
        alert("❌ Veuillez entrer un numéro de téléphone valide (au moins 10 chiffres)");
        return false;
    }
    
    // Validation message (minimum 10 caractères)
    if (message.length < 10) {
        alert("❌ Votre message doit contenir au moins 10 caractères");
        return false;
    }
    
    return true; // Tout est valide
}

// ==============================================
// MESSAGE DE CONFIRMATION
// ==============================================
function afficherConfirmation() {
    
    // Créer l'élément de message
    const msg = document.createElement("div");
    msg.className = "confirmation-message";
    msg.textContent = "✓ Message prêt ! Votre client mail va s'ouvrir.";
    msg.setAttribute("role", "alert");  //dit aux lecteurs d'écran que c'est une alerte
    
    // Ajouter au formulaire
    const form = document.querySelector("form");
    form.appendChild(msg);
    
    // Faire disparaître après 3 secondes
    setTimeout(() => {
        msg.style.opacity = "0";
        setTimeout(() => {
            msg.remove();   //Supprime complètement le message du DOM
        }, 300);
    }, 3000);   //Attend 3000ms 3 secondes que l'utilisateur lise le message puis commence la disparition
    /*Pourquoi deux setTimeout ? le premier attend 3 secondes avant de commencer à cacher et le deuxième attend que l'animation CSS (0.3s) finisse avant de supprimer*/
}

// ==============================================
// ENVOI DE L'EMAIL
// ==============================================
function contactRapide(nom, prenom, tel, email, message) {
    
    // Nettoyer le message (enlever les espaces superflus)
    const messagePropre = message.replace(/\s+/g, ' ').trim();   //Remplace les espaces multiples par un seul espace, puis enlève les espaces au début/fin
    
    // Construire l'URL mailto
    const sujet = encodeURIComponent("Portfolio | Samuel PEDROS MARCOS");   //Transforme les caractères spéciaux en format URL.
    const corps = encodeURIComponent(
        `Salut, je suis ${nom} ${prenom},\n\n` +
        `📞 Téléphone : ${tel}\n` +
        `📧 Email : ${email}\n\n` +
        `Message :\n${messagePropre}`
    );
    
    // Ouvrir le client mail
    window.location.href = `mailto:jpedrosmarcos@gmail.com?subject=${sujet}&body=${corps}`;
    /*window est l'objet GLOBAL du navigateur; Toutes les variables globales sont attachées à window et permet d'éviter les conflits si tu as une variable location ailleurs.*/
}


// ==============================================
// INITIALISATION - Appel des fonctions
// ==============================================
initFormulaire();
