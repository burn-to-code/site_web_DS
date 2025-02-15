# site_web_DS
My portfolio and my cv in one website 

salut les gars si vous venez la c'est que vous êtes curieux, vous pouvez juste copier/coller le code si vous voulez.

sinon je vous indique comment faire pour cloner le dossier sur branch sur git pour que puissez push, avec autorisation de ma part mdrr si vos modifications ma plaisent ou que vous voulez me les montrez : 

Vous avez crée un compte github, telecharger git bash, une fois que vous etes dessus accepter l'invitation sur github pour accéder a mon repertoire. 

1) aller sur git bash et rentrer cette commande : 
    git clone https://github.com/burn-to-code/site_web_DS.git

2) ensuite taper celle ci:
    cd site_web_DS (si ca marche pas et que vous etes pas dans le bon dossier taper : cd "le nom complet du chemin vers le dossier site_web_DS")

3) ensuite taper:
    git checkout -b le-nom-de-ta-branch (le nom de la branch c'est le nom de la version sur laquelle tu taff)

4) une fois que vous avez fait une modification sur ou plusieurs fichiers, retournez sur git bash : 
    taper : git add . pour ajouter tout les fichiers mofifié au depot local 
    taper git add index.html pour ajouter seulement le fichier html index (par exemple si vous avez modifié que celui la)

5) taper : git commit -m "le titre de vos modifications" pour l'ajouter au depot distant de la branch 

6) une fois que tu est sur d'avoir fini toutes tes modifications (ne tape que la commande indiquez ci dessous c'est important ) : 
    taper : git push origin le-nom-de-ta-branch pour pousser la noouvelle branch sur github.

7) la deja on peut tous voir ta nouvelle branche direct sur github, mais la tu vas devoir crée une pull request sur ta nouvelle branch sur github, ca permet a ce que je vois ce que vous avez fait avant de fusionner la branch principal et main. pour faire ca vas voir sur internet c'est pas du code.

8) et voila et si t'as des galères internet et chat gpt hein PAR CONTRE IL FAUT JAMAIS TRAVAILLER SUR LA BRANCH MAIN DIRECTEMENT NI FAIRE DE ADD OU COMMIT DESSUS ET LA COMMANDE A NE JAMAIS FAIRE C'EST GIT PUSH ORIGIN MAIN SUR LA BRANCH MAIN