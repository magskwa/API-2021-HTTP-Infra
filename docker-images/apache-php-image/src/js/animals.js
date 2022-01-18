$(function() {
    function loadAnimals() {
        $.getJSON("/api/animals/", function( animal ) {
            var message = animal.firstName + " " + animal.lastName
                + " the " + " " + animal.profession + " " + animal.animal;
            $(".Animal").text(message);
        });
    };

    loadAnimals();
    setInterval(loadAnimals, 4000);

});