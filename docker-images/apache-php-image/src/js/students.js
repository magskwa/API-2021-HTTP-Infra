$(function() {
    function loadStudents() {
       $.getJSON("/api/students/", function( students ) {
           var message = students.animal + " " + students.profession;
           $(".skills").text(message);
        });
    }

    loadStudents();
    setInterval(loadStudents, 2000);

});