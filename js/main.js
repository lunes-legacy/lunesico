"use strict";var endDate="",toggleMenu=function(){$("#navbar").toggle("fast")};function showTab(t){"qte"==t?($("#qte").show(),$("#per").hide(),$("#tab_qte").addClass("ativo"),$("#tab_per").removeClass("ativo")):($("#qte").hide(),$("#per").show(),$("#tab_qte").removeClass("ativo"),$("#tab_per").addClass("ativo"))}function formatDisplayNumber(t,e){return e+" "+t.toFixed(0).replace(/./g,function(t,e,a){return e>0&&"."!==t&&(a.length-e)%3==0?"."+t:t})}function updateSaldo(){$.ajax({url:"https://apiw.lunes.io/api/ico/phase",type:"POST",success:function(t){var e=$.grep(t,function(t){return"active"===t.sale_status}),a=$.grep(t,function(t){return"Whitelist"===t.name}),n=parseInt(a[0].total_value);null!=e[0].total_value&&(n=parseInt(e[0].total_value)+parseInt(a[0].total_value)),endDate=e[0].end_datetime;var o=formatDisplayNumber(parseInt(e[0].global_limit),"");$("#coin_sale").html(formatDisplayNumber(n,"")),$("#coin_counter").html(o),$("#raisedValue").html("$ "+formatDisplayNumber(.01*n,"")),document.getElementById("loading_bar_green").style.width=percBarra(e[0].global_limit,n)+"%"},error:function(t,e,a){console.log(t.status),console.log(a),$("#coin_counter").html("0"),document.getElementById("loading_bar_green").style.width="0%"}})}function diff_hours(t,e){var a=(t.getTime()-e.getTime())/1e3;return a/=3600,Math.abs(Math.round(a))}function percBarra(t,e){var a=Math.round(e)/Math.round(t);return 100*Math.abs(a)}function getTime(){var t=new Date;t=new Date(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate(),t.getUTCHours(),t.getUTCMinutes(),t.getUTCSeconds());var e=new Date("03/31/2018 02:00:00"),a=new Date(e-t),n=new Date(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate(),a.getUTCHours(),a.getUTCMinutes(),a.getUTCSeconds());n.getUTCDate()>1?($("#put_s_day_en").html("Days"),$("#put_s_day_pt").html("Dias")):($("#put_s_day_en").html("Day"),$("#put_s_day_pt").html("Dia")),n.getUTCHours()>1?($("#put_s_hour_en").html("Hours"),$("#put_s_hour_pt").html("Horas")):($("#put_s_hour_en").html("Hour"),$("#put_s_hour_pt").html("Hora")),n.getUTCMinutes()>1?($("#put_s_min_en").html("Minutes"),$("#put_s_min_pt").html("Minutos")):($("#put_s_min_en").html("Minute"),$("#put_s_min_pt").html("Minuto")),n.getUTCSeconds()>1?($("#put_s_sec_en").html("Seconds"),$("#put_s_sec_pt").html("Segundos")):($("#put_s_sec_en").html("Second"),$("#put_s_sec_pt").html("Segundo")),n.getUTCDate()>0?$("#con_days").html(n.getUTCDate()-1):$("#con_days").html("0"),$("#con_hours").html(n.getUTCHours()),$("#con_min").html(n.getUTCMinutes()),$("#con_sec").html(n.getUTCSeconds())}$("#navbar").click(function(){toggleMenu()}),$("#navbar #cont a").click(function(){$("#navbar #cont").find(".ativo").removeClass("ativo"),$(this).addClass("ativo")}),$("#navbar #cont a").on("click",function(t){var e=this.hash;if("#"==$(this).attr("href").substring(0,1)){t.preventDefault();return $("html, body").animate({scrollTop:$(this.hash).offset().top-130},500,function(){return window.history.pushState(null,null,e)})}}),setInterval(getTime,1e3),setInterval(updateSaldo,6e4),$(document).ready(function(){var t=$("#header"),e="lunes-nav-shadow";$(window).scroll(function(){$(this).scrollTop()>100?t.addClass(e):t.hasClass(e)&&t.removeClass(e)}),$("#slide_time").lightSlider({gallery:!0,item:1,loop:!0,thumbItem:9,slideMargin:0,enableDrag:!0,currentPagerPosition:"left",onSliderLoad:function(t){t.lightGallery({selector:"#slide_time .lslide"})}}),getTime(),updateSaldo()});