$(document).ready(function() {
    $('.ml-auto').click(function(e) {
        e.preventDefault();
        if ($("#navbarNav").hasClass("show")) {
            $('.fa-bars').css('-webkit-transform', 'rotate(0deg)')
        } else {
            $('.fa-bars').css('-webkit-transform', 'rotate(90deg)')
        }        
    })

//Countdown Timer
var countDownDate = new Date("March 28, 2020 00:00:00").getTime();
var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    $('#days').html(`${days}`)
    $('#hours').html(`${hours}`)
    $('#minutes').html(`${minutes}`)
    $('#seconds').html(`${seconds}`)
    
    // document.getElementById("countdown-timer").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown-timer").innerHTML = "EXPIRED";
      }
}, 1000)

})
