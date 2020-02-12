$(document).ready(function() {
    $('.ml-auto').click(function(e) {
        e.preventDefault();
        if ($("#navbarNav").hasClass("show")) {
            $('.fa-bars').css('-webkit-transform', 'rotate(0deg)')
        } else {
            $('.fa-bars').css('-webkit-transform', 'rotate(90deg)')
        }        
    })
}) 