# Étapes supplémentaires

## Description
Dans les deux premières étapes supplémentaire, il nous a été demandé de gérer le load balancing sur
notre reverse proxy. Il va de soi que nous auront donc plusieurs containers statiques et dynamiques afin
que cette infrastructure aie du sens.

Pour ce faire, il nous a été proposé de travailler avec un image traefik, qui permet de mettre en place
une reverse proxy effectuant du load balancing et gérant des sessions *Round-robin* ou *Sticky*.

Finalement, docker-compose fonctionne facilement avec traefik et nous permet de mettre en place le load-balancing
de manière simple.

Dans notre [*docker-compose.yml*](./docker-compose.yml), nous utilisons une image traefik à la place de celle utilisée
pour le proxy dans les parties précédentes. Il faut ensuite faire exécuter deux commandes:
1. ``--api.insecure=true`` qui active l'UI web
2. ``--providers.docker`` qui dit à Traefik d'écouter docker

Il faut ensuite maper les ports comme il se doit tout en sachant que Traefik offre un dashboard qui permet
de surveiller le traffic et le bon fonctionnement de l'infrastructure (activé grâce à la commande effectuée
plus haut). Nous avons choisi de mapper le port HTTP sur le port 8081.

Ensuite, il faut créer un volume, ce qui équivaut à mapper un dossier sur un autre, pour que Traefik
puisse être à l'écoute des évenements Docker. Notre image Traefik est prête !

Maintenant il s'agit de configurer nos serveurs statiques et dynamiques. Pour que ces dernier fonctionnent avec notre
nouveau reverse proxy, il faut ajouter les labels qui permettront à notre infrastructure de fonctionner:

Premièrement, nos containers **statiques**:
1. ``"traefik.enable=true"`` Active Traefik
2. ``"traefik.http.routers.<nom_service>.rule=Host(`<nom_hôte>`) && PathPrefix(`/<prefixes>`)"`` Définit les requêtes que
doit effectuer le proxy pour accéder à ce container. Ici la connection à nom_hôte:8081/prefixes/ donnera lieu à une
requête HTTP sur ce container. 
3. ``"traefik.http.routers.<nom_service>.service=<nom_service>"`` Définit notre container comme un routeur du service
Traefik
4. ``"traefik.http.services.<nom_service>.loadbalancer.sticky=true"`` Active les sticky sessions
5. ``"traefik.http.services.<nom_service>.loadbalancer.sticky.cookie.name=session"`` Active le Round-robin

Puis, nos containers express **dynamiques**:
1. ``"traefik.enable=true"``
2. ``"traefik.http.routers.<nom_service>.rule=Host(`<nom_hôte>`) && PathPrefix(`/<prefixes>`)"``
3. ``"traefik.http.services.<nom_service>.loadbalancer.server.port=3000"`` Permet d'indiquer à Traefik que ce container
communique sur le port 3000 lorsqu'il fait du load balancing.
4. ``"traefik.http.routers.<nom_service>.middlewares=<nom_service>-stripprefix"``
5. ``"traefik.http.middlewares.express_dynamic-stripprefix.stripprefix.prefixes=/api/animals/"``

Finalement, il faut indiquer dans le fichier de composition que nous souhaitons lancer plusieurs containers de ces deux
types. Il suffit d'ajouter la ligne dans nos services:

```
deploy:
    replicas: <n_containers>
```

## Utilisation
En réalité les seules modification que nous avons effectuées sont dans notre fichier [*docker-compose.yml*](./docker-compose.yml).
À la place de construire notre image *apache-reverse-proxy*, nous avons importé une image traefik puis effectué
le paramétrage adéquat dans notre fichier [*docker-compose.yml*](./docker-compose.yml).
Pour tester le fonctionnement de notre projet, il ne reste plus qu' exécuter la commande suivante à la racine du projet:
``docker-compose up`` ou ``docker-compose up --build`` après modification de certaines fichiers.

Nous pouvons ensuite nous connecter sur *demo.api.ch:8081* et nous aurons le même résultat qu'à l'étape 5. En nous
connectant sur *demo.api.ch:8080* nous auront accès au tableau de bord de Traefik pour pouvoir surveiller que tout
fonctionne correctement.