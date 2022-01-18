# Étape 1: Serveur HTTP statique avec apache httpd

## Description
Pour démarrer ce laboratoire, nous avons créé un Dockerfile permettant de construire un serveur apache httpd afin de servir du contenu html se trouvant initialement sur notre machine.
Via le [Dockerfile](./docker-images/apache-php-image/Dockerfile) nous copions le contenu d'un dossier src dans le container à l'emplacement /var/www/html/.

## Utilisation
Afin de vérifier le bon fonctionnement de notre serveur statique, il faut commencer par construire l'image:
``docker build -t <nom_image> .``

Puis démarrer un container à partir de cette image en mapant les ports souhaités:
``docker run -d -p <port>:80 <nom_image>`` **Note**: chez nous il s'agit du port 8080

À présent nous pouvons nous connecter sur *localhost:port* et le serveur nous renverra le contenu de son dossier /var/www/html/.
