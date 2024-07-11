// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

// isotope js
$(window).on('load', function () {
    $('.filters_menu li').click(function () {
        $('.filters_menu li').removeClass('active');
        $(this).addClass('active');

        var data = $(this).attr('data-filter');
        $grid.isotope({
            filter: data
        })
    });

    var $grid = $(".grid").isotope({
        itemSelector: ".all",
        percentPosition: false,
        masonry: {
            columnWidth: ".all"
        }
    })
});

// nice select
$(document).ready(function () {
    $('select').niceSelect();
});

/** google_map js **/
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

// client section owl carousel
$(".client_owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    dots: false,
    nav: true,
    navText: [],
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1000: {
            items: 2
        }
    }
});

function toggleAlertmsg(status, msg) {
    const alertmsg = document.getElementById("alertmsg");
    document.getElementById("status").textContent = status;
    document.getElementById("statusmsg").textContent = msg;
    if (status === "Failed") {
        alertmsg.style.backgroundColor = "#FF0A00";
    } else if (status === "Success") {
        alertmsg.style.backgroundColor = "#00AF3A";
    } else {
        alertmsg.style.backgroundColor = "#F97A00";
    }
    if (alertmsg.style.display === "block") {
        alertmsg.style.display = "none";
    } else {
        alertmsg.style.display = "block";
        setTimeout(function () {
            toggleAlertmsg();
        }, 5000);

    }
}
function unvisble_Login() {
    document.getElementById('ade').style.display = 'none';
  }
  function visible_login() {
    document.getElementById('ade').style.display = 'block';
    unvisibleECart();
  }