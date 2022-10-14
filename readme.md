# Installer le projet

1- installer sass sur sa machine
npm i -g sass

2- lancer sass
npm run sass

# Cahier des charges

Le site doit permettre à une personne de lancer une nouvelle partie du jeu mémory, un compteur de point indiquera le nombre de fois où le joueur s'est trompé.
Lorsqu'une partie est démarrée, 10 cartes face verso s'affichent.

Lorsque l'utilisateur clique sur une carte elle est retournée face recto, puis lorsqu'il clique sur une seconde carte : si la valeur de la 2nd est la même que la première, alors les 2 cartes restent face visible (elle ne sont plus cliquable).

Si l'utilisateur se trompe le compteur de point est incrémenté de 1.

Lorsque l'utilisateur a révélé toutes les cartes, la partie est terminée, un modale s'affiche avec un message et le score du joueur.

Le style est libre, au moins une animation est requise (à l'endroit de votre choix)
Les bonnes pratiques de sass et de html doivent être respectées.
