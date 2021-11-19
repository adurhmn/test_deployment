$('.nav-home').on('click', function (event) {
    goToSection ('home', event)
} );
$('.nav-destination').on('click', function (event) {
    goToSection ('destination', event)
} );
$('.nav-crew').on('click', function (event) {
    goToSection ('crew', event)
} );
$('.nav-technology').on('click', function (event) {
    goToSection ('technology', event)
} );

function goToSection (section, event) {

    $(`.nav__item--primary.nav-home`).removeClass(`u-border-bottom-white`);
    $(`.nav__item--primary.nav-destination`).removeClass( `u-border-bottom-white`);
    $(`.nav__item--primary.nav-crew`).removeClass(`u-border-bottom-white`);
    $(`.nav__item--primary.nav-technology`).removeClass(`u-border-bottom-white`);
    $(`.nav__item--primary.nav-${section}`).addClass( `u-border-bottom-white`);

    $(`.nav__item--mobile.nav-home`).removeClass(`u-border-left-white`);
    $(`.nav__item--mobile.nav-destination`).removeClass( `u-border-left-white`);
    $(`.nav__item--mobile.nav-crew`).removeClass(`u-border-left-white`);
    $(`.nav__item--mobile.nav-technology`).removeClass(`u-border-left-white`);
    $(`.nav__item--mobile.nav-${section}`).addClass( `u-border-left-white`);

    $('body').css('background-image', `url('assets/${section}/background-${section}-desktop.jpg')`)

    $('.home').addClass('u-hidden');
    $('.destination').addClass('u-hidden');
    $('.crew').addClass('u-hidden');
    $('.technology').addClass('u-hidden');
    $(`.${section}`).removeClass('u-hidden');
}

$('.nav-moon').on('click', function () {
    goToDestination('moon')
});
$('.nav-mars').on('click', function () {
    goToDestination('mars')
});
$('.nav-europa').on('click', function () {
    goToDestination('europa')
});
$('.nav-titan').on('click', function () {
    goToDestination('titan')
});


function goToDestination (destination) {
    console.log(destination)
    $(`.nav-moon`).removeClass('u-border-bottom-white');
    $(`.nav-mars`).removeClass('u-border-bottom-white');
    $(`.nav-europa`).removeClass('u-border-bottom-white');
    $(`.nav-titan`).removeClass('u-border-bottom-white');
    $(`.nav-${destination}`).addClass('u-border-bottom-white');

    $('.destination__img').attr('src', `assets/destination/image-${destination}.png`);

    $('.destination__sub-title').text(data['destinations'][destination]['name'])
    $('.destination__body').text(data['destinations'][destination]['description'])
    $('.tvl-distance').text(data['destinations'][destination]['distance'])
    $('.tvl-duration').text(data['destinations'][destination]['travel'])
}

$('.dropdown-icon').on('click', function () {
    $('.nav--mobile').addClass('clicked');
})

$('.nav--mobile__btn-close').on('click', function () {
    $('.nav--mobile').removeClass('clicked');
})