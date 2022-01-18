# Étape 3: Reverse proxy apache (Configuration statique)

## Description
Lors de cette étape nous avons mis en place un serveur apache tenant le rôle de
reverse proxy dans notre infrastructure. Nous souhaitons avoir un container permettant
de retourner du contenu statique, un autre du contenu dynamique et finalement, un container
pour gérer l'accès depuis l'extérieur à ces deux container.

## Utilisation
Il faut d'abord construire les images des nos trois containers:
* Le serveur statique: ``docker build -t <nom_image_statique> .``
* Le serveur dynamique: ``docker build -t <nom_image_dynamique> .``
* Le serveur reverse proxy: ``docker build -t <nom_image_rp> .``

Une fois les images prête il faut lancer les containers:
* statique: ``docker run --name <nom_container_statique> -d <nom_image_statique>``
* dynamique: ``docker run --name <nom_container_dynamique> -d <nom_image_dynamique>``
* reverse proxy: ``docker run --name <nom_container_rp> -d -p 8080:80 <nom_image_rp>``

Afin de pouvoir accéder depuis l'extérieur à notre reverse proxy, il faut définir un nom d'hôte
pour ne pas se retrouver face à des problèmes de permission d'accès. Il faudra donc ajouter une
entrée DNS afin de pouvoir accéder à notre reverse proxy. Nous avons choisi le nom d'hôte: "demo.api.ch".

Une fois les containers lancés, il suffit de se connecter sur demo.api.ch:8080 ou sur demo.api.ch:8080/api/animals/
pour accéder respectivement à notre contenu statique et dynamique.

## Note
L'implémentation à cette étape est statique et nécessite donc le démarrage des deux serveurs statique
et dynamique afin de connaître l'IP qui leur a été attribué. Il faut donc construire l'image du reverse
proxy en prenant soin de modifier comme il se doit les IP dans le fichier */conf/001-reverse-proxy.conf*
si les containers se voient attribuer d'autres adresses.
