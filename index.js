(function () {
    let slider, display, smin, smax, velocity, gravity, friction, bounce, tilt, rdirection, pos;
  
    function init() {
        slider = document.getElementById("slider");
        display = document.getElementById("rangeValue");
        

        smin = 0;
        smax = 2147483648;

        velocity = 0;
        pos = 100;
        gravity = 400000;
        friction = 0.985;
        bounce = 0.75;
        tilt = 15;
        rdirection = "N";

        document.getElementById('lbutton').addEventListener("mousedown", rdirl);
        document.getElementById('lbutton').addEventListener("mouseup", rdirn);
        document.getElementById('rbutton').addEventListener("mousedown", rdirr);
        document.getElementById('rbutton').addEventListener("mouseup", rdirn);
        document.getElementById("root").addEventListener("keydown", kdown);
        document.getElementById("root").addEventListener("keyup", kup);

        window.requestAnimationFrame(loop);
    }

    function update() {
        if (rdirection == "L") {
            slider.style.transform = "rotate(-"+ tilt +"deg)";
            velocity -= gravity
        } else if (rdirection == "R") {
            slider.style.transform = "rotate("+ tilt +"deg)";
            velocity += gravity
        } else {
            slider.style.transform = "rotate(0deg)";
        }
        velocity *= friction;
        pos += velocity;
        
        if (pos < smin) {
            pos = smin;
            velocity *= -bounce;
        } else if (pos > smax) {
            pos = smax;
            velocity *= -bounce;
        }
        display.innerText = convertTimestamp(Math.round(pos));
        slider.value = pos;
    }
  
    function loop() {
        window.requestAnimationFrame(loop);
        
        update();
    }
    
    function convertTimestamp(timestamp) {
        // Totaly did not rob someone from stack overflow
        var d = new Date(timestamp * 1000),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;
    
        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh == 0) {
            h = 12;
        }
    
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
        return time;
    }

    function kdown(event) {
        if (event.key == "ArrowRight") {
            rdirr();
        }
        if (event.key == "ArrowLeft") {
            rdirl();
        }
    }

    function kup(event) {
        if (event.key == "ArrowRight") {
            rdirn();
        }
        if (event.key == "ArrowLeft") {
            rdirn();
        }
    }

    function rdirl() {
        rdirection = "L";
    }

    function rdirr() {
        rdirection = "R";
    }

    function rdirn() {
        rdirection = "N";
    }

    document.addEventListener("DOMContentLoaded", init);
})()