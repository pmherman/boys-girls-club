var ticketPrice;

//Display Notice of Date Change on Page Load
$(document).ready(function() {
    displayAlert();
})


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
var countDownDate = new Date("March 21, 2020, 00:00:00").getTime();
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
    
    if (distance < 0) {
        document.getElementById('countdown').style.display = 'none';
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
    console.log(`Ticket Value: ${ticketPrice}`)
})

$(document).click(function(e) {
    if($(e.target).is('.ticket-pricing, .ticket-pricing h3, .ticket-pricing h5, .sponsorship-pricing, .sponsorship-pricing h3, .sponsorship-pricing ul, .sponsorship-pricing li') === false) {
        $('.ticket-pricing, .sponsorship-pricing').removeClass('active');
        $('.ticket-pricing').css({'background-color':'transparent','color':'white'});
        $('.sponsorship-pricing').css({'background-color':'transparent','color':'#2e2f4f'});
        ticketPrice = null;
        console.log(`Ticket Value: ${ticketPrice}`)
    }
})

var $videoSrc;

$('.video-btn').click(function() {
    $videoSrc = $(this).data('src');
    console.log($videoSrc);
});

$('#video-modal').on('show.bs.modal', function(e) {
    $("#video").attr('src',$videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0" ); 
})

$('#video-modal .modal-body').click(function() {
    $('#video-modal').modal('toggle');
})

$('.img-wrap').click(function () {
    
});

$('#video-modal .close, .modal').click(function(){
    $('#video').attr('src', '');
})

})

displayModal = (sponsor, name, description) => {
    $sponsorLevel = $(sponsor).data('sponsor');
    $('#bio-modal .modal-header').html(`<h5 class="modal-title">${name}</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>`)
    $('#bio-modal .modal-body').html(`<div class='row'><div class='col-lg-12'>${description}</div></div>`)
    if ($sponsorLevel === 'none') {
        $('#bio-modal .modal-content').removeClass('gold silver bronze');
    } else {
        $('#bio-modal .modal-content').addClass($sponsorLevel);
    }
}

displayAlert = () => {
    $('#bio-modal').modal('show');
    $('#bio-modal .modal-content').addClass('notice');
    $('#bio-modal').on('hidden.bs.modal', function(e) {
        $('#bio-modal .modal-content').removeClass('notice');
    });
    $('#bio-modal .modal-header').html(`<h5 class="modal-title">Notice:</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>`)
    $('#bio-modal .modal-body').html(`Due to the seriousness of the COVID-19 we will be postponing the Boys & Girls Art Gala until such time that it is safe to resume the event. <br><br> We are still accepting donations and you can still purchase tickets to the event<br><br>More information to come.<br><br>New Date of the event is To Be Determined at this time<br><br>For more information please feel free to email us <a href='mailto:info@oviedomarketinggroup.com'>here</a>`);

}

$('#subscribeNowButton').click(function(){
    if ($('#nameInput').val() !== '' && $('#emailInput').val() !== '' && $('#sponsorshipInput').val() !== '' && $('#commentsInput').val() !== '' ) {
        alert('Your message has sent successfully');
    } else {
        alert('Please complete form and try again!')
    }
    
});

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
                    value: $('#donateInput').val()
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Transaction completed by ' + details.payer.name.given_name + '!');
        });
    }
}).render('#paypal-button-container3');
