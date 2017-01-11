/**
 * Created by Bella on 2017/1/9.
 */
$(function() {
    var Accordion = function(el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;

        // Variables privadas
        var links = this.el.find('.link');
        // Evento
        links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
    }

    Accordion.prototype.dropdown = function(e) {
        var $el = e.data.el;
        $this = $(this),
            $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('open');

        if (!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
        };
    }

    var accordion = new Accordion($('#accordion'), false);
});

function openMyInfo() {
    document.getElementById("personalInfo").style.display = "block";
    document.getElementById("myActivity").style.display = "none";
    document.getElementById("myLost").style.display = "none";
    document.getElementById("myFound").style.display = "none";
}

function openActivity() {
    document.getElementById("personalInfo").style.display = "none";
    document.getElementById("myLost").style.display = "none";
    document.getElementById("myFound").style.display = "none";
    document.getElementById("myActivity").style.display = "block";
}

function openLost() {
    document.getElementById("personalInfo").style.display = "none";
    document.getElementById("myFound").style.display = "none";
    document.getElementById("myActivity").style.display = "none";
    document.getElementById("myLost").style.display = "block";
}

function openFound() {
    document.getElementById("personalInfo").style.display = "none";
    document.getElementById("myLost").style.display = "none";
    document.getElementById("myActivity").style.display = "none";
    document.getElementById("myFound").style.display = "block";
}