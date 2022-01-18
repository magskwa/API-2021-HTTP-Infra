# Étape 4: Requête AJAX avec JQuery

## Description
Nous avons mis en place la communication entre notre serveur apache statique et notre serveur
express dynamique. Grâce aux requêtes AJAX, il nous est possible de faire en sorte qu'un script
soit exécuté depuis notre serveur statique. Ce dernier effectue une requête qui sera redirigée
comme il se doit par le reverse proxy. Nous avons donc mis en place une page statique qui se met
dynamiquement à jour toutes les x secondes (nous avons choisi 4 secondes, mais ce paramètre se trouve
dans le fichier /apache-php-image/src/js/animals.js). Pour cela nous avons simplement importer le module
de requêtes AJAX dans notre fichier index.html et ajouté un script (animals.js) que nous importons
également dans notre index. Une fois cela fait, nous avons pu modifier via ce sript une balise de notre choix,
dans notre cas une balise de classe *"Animal"*.

## Utilisation
Comme à chaque fois il faut commencer par construire les images des nos différents serveurs:
* Le serveur statique: ``docker build -t <nom_image_statique> .``
* Le serveur dynamique: ``docker build -t <nom_image_dynamique> .``
* Le serveur reverse proxy: ``docker build -t <nom_image_rp> .``

Une fois les images prêtes, il ne reste qu'à créer nos containers:
* statique: ``docker run --name <nom_container_statique> -d <nom_image_statique>``
* dynamique: ``docker run --name <nom_container_dynamique> -d <nom_image_dynamique>``
* reverse proxy: ``docker run --name <nom_container_rp> -d -p 8080:80 <nom_image_rp>``

À présent, il ne reste plus qu'à se connecter via un navigateur sur *demo.api.ch:8080* et le tour est
joué !

## Note
Les adresses IP sont toujours hardcodées dans le fichier de configuration, il faut donc faire attention
à ce que les IPs dans le fichier de configuration (/apache-reverse-proxy/conf/sites-available/001-reverse-proxy.conf)
soient correctes.