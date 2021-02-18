# TpRechercheFlickr - Avec Angular, Node.js, MongoDb.
Voici notre projet concernant l'exercice : SearchPhotos avec MongoDb et Node.js. 

Nous sommes partits du projet précedent : SearchPhotos avec Angular. Pour avoir un front correct et avoir toutes les fonctions concernant l'API flickr Service.*
Pour ensuite ajouter un serveur Node.js utilisant Express et Mongoose rattaché à un service MongoDb qui gère en BDD tout les mots clés recherchés (en enregistrant bien les liens d'images).

## Lancement d'application
-Lancer un mongod pour lancer MongoDb.
-Lancer un `ng serve --open` depuis le dossier angular pour lancer Angular et le front.
-Lancer un `nodemon index.js` depuis le dossier `src` du dossier Angular.

Ici, notre Angular est bien lancé, notre Node.Js aussi ainsi que MongoDb. 

Pour voir la bdd se remplir après la recherche d'un mot clé sur Angular --> Ouvrir éditeur mongo --> `use bddTp` --> `db.Images.find()` --> listeDonnees s'affiche.

## Axe d'amélioration
-Ici, les mots clés dèjà recherché une fois se mettent quand même dans le BDD, il manque le système permettant de dire si un mot clé est dèjà présent  dans la base ou non. On a essayé un bon moment de régler le problème avec rxjs, tout les essais sont en commentaires dans le fichier "flickr.service.ts" en bas de page. 
Finir ce système serai donc un bon axe d'amélioration, sinon tout le reste est fonctionnel.

## Participants 
GROUPE 2 BACHELOR 3 DEVOPS EPSI : 

-BAZATS TOM
-LESTON JORDAN
-MADEZO OSCAR
-BENETIER PAUL
