# Étape 2 : HTTP Dynamique avec express.js
## Description
Dans cette étape, nous avons implémenté un serveur HTTP permettant de générer du contenu
dynamique à l'aide des modules node.js. Nous avons utilisé express.js afin de créer une
application qui écoute les requêtes faites sur le port **3000**. L'application renvoie
ensuite un JSON contenant un nom, prénom, métier et animal.

## Utilisation
Afin de mettre en exécution notre serveur express, il suffit de suivre les étapes suivantes:
1. Construire l'image à partir du Dockerfile à l'aide de la commande:
``docker build -t <nom_image> .``
2. Lancer un container à partir de l'image en prenant soin de mapper les ports adéquats pour pouvoir
accéder au container depuis l'extérieur:
``docker run --name <nom_container> -d -p 8080:3000 <nom_image>``
3. Depuis un navigateur, entrer l'URL *localhost:8080*. En rechargeant la page, le contenu
du JSON devrait avoir changé.

## Note
Dans cet étape, les modules ont été installés en local et sont copié dans le container. Il est
toutefois possible et préférable d'ajouter dans le Dockerfile la commande permettant l'installation
de ces modules afin que ce derniers soient installés lors de la création de l'image.