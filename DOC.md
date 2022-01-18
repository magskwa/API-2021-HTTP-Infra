# Étape 5: Configuration dynamique du reverse proxy

## Description
Dans cette étape, nous souhaitons mettre en place notre serveur proxy sans avoir à reconstruire
l'image de ce dernier dès que nos containers statique et dynamique se voient attribuer une autre
IP.

Nous avons choisi de mettre en place ces IPs dynamiques à l'aide d'un fichier docker-compose.yml se trouvant
à la racine du projet. Grâce à ce dernier une simple commande permet de construire nos images, leur donner un nom
et lancer les containers correspondant.

En réalité ce docker compose nous permet de donner des hostnames à nos containers statique et dynamique
et nous n'avons eu qu'a remplacer les IPs en dur dans notre fichier de configuration (001-reverse-proxy.conf)
par ces noms d'hôtes. Notre configuration marche donc quelles que soient les IPs attribuées à nos
containers.

## Utilisation
Comme cité précédemment, il suffit de se trouver à la racine du projet et d'exécuter la commande:
``docker-compose up`` ou ``docker-compose up --build`` si vous souhaiter reconstruire les images après
modification de certains fichiers.
Les containers se lanceront tous et apparaîtrons comme faisant partie d'un même groupe.

Nous n'avons plus qu'à nous connecter à *demo.api.ch:8080* et voir que tout fonctionne bien !