//initialisation du dom et attente qu'il soit complétement chargé pour effectué nos modifs
document.addEventListener("DOMContentLoaded", function() {

    // INJECTION DE L'ADRESSE MAIL ENCODEE 
    const emailChars = [115, 101, 110, 97, 115, 115, 111, 110, 46, 100, 101, 118, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109];
    const email = emailChars.map(c => String.fromCharCode(c)).join('');
    const emailElement = document.querySelectorAll(".email-contact");
    emailElement.forEach(element => {
        element.innerHTML = `<a href="mailto:${email}">me contacter par mail<i class="fa-solid fa-envelope" style="padding: 5px;"></i></a>`;
    });

    // Fonction scroll reveal sur l'emsemble de la page : fait apparaitre les sections html au moment du scroll 
    ScrollReveal().reveal('section', { 
        delay: 200, 
        distance: '50px', 
        origin: 'bottom' 
    });

    // Fonction d'animation du div expériences professionnelles
    function applyAnimation(element) {
        // remove et opacity pour réinitialiser l'animation et sur qu'elle s'effecture a chaque fois
        element.classList.remove("fade-in", "slide-out");
        element.style.opacity = "0";
        //debut d'animation slide
        element.classList.add("slide-out");

        setTimeout(() => { 
            //remove de la classe slide-out de disparition du div
            element.classList.remove("slide-out");
            element.style.opacity = "0"; 

            setTimeout(() => {
                //ajout du fade-in pour faire apparaitre notre contenu 
                element.classList.add("fade-in");
                element.style.opacity = "1"; 

                setTimeout(() => {
                    //remove de la class fade-in
                    element.classList.remove("fade-in");
                }, 700);
            }, 100); 
        }, 700); 
    };

    // la fonction qui montre les differents div dans la section project
    function showDiv(numéro) {
        const blocks = document.querySelectorAll(".block_project > div");
        blocks.forEach((block) => {
            block.classList.remove("visible");
            block.style.position = "absolute"; // Positionner tous les blocs en absolu
        });
        setTimeout(() => {
            blocks.forEach((block, index) => {
                if ((index + 1) === numéro) {
                    block.classList.add("visible");
                    block.style.position = "relative"; // Positionner le bloc visible en relatif
                }
            });
        }, 500); // Délai pour permettre à l'animation de se terminer
    }

    // object Swiper pour la gestion du slider section hobbies
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clikable : true,
        },    
        autoplay: {
            delay: 5000,
        },
        effect: 'cube',
        speed: 1500,
        cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
        },
    });

    // DECLARATION DES VARIABLES
    // Varaibles de gestion de bug au niveau de l'écriture quand on appuie trop vite sur plusieurs bouton 
    let istyping = false; // Pour savoir quand notre contenu est entrain de s'écrire 
    let currentInterval = null; // Pour garder une référence à l'intervalle en cours

    let isAnimating = false; // Pour savoir si une animation est en cours
    // Variables de sélections d'élément html 
    const experienceButtons = document.querySelectorAll(".experience-button");
    const experienceTitle = document.getElementById("experience-title");
    const experienceText = document.getElementById("experience-text");
    const experienceImage = document.getElementById("experience-image");
    const experienceSkills = document.getElementById("experience-skills");

    // Variable du header pour l'opacité
    const header = document.querySelector("header");

    //variable pour l'effet sonore
   /* const sound_key = document.getElementById("sound_key");
    const h1_acceuil = document.querySelector(".acceuil_div h1");
    const h2_acceuil = document.querySelector(".acceuil_div h2"); 

    //Fonction de déclenchement et d'arret du keyboard
    // Play et reset de la bande sonore
    function PlaySoundKey() {
        sound_key.currentTime = 0;
        sound_key.play();
    }
    // Stop reset de la bande sonore
    /function StopSoundKey() {
        sound_key.load();
        sound_key.currentTime = 0;
    } */

    //Variable du conteneur about pour le row-reverse
    const AboutButton = document.getElementById("button-about");
    const aboutform = document.querySelector(".contact-div");
    const aboutIcon = document.querySelector(".icon_reseaux");
    const aboutText = document.querySelector(".about-text");
    const aboutImg = document.querySelector(".about-img");
    let isContactMode = false;
    // Liste d'objet experiences permettant la gestion des different changement de la section expérience professionnelles
    const experiences = [
        {
            title: "Commercial terrain chez Call Masther - 2 ans (2022 - 2024)",
            text: "J'ai développé et géré un portefeuille clients en prospectant des leads qualifiés et en achetant des contacts ciblés, ce qui m'a permis de vendre des formations professionnelles adaptées aux besoins des entreprises. J'ai également pris en charge l'ensemble du processus de financement via les OPCOs, incluant la création de comptes, la rédaction des conventions et le suivi des demandes. En parallèle, j'ai négocié les restes à charge pour les entreprises et assuré un suivi rigoureux afin de garantir leur satisfaction et leur engagement dans nos programmes de formation.",
            image: "Images/commercial_masther.jpg",
            skills: ["Prospection et développement de portefeuille",
                    "Négociation et closing",
                    "Veille et analyse du marché",
                    "Travail en autonomie et gestion du temps"]
        },
        {
            title: "Assitant de direction chez Call Masther - 6 mois (2024-2024)",
            text: "Après une année réussie en tant que commercial terrain avec 250 000 € de chiffre d'affaires généré, j'ai été promu assistant de direction pour prendre en charge des missions stratégiques. J'ai supervisé la facturation afin d'optimiser la trésorerie et garantir la précision des paiements. J'ai structuré une veille commerciale et réglementaire tout en formant et coordonnant l'équipe commerciale pour améliorer les performances de vente. Pour optimiser les opérations, j'ai mis en place un système automatisé de réservation et développé des projets de classe, améliorant ainsi l'organisation des formations et l'expérience des apprenants.",
            image: "Images/Vendeur_Bouygues.png",
            skills: ["Gestion de la facturation et suivi des paiements",
                    "Management d'une équipe commerciale",
                    "Optimisation des opérations et des marges",
                    "Analyse et veille réglementaire"]
        },
        {
            title: "Création de sites WordPress (2022-Aujourd'hui)",
            text: "Pendant deux ans et demi chez Call Masther, j'ai conçu et géré les sites mpassionate.fr et jd-teach.fr sous WordPress, assurant leur développement, leur optimisation et leur mise à jour. J'ai travaillé sur l'ergonomie, le référencement naturel (SEO) et l'intégration de fonctionnalités pour améliorer la visibilité et l'accessibilité des formations proposées. En parallèle, j'ai géré le contenu, les performances techniques et la stratégie digitale, permettant d'optimiser l'acquisition de prospects et l'expérience utilisateur. Cette expérience m'a permis de développer des compétences en gestion de sites web, en marketing digital et en optimisation SEO.Développement et personnalisation de sites web pour divers clients.",
            image: "Images/dev_image.jpg",
            skills: ["Création et gestion de sites WordPress",
                    "Web design et expérience utilisateur (UX/UI)",
                    "Référencement naturel (SEO)",
                    "Gestion de contenu et stratégie digitale"]
        },
        {
            title: "Conseiller de vente chez Bouygues Telecom - 1 an(2021-2022)",
            text: "Ma première expérience professionnelle chez Bouygues Telecom m'a permis de développer des compétences essentielles en vente et en relation client. J'ai conseillé les clients sur les offres mobiles et internet, assuré la gestion des abonnements et des facturations, et veillé à optimiser chaque interaction pour améliorer la satisfaction et la fidélisation. Ce poste m'a appris à analyser les besoins des clients, à négocier efficacement et à travailler avec des objectifs commerciaux précis. J'y ai aussi acquis des compétences en gestion administrative et en suivi des dossiers, renforçant ainsi ma rigueur et mon sens du service.",
            image: "Images/conseiller_de_vente.jpg",
            skills: ["Négociation commerciale",
                    "Gestion de la relation client",
                    "Vente et argumentation",
                    "Gestion administrative et facturation"]
        },
        {
            title: "Formation Développeur d'Application JAVA BAC+3 (2025 à aujourd'hui)",
            text: "Actuellement en formation de développement d'applications Java avec OpenClassrooms (niveau Bac+3), je me spécialise dans la conception et la programmation d'applications. Cette reconversion s'appuie sur mon expérience en gestion de sites web sous WordPress, en HTML5 et CCS3 et mon intérêt pour le développement back-end. Je maîtrise les bases de Python grâce à une formation UDEMY ainsi que la programmation orientée objet. Aujourd'hui, je recherche un stage ou une première expérience en développement, que ce soit dans le web ou les applications Java, afin de mettre en pratique mes compétences et continuer à progresser dans ce domaine.",
            image: "Images/Java.jpg",
            skills: ["Bases de l'algorithmie","Programmation orientée objet (POO)"]
        }
    ];


// FONCTION DU SON CLAVIER AU DECLENCHEMENT DE L'ANIMATION ET ARRET
    // DECLENCHEMENT
  /*  h1_acceuil.addEventListener("animationstart", function (event) {
        if (event.animationName === "typing_h1") {
       PlaySoundKey();
        }
    }); 

    h2_acceuil.addEventListener("animationstart", function (event) {
        if (event.animationName === "typing_h2") {
            PlaySoundKey();
        }
    });
    // ARRET
    h1_acceuil.addEventListener("animationend", function (event){
        if (event.animationName === "typing_h1") {
            StopSoundKey();
        }
    });

    h2_acceuil.addEventListener("animationend", function (event){
        if (event.animationName === "typing_h2") {
            StopSoundKey();
        }
    }); */


//FONCTION DU DIV EXPERIENCE AU CLIC
    // on parcourt chaque bouton et on lui donne un index
    experienceButtons.forEach((button, index) => {
        // on ajoute addeventlistener pour dire qu'on ecoute on permanence les boutons pour surveiller les clicks
        //et c'est bon chaque action réaliser ce fera après un click et en plus nous avons l'index du bonton pour gérer notre liste d'objet
        button.addEventListener("click", () => {
            // ajout changement des bouton après sélection 
            experienceButtons.forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
            // Annule l'écriture en cours si un autre bouton est cliqué
            if (istyping) {
                clearInterval(currentInterval);
                experienceText.textContent = ""; 
                istyping = false;
            }

            // Application de l'animation du contenu de le container experience
            applyAnimation(document.querySelector(".experience-container"));

            //modification des différents élément à l'interieur de notre container
            experienceTitle.textContent = experiences[index].title;
            experienceText.textContent = ""; // initialisation du text a zéro avant notre fonction d'écriture pour toujours reloader notre texte lors d'un changement de bouton 
            experienceImage.src = experiences[index].image;
            experienceSkills.innerHTML = "";
            // modification des compétences : un enfer j'ai pas tout compris, en tout cas on utilise foreach pour parcourir tout les skill de notre liste d'objet.skills ca on sait 
            experiences[index].skills.forEach(skill => {
                const skillElement = document.createElement("a"); // pour chaque element on crée un balise a, un bouton qu'on sauvegarde dans une variable
                skillElement.href = `#${skill.replace(/\\s+/g, '-').toLowerCase()}`; // ajouter un href pour l"ancre afin d'étre rediriger vers l'ancre en question
                skillElement.textContent = `#${skill}`; // ensuite ave text.content on modifier le html du text de la balise a
                skillElement.classList.add("skill-tag"); // on ajoute la class skill tag pour le css 
                experienceSkills.appendChild(skillElement); // ajoute de notre variable skillelement dans notre html
            });


            // fonction pour l'écriture automatique du paragraphe lors du click
            let i = 0; // utlisation d'un index avec iteration pour parcourir chaque caractère a l'ajouter a notre variable ce qui crèe l'écriture
            const interval = setInterval(() => {
                if (i < experiences[index].text.length) { //on boucle
                    experienceText.innerHTML += experiences[index].text[i];
                    i++;
                } else { // quand on sort on gère les beugs avec nos variable conditionnelle 
                    clearInterval(interval);
                    istyping = false;
                }
            }, 30); // 30 milisecondes entre chaque caractère

            currentInterval = interval;
            istyping = true;
        });
    });

    // Attente de scroll pour appliquer opacité sur le header 
    window.addEventListener("scroll", function () {
        if (window.scrollY > 30) {
            header.style.backgroundColor = "rgba(81, 16, 101, 0.7)";
            header.style.border = "1px solid rgba(0, 0, 0, 0.7)";
            header.style.transition = '1s';
        } else {
            header.style.backgroundColor = "transparent";
            header.style.border = "none";
        }
    });


    // ROW REVERSE DU ABOUT
    AboutButton.addEventListener("click", function () {
        if (isAnimating) {
            return;
        }
        isAnimating = true;
        if (!isContactMode) {
            // Faire disparaître about-text rapidement
            aboutText.classList.add("hidden");

            // Déplacer about-img vers la gauche
            setTimeout(() => {
                aboutImg.classList.add("move-left");
            }, 200);

            // Afficher aboutform et aboutIcon après le déplacement
            setTimeout(() => {
                aboutform.classList.add("visible");
                aboutIcon.classList.add("visible");
            }, 600);

            // Changer le texte du bouton
            setTimeout(() => {
                AboutButton.textContent = "Découvrez-moi";
                isAnimating = false;
            }, 600);
        } else {
            // Faire l'inverse

            // Cacher aboutform et aboutIcon
            aboutform.classList.remove("visible");
            aboutIcon.classList.remove("visible");

            // Remettre about-img à sa place
            setTimeout(() => {
                aboutImg.classList.remove("move-left");
            }, 200);

            // Réafficher about-text après le déplacement
            setTimeout(() => {
                aboutText.classList.remove("hidden");
            }, 600);

            // Changer le texte du bouton
            setTimeout(() => {
                AboutButton.textContent = "Contactez-moi";
                isAnimating = false;
            }, 600);
        }

        isContactMode = !isContactMode;
    });

    // Déclenchent des changement de div dans la section projet
    document.getElementById("btn-p-1").addEventListener("click", function() {
        showDiv(1);
    });
    document.getElementById("btn-p-2").addEventListener("click", function() {
        showDiv(2);
    });
    document.getElementById("btn-p-3").addEventListener("click", function() {
        showDiv(3);
    });
    document.getElementById("btn-p-4").addEventListener("click", function() {
        showDiv(4);
    });

    
    const burger = document.querySelector(".burger");
    const navigation = document.querySelector(".navigation");

    const menuLinks = document.querySelectorAll(".menu a");

    burger.addEventListener("click", function () {
        navigation.classList.toggle("active");
    });

    // Fermer le menu lorsqu'on clique sur un lien
    menuLinks.forEach(link => {
      link.addEventListener("click", function () {
        navigation.classList.remove("active");
      });
    });
});
