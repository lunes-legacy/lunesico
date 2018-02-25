
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
    // var target = this.hash;

    // event.preventDefault();

    // var navOffset = 130;

    // return $('html, body').animate({
    //     scrollTop: $(this.hash).offset().top - navOffset
    // }, 500, function() {
    //     return window.history.pushState(null, null, target);
    // });
});



/* time counter */
function getTime(){
    var dataInicio = new Date();
    var dataFim = new Date("02/25/2018");
    var diffMilissegundos = dataFim - dataInicio;

    var dif = new Date(diffMilissegundos);


    if (dif.getDate()>1)
    {
        $("#put_s_day_en").html('Days');
        $("#put_s_day_pt").html('Dias');
    }
    else
    {
         $("#put_s_day_en").html('Day');
         $("#put_s_day_pt").html('Dia');
    }

    if (dif.getHours()>1)
    {
        $("#put_s_hour_en").html('Hours');
        $("#put_s_hour_pt").html('Horas');
    }
    else
    {
         $("#put_s_hour_en").html('Hour');
         $("#put_s_hour_pt").html('Hora');
    }

    if (dif.getMinutes()>1)
    {
        $("#put_s_min_en").html('Minutes');
        $("#put_s_min_pt").html('Minutos');
    }
    else
    {
         $("#put_s_min_en").html('Minute');
         $("#put_s_min_pt").html('Minuto');
    }

    if (dif.getSeconds()>1)
    {
        $("#put_s_sec_en").html('Seconds');
        $("#put_s_sec_pt").html('Segundos');
    }
    else
    {
         $("#put_s_sec_en").html('Second');
         $("#put_s_sec_pt").html('Segundo');
    }


    $("#con_days").html(dif.getDate());
    $("#con_hours").html(dif.getHours());
    $("#con_min").html(dif.getMinutes());
    $("#con_sec").html(dif.getSeconds());

}
setInterval(getTime, 1000);


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
        }
    });
});
