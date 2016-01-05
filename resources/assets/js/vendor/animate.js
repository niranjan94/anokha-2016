var main = function () {

    $('.tab').click(function () {
        $('#signup').css({
            'display': 'none'
        });
        $('#login').css({
            'display': 'block'
        });
        $('.tabactive').css({
            'border': 'none'
        });
        $('.tab').css({
            'border': '1px solid #252525'
        });
    });

    $('.tabactive').click(function () {
        $('#signup').css({
            'display': 'block'
        });
        $('#login').css({
            'display': 'none'
        });
        $(this).css({
            'border': '1px solid #252525'
        });
        $('.tab').css({
            'border': 'none'
        });
    });

    $('#menu3').click(function () {
        $('#events,#lumiere,#workshop,#retaliation,#expo,#leaders').css({
            display: 'none'
        });
        $('#eventide').css({
            display: 'block'
        });
        $('#menu3').css({
            'border-bottom': '3px solid #FC5A01'
        });
        $('#menu6,#menu5,#menu4,#menu2,#menu1,#menu7').css({
            'border-bottom': 'none'
        });
    });

    $('#menu4').click(function () {
        $('#events,#workshops,#eventide,#retaliation,#expo,#leaders').css({
            display: 'none'
        });
        $('#lumiere').css({
            display: 'block'
        });
        $('#menu4').css({
            'border-bottom': '3px solid #FC5A01'
        });
        $('#menu6,#menu5,#menu3,#menu2,#menu1,#menu7').css({
            'border-bottom': 'none'
        });
    });

    $('#menu5').click(function () {
        $('#events,#lumiere,#eventide,#retaliation,#workshops,#leaders').css({
            display: 'none'
        });
        $('#expo').css({
            display: 'block'
        });
        $('#menu5').css({
            'border-bottom': '3px solid #FC5A01'
        });
        $('#menu6,#menu4,#menu3,#menu2,#menu1,#menu7').css({
            'border-bottom': 'none'
        });
    });

    $('#menu6').click(function () {
        $('#events,#lumiere,#eventide,#workshops,#expo,#leaders').css({
            display: 'none'
        });
        $('#retaliation').css({
            display: 'block'
        });
        $('#menu6').css({
            'border-bottom': '3px solid #FC5A01'
        });
        $('#menu5,#menu4,#menu3,#menu2,#menu1,#menu7').css({
            'border-bottom': 'none'
        });
    });

    $('#menu7').click(function () {
        $('#events,#lumiere,#eventide,#retaliation,#workshops,#expo').css({
            display: 'none'
        });
        $('#leaders').css({
            display: 'block'
        });
        $('#menu7').css({
            'border-bottom': '3px solid #FC5A01'
        });
        $('#menu6,#menu5,#menu4,#menu3,#menu2,#menu1').css({
            'border-bottom': 'none'
        });
    });

    $('#menu1').click(function () {
        $('.animation-element').animate({
            left: '75px'
        }, 500);
    });

    $('#menu7,#menu6,#menu5,#menu4,#menu3,#menu2').click(function () {
        $('.animation-element').animate({
            left: '-150%'
        }, 200);
    });

    $('.leftmenu span').click(function () {
        $('.leftmenu span').removeClass("cover");
        $(this).addClass("cover");
    });

    $('.leftmenu span:nth-child(1)').click(function () {
        var $container = $('#ib-container'),
            $articles = $container.children('article'), timeout;
        $articles.on('mouseenter', function (event) {
            var $article = $(this);
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                if ($article.hasClass('active')) return false;
                $articles.not($article.removeClass('blur').addClass('active'))
                    .removeClass('active')
                    .addClass('blur');
            }, 65);
        });
        $container.on('mouseleave', function (event) {
            clearTimeout(timeout);
            $articles.removeClass('active blur');
        });
    });

    $('#schedule').click(function () {
        $('.schedule').css({
            display: 'block'
        });
        $('.transport,.sponsors,.contacts').css({
            display: 'none'
        });
    });

    $('#transport').click(function () {
        $('.transport').css({
            display: 'block'
        });
        $('.schedule,.sponsors,.contacts').css({
            display: 'none'
        });
    });

    $('#sponsors').click(function () {
        $('.sponsors').css({
            display: 'block'
        });
        $('.schedule,.transport,.contacts').css({
            display: 'none'
        });
    });

    $('#contacts').click(function () {
        $('.contacts').css({
            display: 'block'
        });
        $('.schedule,.transport,.sponsors').css({
            display: 'none'
        });
    });

    $('.animation-element1').click(function () {
        if ($(this).parent().parent().data("dismiss") != "modal") {
            $('.animation-element1').css({
                border: 'none'
            });

            $(this).css({
                'border-left': '4px solid #FC5A01'
            });

        }
    });

};

$(document).ready(main);
