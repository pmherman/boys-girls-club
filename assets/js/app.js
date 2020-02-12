var ticketPrice;

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

//Change background color of navigation bar on scroll
$(window).scroll(function(){
    var scroll = $(window).scrollTop();
    if(scroll < 300){
        $('.fixed-top').css('background', 'transparent');
    } else{
        $('.fixed-top').css('background', 'rgba(0,0,0, 0.9)');
    }
});

$('.sponsorship-pricing').click(function(e) {
    e.preventDefault();
    $('.sponsorship-pricing').css({'background-color':'transparent','color':'#2e2f4f'});
    $('.sponsorship-pricing').removeClass('active');
    $(this).css({'background-color':'#f00','color':'#fff'});
    $(this).addClass('active');
    ticketPrice = $(this).data('value');
})

$('.sponsorship-pricing').click(function() {
    console.log(`Current Package Selected: ${ticketPrice}`);
})

})

paypal.Buttons({
    style: {
        size: 'responsive',
        shape: 'pill',
        color: 'gold',
        layout: 'horizontal',
        label: 'paypal',
        
    },
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: ticketPrice
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Transaction completed by ' + details.payer.name.given_name + '!');
        });
    }
}).render('#paypal-button-container');

