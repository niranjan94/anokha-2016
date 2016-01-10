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
            'border-bottom': '3px solid #fb5e00'
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
            'border-bottom': '3px solid #fb5e00'
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
            'border-bottom': '3px solid #fb5e00'
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
            'border-bottom': '3px solid #fb5e00'
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
            'border-bottom': '3px solid #fb5e00'
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
                'border-left': '4px solid #fb5e00'
            });

        }
    });

};

$(document).ready(main);

var EPPZScrollTo =
{
    /**
     * Helpers.
     */
    documentVerticalScrollPosition: function()
    {
        if (self.pageYOffset) return self.pageYOffset; // Firefox, Chrome, Opera, Safari.
        if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop; // Internet Explorer 6 (standards mode).
        if (document.body.scrollTop) return document.body.scrollTop; // Internet Explorer 6, 7 and 8.
        return 0; // None of the above.
    },

    viewportHeight: function()
    { return (document.compatMode === "CSS1Compat") ? document.documentElement.clientHeight : document.body.clientHeight; },

    documentHeight: function()
    { return (document.height !== undefined) ? document.height : document.body.offsetHeight; },

    documentMaximumScrollPosition: function()
    { return this.documentHeight() - this.viewportHeight(); },

    elementVerticalClientPositionById: function(id)
    {
        var element = document.getElementById(id);
        var rectangle = element.getBoundingClientRect();
        return rectangle.top;
    },

    /**
     * Animation tick.
     */
    scrollVerticalTickToPosition: function(currentPosition, targetPosition)
    {
        var filter = 0.2;
        var fps = 40;
        var difference = parseFloat(targetPosition) - parseFloat(currentPosition);

        // Snap, then stop if arrived.
        var arrived = (Math.abs(difference) <= 0.5);
        if (arrived)
        {
            // Apply target.
            scrollTo(0.0, targetPosition);
            return;
        }

        // Filtered position.
        currentPosition = (parseFloat(currentPosition) * (1.0 - filter)) + (parseFloat(targetPosition) * filter);

        // Apply target.
        scrollTo(0.0, Math.round(currentPosition));

        // Schedule next tick.
        setTimeout("EPPZScrollTo.scrollVerticalTickToPosition("+currentPosition+", "+targetPosition+")", (1000 / fps));
    },

    /**
     * For public use.
     *
     * @param id The id of the element to scroll to.
     * @param padding Top padding to apply above element.
     */
    scrollVerticalToElementById: function(id, padding)
    {
        var element = document.getElementById(id);
        if (element == null)
        {
            console.warn('Cannot find element with id \''+id+'\'.');
            return;
        }

        var targetPosition = this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - padding;
        var currentPosition = this.documentVerticalScrollPosition();

        // Clamp.
        var maximumScrollPosition = this.documentMaximumScrollPosition();
        if (targetPosition > maximumScrollPosition) targetPosition = maximumScrollPosition;

        // Start animation.
        this.scrollVerticalTickToPosition(currentPosition, targetPosition);
    }
};