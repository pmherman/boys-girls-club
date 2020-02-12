var ticketPrice;

$(document).ready(function() {
    $('.ml-auto').click(function() {
        if ($("#navbarNav").hasClass("show")) {
            $('.fa-bars').css('-webkit-transform', 'rotate(0deg)');
            $('.navbar').removeClass('dark-background');
        } else {
            $('.fa-bars').css('-webkit-transform', 'rotate(90deg)');
            $('.navbar').addClass('dark-background');
        }        
    })
    $('.nav-link, #ticketButton').click(function() {
        $('.navbar-toggler').click(); 
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
    $('.ticket-pricing').css({'background-color':'transparent','color':'white'});
    $('.ticket-pricing').removeClass('active');
    $(this).css({'background-color':'#f00','color':'#fff'});
    $(this).addClass('active');
    ticketPrice = $(this).data('value');
    console.log(`Current Package Selected: ${ticketPrice}`);
})

$('.ticket-pricing').click(function(e) {
    e.preventDefault();
    $('.ticket-pricing').css({'background-color':'transparent','color':'white'});
    $('.ticket-pricing').removeClass('active');
    $('.sponsorship-pricing').css({'background-color':'transparent','color':'#2e2f4f'});
    $('.sponsorship-pricing').removeClass('active');
    $(this).css({'background-color':'#f00','color':'white'});
    $(this).addClass('active');
    ticketPrice = $(this).data('value');
    console.log(`Current Package Selected: ${ticketPrice}`);
})

})

paypal.Buttons({
    funding:
    {
        disallowed: [ paypal.FUNDING.CREDIT ]
    },
    style: {
        size: 'responsive',
        shape: 'pill',
        color: 'gold',
        layout: 'horizontal',
        label: 'paypal',
        tagline: 'false'
        
    },
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    name: 'Sponsor Ticket',
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
}).render('#paypal-button-container1');

paypal.Buttons({
    funding:
    {
        disallowed: [ paypal.FUNDING.CREDIT ]
    },
    style: {
        size: 'responsive',
        shape: 'pill',
        color: 'gold',
        layout: 'horizontal',
        label: 'paypal',
        tagline: 'false'
        
    },
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    name: 'Standard Ticket',
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
}).render('#paypal-button-container2');

