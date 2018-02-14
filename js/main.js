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

    event.preventDefault();

    var navOffset = 130;
    
    // if(navOffset > 150){
    //     navOffset = 52;
    // }

    return $('html, body').animate({
        scrollTop: $(this.hash).offset().top - navOffset
    }, 500, function() {
        return window.history.pushState(null, null, target);
    });
});