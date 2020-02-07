/* Demo only */

$(document).ready(function() {

    /* Sliders value */
    let slidersText = document.querySelectorAll('[demo-slider]');
    for(let i = 0;i<slidersText.length;i++){
        window[slidersText[i].getAttribute("demo-slider")].on('update',function(values){
            slidersText[i].innerHTML = values.join(' | ');
        })
    }
});