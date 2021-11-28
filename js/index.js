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

    $('body').removeClass('bg-home bg-destination bg-crew bg-technology');
    $('body').addClass(`bg-${section}`);
    

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
    $('.tvl-distance-data').text(data['destinations'][destination]['distance'])
    $('.tvl-duration-data').text(data['destinations'][destination]['travel'])
}

$('.dropdown-icon').on('click', function () {
    $('.nav--mobile').addClass('clicked');
})

$('.nav--mobile__btn-close').on('click', function () {
    $('.nav--mobile').removeClass('clicked');
})



$('.nav-commander').on('click', function () {
    goToCrew('commander')
})
$('.nav-engineer').on('click', function () {
    goToCrew('engineer')
})
$('.nav-pilot').on('click', function () {
    goToCrew('pilot')
})
$('.nav-specialist').on('click', function () {
    goToCrew('specialist')
})

function goToCrew(crew) {
    console.log(crew)
    $(`.nav-commander`).removeClass('u-bg-col-white');
    $(`.nav-engineer`).removeClass('u-bg-col-white');
    $(`.nav-pilot`).removeClass('u-bg-col-white');
    $(`.nav-specialist`).removeClass('u-bg-col-white');
    $(`.nav-${crew}`).addClass('u-bg-col-white');

    
    $('.crew__sub-title--sub').text(data['crew'][crew]['role'])
    $('.crew__sub-title--main').text(data['crew'][crew]['name'])
    $('.crew__sub-text').text(data['crew'][crew]['bio'])
    $('.crew__img').attr('src', `assets/crew/image-${crew}.png`);

}

$('.nav-launch-vehicle').on('click', function () {
    goToTechnology('launch-vehicle');
})

$('.nav-spaceport').on('click', function () {
    goToTechnology('spaceport');
})

$('.nav-space-capsule').on('click', function () {
    goToTechnology('space-capsule');
})

function goToTechnology (technology) {
    $('.nav-launch-vehicle').removeClass('u-bg-col-white u-text-col-black')
    $('.nav-spaceport').removeClass('u-bg-col-white u-text-col-black')
    $('.nav-space-capsule').removeClass('u-bg-col-white u-text-col-black')
    $(`.nav-${technology}`).addClass('u-bg-col-white u-text-col-black')

    $('.technology__sub-title--main').text(data['technology'][technology]['name'])
    $('.technology__sub-text').text(data['technology'][technology]['description'])
    document.querySelector('.technology').style.setProperty("--img-portrait", `url('../assets/technology/image-${technology}-portrait.jpg')`)
    document.querySelector('.technology').style.setProperty("--img-landscape", `url('../assets/technology/image-${technology}-landscape.jpg')`)
} 