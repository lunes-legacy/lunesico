//AOS.init();
var toggleMenu = function(){
    $("#navbar").toggle('fast');
}

$("#navbar").click(function(){
    toggleMenu();
});

function showTab(item){
    if(item=="qte"){
        $("#qte").show();
        $("#per").hide();

        $("#tab_qte").addClass("ativo");
        $("#tab_per").removeClass("ativo");
    }else{
        $("#qte").hide();
        $("#per").show();

        $("#tab_qte").removeClass("ativo");
        $("#tab_per").addClass("ativo");
    }
}

$("#navbar #cont a").click(function(){
    $("#navbar #cont").find(".ativo").removeClass("ativo");
    $(this).addClass("ativo");
});


$("#navbar #cont a").on('click', function(event) {

    var target = this.hash;
    var link = $(this).attr('href');
    var initvar = link.substring(0,1);

    if(initvar=="#"){
        event.preventDefault();

        var navOffset = 130;

        return $('html, body').animate({
            scrollTop: $(this.hash).offset().top - navOffset
        }, 500, function() {
            return window.history.pushState(null, null, target);
        });
    }
});

function formatDisplayNumber(n, currency) {
    return currency + " " + n.toFixed(0).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
    });
}

//navbar shadow on scroll
var nav = $('.header'); // Change to nav div
    var nav_class = 'header-shadow'; // Change to class name
    var threshold = 100; // Change to pixels scrolled

    $(window).scroll(function () {
        var distance = $(this).scrollTop();
        if (distance > threshold) { // If scrolled past threshold
            nav.addClass(nav_class); // Add class to nav
            // to show bt up screen
            $("#up_screen").show();
        } else { // If user scrolls back to top
            if (nav.hasClass(nav_class)) { // And if class has been added
                nav.removeClass(nav_class); // Remove it
            }
            // to hiden bt up screen
            $("#up_screen").hide();
        }
    });

$("#language-button").click(function(){
    const languageMenu = $('#language-menu');
    languageMenu.addClass('language-menu-down-animation'); // Add class to nav
});

let endDate = '';

function updateSaldo() {
    $.ajax({
        url: 'https://apiw.lunes.io/api/ico/phase',
        type: 'POST',
        success: function(result) {
            const found_sale = $.grep(result, v => v.sale_status === "active");

            // Soma os valores totais de tokens vendidos nas fases
            const coin_sale = result.reduce((total, item) => {
                const coin_total_value = item.total_value || 0;
                return total + parseFloat(coin_total_value);
            }, 0);

            endDate = found_sale[0].end_datetime;

            // Total de tokens disponíveis para venda
            const total_avaliable = 450000000;

            const total_fiat_value = Math.floor(parseFloat(found_sale[0].total_fiat_value));
            // const current_raised_value = parseFloat(found_sale[0].total_credit_value) * parseFloat(found_sale[0].price_value);

            $("#coin_sale").html(formatDisplayNumber(coin_sale, ''));
            $("#coin_counter").html(formatDisplayNumber(total_avaliable, ''));
            // $("#raisedValue").html('$ ' + formatDisplayNumber(Math.floor(current_raised_value), ""));
            $("#totalValue").html('$ ' + formatDisplayNumber(Math.floor(total_fiat_value), ''));
            document.getElementById("loading_bar_green").style.width = `${percBarra(total_avaliable, coin_sale)}%`;

            $('#active_phase').html(found_sale[0].name);

            const total_phase_sale = parseFloat(found_sale[0].total_value) * parseFloat(found_sale[0].price_value);
            $('#total_phase_sale').html('$ '+ formatDisplayNumber(parseInt(total_phase_sale), ''));

            // Chama a função que inicia o contador
            getDateTime(endDate);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#coin_counter").html('0');
            document.getElementById("loading_bar_green").style.width = "0%";
        }
    });

    $("#coin_sale").html(formatDisplayNumber(0, ""));
    $("#coin_counter").html(0);
    $("#raisedValue").html('$ ' + formatDisplayNumber(0, ""));
    $("#totalValue").html('$ ' + formatDisplayNumber(0, ""));
    document.getElementById("loading_bar_green").style.width = "0%";
    $('#active_phase').html('<br>');
    $('#global_limit_phase').html('<br>');
    // $("#coin_counter").html('100.000.000');
}

function diff_hours(dt2, dt1) {
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
}

function percBarra(total, atual) {
    const diff = Math.round(atual) / Math.round(total);
    return Math.abs(diff) * 100;
}

// Valores iniciais do contador
//document.querySelector('#con_days').innerHTML = 0;
//document.querySelector('#con_hours').innerHTML = 0;
//document.querySelector('#con_min').innerHTML = 0;
//document.querySelector('#con_sec').innerHTML = 0;

$("#put_s_day_en").html('Days');
$("#put_s_day_pt").html('Dias');
$("#put_s_day_fr").html('Jours');
$("#put_s_day_ar").html('أيام');
$("#put_s_day_hi").html('दिन');
$("#put_s_day_es").html('Días');

$("#put_s_hour_en").html('Hours');
$("#put_s_hour_pt").html('Horas');
$("#put_s_hour_fr").html('Heures');
$("#put_s_hour_ar").html('ساعات');
$("#put_s_hour_hi").html('घंटे');
$("#put_s_hour_es").html('Horas');

$("#put_s_min_en").html('Minutes');
$("#put_s_min_pt").html('Minutos');
$("#put_s_min_fr").html('Minutes');
$("#put_s_min_ar").html('دقائق');
$("#put_s_min_hi").html('मिनट');
$("#put_s_min_es").html('Minutos');

$("#put_s_sec_en").html('Seconds');
$("#put_s_sec_pt").html('Segundos');
$("#put_s_sec_fr").html('Seconds');
$("#put_s_sec_ar").html('ثواني');
$("#put_s_sec_hi").html('सेकंड');
$("#put_s_sec_es").html('Segundos');

// Contador
function getDateTime(endDate) {
    const event = new Date(endDate).getTime();
    let current = new Date();
    current = current.getTime();

    // Caso dê problema no contador no último dia, utilizar o código abaixo
    // current = current.getTime() - (current.getTimezoneOffset() * 60000);

    let duration = moment.duration(event - current, 'milliseconds');

    // document.querySelector('#con_days').innerHTML = duration.months();

    setInterval(function() {
        duration = moment.duration(duration - 1000, 'milliseconds');

        //document.querySelector('#con_days').innerHTML = Math.floor(duration.asDays());
        //document.querySelector('#con_hours').innerHTML = duration.hours();
        //document.querySelector('#con_min').innerHTML = duration.minutes();
        //document.querySelector('#con_sec').innerHTML = duration.seconds();

        if (duration.days() < 1) {
            $("#put_s_day_en").html('Day');
            $("#put_s_day_pt").html('Dia');
        }

        if (duration.hours() < 1) {
            $("#put_s_hour_en").html('Hour');
            $("#put_s_hour_pt").html('Hora');
        }

        if (duration.minutes() < 1) {
            $("#put_s_min_en").html('Minute');
            $("#put_s_min_pt").html('Minuto');
        }
    }, 1000);
}

// setInterval(updateSaldo, 60000);

/* slide time */
$(document).ready(function() {
    //navbar shadow on scroll
    var nav = $('#header'); // Change to nav div
    var nav_class = 'lunes-nav-shadow'; // Change to class name
    var threshold = 100; // Change to pixels scrolled

    $(window).scroll(function () {
        var distance = $(this).scrollTop();
        if (distance > threshold) { // If scrolled past threshold
            nav.addClass(nav_class); // Add class to nav
        } else { // If user scrolls back to top
            if (nav.hasClass(nav_class)) { // And if class has been added
                nav.removeClass(nav_class); // Remove it
            }
        }
    });

    $("#slide_time").lightSlider({
        gallery:true,
        item:1,
        loop:true,
        thumbItem:9,
        slideMargin:0,
        enableDrag: true,
        currentPagerPosition:'left',
        onSliderLoad: function(el) {
            el.lightGallery({
                selector: '#slide_time .lslide'
            });
       gulp }
    });

    $("#slide_advisor").lightSlider({
        gallery:true,
        item:1,
        loop:true,
        thumbItem:9,
        slideMargin:0,
        enableDrag: true,
        currentPagerPosition:'left',
        onSliderLoad: function(el) {
            el.lightGallery({
                selector: '#slide_advisor .lslide'
            });
        }
    });

    // button scroll up
    $("#up_screen").click(function(){
        $('html, body').animate({
            scrollTop: 0
        }, 500);

    });
    // Chama a função que faz o update o saldo e inicia o contador
    updateSaldo();
});

// splash ao tentar sair da pag
var close_splash1 = false;

function addEvent(obj, evt, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evt, fn, false);
    }
    else if (obj.attachEvent) {
        obj.attachEvent("on" + evt, fn);
    }
}
addEvent(window,"load",function(e) {
    addEvent(document, "mouseout", function(e) {
        e = e ? e : window.event;
        var from = e.relatedTarget || e.toElement;
        if (!from || from.nodeName == "HTML") {
            if (!close_splash1) {
                const userData = localStorage.getItem('lunes.accessToken')
                if (!userData){
                    $("#splash_exit").show();
                }
            }
        }
    });
});

// se ja abriu uma vez, nao abra novamente
function closeSplash1(){
    $('#splash_exit').hide();
    close_splash1 = true;
}


// splash ao ficar X tempo no site
setTimeout(function(){
    const userData = localStorage.getItem('lunes.accessToken')
    if (!userData){
        $('#splash_buy').show();
    }
}, 60000);


function closeSplash2(){
    $('#splash_buy').hide();
}
