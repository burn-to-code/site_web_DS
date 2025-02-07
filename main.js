document.addEventListener("DOMContentLoaded", function() {
    ScrollReveal().reveal('section', { 
        delay: 200, 
        distance: '50px', 
        origin: 'bottom' 
    });

    const experienceButtons = document.querySelectorAll(".experience-button");
    const experienceTitle = document.getElementById("experience-title");
    const experienceText = document.getElementById("experience-text");
    const experienceImage = document.getElementById("experience-image");
    const experienceSkills = document.getElementById("experience-skills");

    const experiences = [
        {
            title: "Commercial terrain chez Call Masther - 1 an",
            text: "Prospection et gestion des clients pour développer les ventes.",
            image: "Images/Vendeur_Bouygues.jpg",
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
            image: "Images/Vendeur_Bouygues.jpg",
            skills: ["WordPress", "HTML & CSS"]
        }
    ];

    experienceButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            experienceTitle.textContent = experiences[index].title;
            experienceText.textContent = "";
            experienceImage.src = experiences[index].image;
            experienceSkills.innerHTML = "";

            let i = 0;
            const interval = setInterval(() => {
                if (i < experiences[index].text.length) {
                    experienceText.textContent += experiences[index].text[i];
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 50);

            experiences[index].skills.forEach(skill => {
                const skillElement = document.createElement("a");
                skillElement.href = `#${skill.replace(/\\s+/g, '-').toLowerCase()}`;
                skillElement.textContent = `#${skill}`;
                skillElement.classList.add("skill-tag");
                experienceSkills.appendChild(skillElement);
            });
        });
    });
});
