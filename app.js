var films = [
    {    name: "Deadpool",    years: 2016,    authors : "Tim Miller" },
    {    name: "Spiderman",    years: 2002,    authors : "Sam Raimi" },
    {    name: "Scream",    years: 1996,    authors : "Wes Craven" },
    {    name: "It: chapter 1",    years: 2019,    authors : "Andy Muschietti" }
];

// TODO

            //AFFICHER LES FILMS DANS UN TABLEAU
function afficheLesFilms(films){

    let tbody = document.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "" ;
    let donneesFilm = "" ;


    films.forEach((evenement, index) => {
        donneesFilm += `<tr>
        <td>${evenement.name}</td>
        <td>${evenement.years}</td>
        <td>${evenement.authors}</td>
        <td> <button class="supprime" value="${index}">Supprimer</button></td>`;
        
});
tbody.innerHTML += donneesFilm;

document.querySelectorAll(".supprime").forEach(b => {
    b.addEventListener("click", function() {
      return supprimeFilm(this.value);
    });
  });
};
afficheLesFilms(films);

                    //AJOUTER BOUTTON POUR AFFICHER LE FORM

var btnAdd = document.getElementById('ajouter');
var form = document.getElementById('ajouter_barre');
var btnCancelAction = document.getElementById('annulerFilm');
document.getElementById('ajouter_barre').style.visibility = 'hidden';

btnAdd.addEventListener('click', function(){
    form.style.visibility = "visible";
    btnAdd.style.visibility ="hidden";

} );

btnCancelAction.addEventListener('click', function(){
    form.style.visibility ="hidden";
    btnAdd.style.visibility = "visible";
});

                    //VERIFIER LES DONNES DU FORM

var nouveauFilm = document.getElementById('ajouterFilm');
let divSucces = document.querySelector('#divSucces');
divSucces.style.display = "none";
let divEchec = document.querySelector('#divEchec');
divEchec.style.display = "none";

function mettreEnMajuscule(a){return(a+'').charAt(0).toUpperCase()+a.substring(1).toLowerCase();}

ajouterFilm.addEventListener('click', (e) => {
    e.preventDefault();
    let ValeurTitre = titre.value;
    let ValeurAnnee = annee.value;
    let ValeurRealisateur = realisateur.value;
    let tabMessage = [
        {
            message: "Erreur dans le formulaire :",
            error: false,
        },
        {
            message: "<br>-Le nom du film doit contenir plus de deux caractères",
            error: false,
        },
        {
            message: " <br>-Cette date n'est pas valide (doit être supéreur à 1900)",
            error: false,
        },
        {
            message: " <br>-Vous devez saisir une année au format 'aaaa'",
            error: false,
        },
        {
            message: " <br>-Le nom du réalisateur doit contenir au moins 5 lettres",
            error: false,
        },
        
    ];

    if (titre.textLength < 2) { // LE TITRE DOIT CONTENIR PLUS DE DEUX CARACTERES
        e.preventDefault();
        tabMessage[0].error = true
        tabMessage[1].error = true     
    } else {
        tabMessage[0].error = false
        tabMessage[1].error = false    
    }
        
    if(annee.value < 1900){ // LA DATE DOIT ETRES SUPERIEUR OU EGALE A 1900  ET NON SUPERIEUR A L'ANNEE EN COURS
        e.preventDefault();
        tabMessage[0].error = true;
        tabMessage[2].error = true ;      
        
    } else {
        tabMessage[0].error = false
        tabMessage[2].error = false    
    } 
        
    if(annee.textLength < 4){ // LA DATE DOIT CONTENIR PLUS DE QUATRE CHIFFRES
        e.preventDefault();
        tabMessage[0].error = true
        tabMessage[3].error = true    
        
    } else {
        tabMessage[0].error = false
        tabMessage[3].error = false   
    }
        
    if(realisateur.textLength < 5){ // LE NOM DU REALISATEUR DOIT CONTENIR AU MOINQ CINQ LETTRES
        e.preventDefault();
        tabMessage[0].error = true
        tabMessage[4].error = true     
    } else {
        tabMessage[0].error = false
        tabMessage[4].error = false   
    }

    if (tabMessage.find(el => el.error)) { // CHERCHER SI IL Y A UNE ERREUR
        let error = tabMessage.filter(el => el.error) // GARDER UNIQUEMEMENT LES ELEMENTS AVEC ERREUR
        let stringError = ''
        // CREET UNE STRING AVEC TT LES EREURS
        error.map(el => {
            stringError = stringError + el.message + '\n'
        })
        divEchec.style.display = "block";
        divEchec.innerHTML = stringError;
        setTimeout(() => {divEchec.style.display ="none";}, 3000);
    }
    if (titre && annee && realisateur && !tabMessage.filter(el => el.error).length){ // VERIFIER QU"IL N"Y A PLUS D"ERREUR DANS LE TABLEAU
        afficheElement();
        const film = {name : mettreEnMajuscule(ValeurTitre), years : ValeurAnnee, authors : mettreEnMajuscule(ValeurRealisateur) };
        films.push(film);
        return afficheLesFilms(films);
    }

    function afficheElement(){
        
        titre.value = "" ;
        annee.value = "";
        realisateur.value = "";
        divSucces.style.display = "block";
        setTimeout(() => {divSucces.style.display ="none";}, 3000);
        
    
    }
});

                    // FILTRE TITRE

function sortOn(films,prop){
    films.sort(
        function (a,b){
            if (a[prop]< b[prop]){
                return 1;
            } else {
                return 0;
            }
        }
    )
    };

var filtreTitre = document.getElementById('titre_filtre');

filtreTitre.addEventListener('click', function (){
        sortOn(films, "name");
        console.log(films);
        films.reverse();
        return afficheLesFilms(films);
},
    
)

                    //FILTRE ANNEE

var filtreAnnee = document.getElementById('annee_filtre');

filtreAnnee.addEventListener('click', function (){
        sortOn(films, "years");
        console.log(films);
        films.reverse();
        return afficheLesFilms(films);
}

);

                // CREER UNE FONCTION POUR SUPPRIMER LES FILMS AVEC CONFIRMATION


function supprimeFilm(index) {
    if (confirm("Confirmez-vous la suppression de ce film ?")) {
      films.splice(index,1);
      afficheLesFilms(films);}
  }

    

