$(function() {
    function loadAnimals() {
       $.getJSON("/api/animals/", function( animals ) {
           var message = "Nobody is here";
           if (animals.length > 0) {
               message = animals[0].firstName + " " + animals[0].lastName
                   + " the " + " " + animals[0].profession + " " + animals[0].animal;
           }
           $(".Animal").text(message);
        });
    };

    loadAnimals();
    setInterval(loadAnimals, 4000);

});