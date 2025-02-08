function applyAnimation(element) {
    // Enlève les classes existantes avant d'ajouter les nouvelles pour réinitialiser les animations
    element.classList.remove("fade-in", "slide-out");
    element.style.opacity = "0"; // Réinitialise l'opacité à 0

    element.classList.add("slide-out");

    setTimeout(() => {
        element.classList.remove("slide-out");
        element.style.opacity = "0"; 

        setTimeout(() => {
            element.classList.add("fade-in");
            element.style.opacity = "1"; 

            setTimeout(() => {
                element.classList.remove("fade-in");
            }, 700);
        }, 100); 
    }, 700); 
}


document.addEventListener("DOMContentLoaded", function() {
    ScrollReveal().reveal('section', { 
        delay: 200, 
        distance: '50px', 
        origin: 'bottom' 
    });

    let istyping = false;
    let currentInterval = null; // Pour garder une référence à l'intervalle en cours

    const experienceButtons = document.querySelectorAll(".experience-button");
    const experienceTitle = document.getElementById("experience-title");
    const experienceText = document.getElementById("experience-text");
    const experienceImage = document.getElementById("experience-image");
    const experienceSkills = document.getElementById("experience-skills");

    const experiences = [
        {
            title: "Commercial terrain chez Call Masther - 2 an (2022 - 2024)",
            text: "J’ai développé et géré un portefeuille clients en prospectant des leads qualifiés et en achetant des contacts ciblés, ce qui m’a permis de vendre des formations professionnelles adaptées aux besoins des entreprises. J’ai également pris en charge l’ensemble du processus de financement via les OPCOs, incluant la création de comptes, la rédaction des conventions et le suivi des demandes. En parallèle, j’ai négocié les restes à charge pour les entreprises et assuré un suivi rigoureux afin de garantir leur satisfaction et leur engagement dans nos programmes de formation.",
            image: "Images/commercial_masther.jpg",
            skills: ["Négociation", "Relation Client"]
        },
        {
            title: "Sous-directeur chez Call Masther - 6 mois",
            text: "Optimisation des marges et gestion d'une équipe de commerciaux.",
            image: "Images/Vendeur_Bouygues.jpg",
            skills: ["Management", "Optimisation"]
        },
        {
            title: "Création de sites WordPress",
            text: "Développement et personnalisation de sites web pour divers clients.",
            image: "Images/dev_image.jpg",
            skills: ["WordPress", "HTML & CSS"]
        }
    ];

    experienceButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            // Annule l'écriture en cours si un autre bouton est cliqué
            if (istyping) {
                clearInterval(currentInterval);
                experienceText.textContent = ""; // Réinitialise le texte
                istyping = false;
            }

            applyAnimation(document.querySelector(".experience-container"));
            experienceTitle.textContent = experiences[index].title;
            experienceText.textContent = "";
            experienceImage.src = experiences[index].image;
            experienceSkills.innerHTML = "";

            experiences[index].skills.forEach(skill => {
                const skillElement = document.createElement("a");
                skillElement.href = `#${skill.replace(/\\s+/g, '-').toLowerCase()}`;
                skillElement.textContent = `#${skill}`;
                skillElement.classList.add("skill-tag");
                experienceSkills.appendChild(skillElement);
            });

            // Commence une nouvelle animation de texte
            let i = 0;
            const interval = setInterval(() => {
                if (i < experiences[index].text.length) {
                    experienceText.textContent += experiences[index].text[i];
                    i++;
                } else {
                    clearInterval(interval);
                    istyping = false;
                }
            }, 30);

            // Sauvegarde de l'intervalle actuel pour pouvoir l'annuler lors d'un nouveau clic
            currentInterval = interval;
            istyping = true;
        });
    });
});
