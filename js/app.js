jQuery(document).ready(function($) {

    "use strict";

    // PRELOADER
    $(window).load(function() {
        $('#preloader').fadeOut('slow', function() {
            $(this).remove();
        });
    });


    // REVOLUTION SLIDER
    var tpj = jQuery;
    var revapi104;
    if (tpj("#revolutionslider-1").revolution == undefined) {
        revslider_showDoubleJqueryError("#revolutionslider-1");
    } else {
        revapi104 = tpj("#revolutionslider-1").show().revolution({
            sliderType: "standard",
            jsFileLocation: "assets/revolution/js/",
            sliderLayout: "fullscreen",
            dottedOverlay: "gradient",
            minHeight: '630',
            delay: 9000,
            navigation: {
                keyboardNavigation: "off",
                keyboard_direction: "horizontal",
                mouseScrollNavigation: "off",
                onHoverStop: "off",
                touch: {
                    touchenabled: "on",
                    swipe_threshold: 75,
                    swipe_min_touches: 1,
                    swipe_direction: "horizontal",
                    drag_block_vertical: false
                },
                arrows: {
                    style: "metis",
                    enable: true,
                    hide_onmobile: true,
                    left: {
                        h_align: "left",
                        v_align: "center",
                        h_offset: 10,
                        v_offset: 0
                    },
                    right: {
                        h_align: "right",
                        v_align: "center",
                        h_offset: 10,
                        v_offset: 0
                    }
                },
            },
            responsiveLevels: [1240, 1024, 778, 480],
            visibilityLevels: [1240, 1024, 778, 480],
            gridwidth: [1240, 1024, 778, 480],
            gridheight: [868, 768, 960, 720],
            lazyType: "none",
            parallax: {
                type: "mouse",
                origo: "slidercenter",
                disable_onmobile: "on"
            },
            shadow: 0,
            spinner: "off",
            shuffle: "off",
            autoHeight: "off",
            disableProgressBar: "on"
        });
        var newCall = new Object(),
            cslide;

        newCall.callback = function() {
            var proc = revapi104.revgetparallaxproc(),
                fade = 1 + proc,
                scale = 1 + (Math.abs(proc) / 10);

            punchgs.TweenLite.set(revapi104.find('.slotholder, .rs-background-video-layer'), {
                opacity: fade,
                scale: scale
            });
        }
        newCall.inmodule = "parallax";
        newCall.atposition = "start";

        revapi104.bind("revolution.slide.onloaded", function(e) {
            revapi104.revaddcallback(newCall);
        });
    }


    // ADDS CLASS WHEN HEADER HAS TOPBAR
    $('header').has('.topbar').addClass('v-middle-pt145')


    // NAV BR RESIZING
    $(window).on("scroll", function() {
        if ($(document).scrollTop() > 50) {
            $("header").removeClass("large").addClass("small");
        } else {
            $("header").removeClass("small").addClass("large");
        }
    });


    // MOBILE MENU TRIGGER
    $('.menu-item').addClass('menu-trigger');
    $('.menu-trigger').click(function() {
        $('#menu-trigger').toggleClass('clicked');
        $('.container').toggleClass('push');
        $('.pushmenu').toggleClass('open');
    });


    // SEARCH
    $('.search').click(function(e) {
        $(".search-overlay").addClass("visible");
        e.preventDefault();
    });
    $('.close-search').click(function(e) {
        $(".search-overlay").removeClass("visible");
        e.preventDefault();
    });


    // FOUNDATION INITIALIZER
    $(document).foundation();


    // LIGHTCASE
    $('a[data-rel^=lightcase]').lightcase({
        showSequenceInfo: false
    });


    // COUNTDOWN
    $('[data-countdown]').each(function() {
        var $this = $(this),
            finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function(event) {
            $this.html(event.strftime('' +
                '<span class="time">%D <span>days</span></span> ' +
                '<span class="time">%H <span>hr</span></span> ' +
                '<span class="time">%M <span>min</span></span> ' +
                '<span class="time">%S <span>sec</span></span>'));
        });
    });


    // SCROLLDOWN BUTTON
    $(".show-scrolldown-btn").append("<div class='scrolldown-btn reveal-from-bottom'></div>")
    $('.scrolldown-btn').on('click', function() {
        var ele = $(this).closest("div");
        // this will search within the section
        $("html, body").animate({
            scrollTop: $(ele).offset().top + 70
        }, 500);
        return false;
    });


    // ISOTOPE MASONRY
    $(window).load(function() {
        var $container = $('.grid');
        $container.isotope({
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer'
        });
        var $optionSets = $('.filter'),
            $optionLinks = $optionSets.find('a');
        $optionLinks.click(function() {
            var $this = $(this);
            if ($this.hasClass('active')) {
                return false;
            }
            var $optionSet = $this.parents('.filter');
            $optionSet.find('.active').removeClass('active');
            $this.addClass('active');
            // make option object dynamically, i.e. { filter: '.my-filter-class' }
            var options = {},
                key = $optionSet.attr('data-option-key'),
                value = $this.attr('data-option-value');
            value = value === 'false' ? false : value;
            options[key] = value;
            if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
                changeLayoutMode($this, options);
            } else {
                $container.isotope(options);
            }
            return false;
        });
    });


    // OWL CAROUSEL
    $('.testimonials-slider').owlCarousel({
        items: 1,
        autoHeight: true,
        autoplay: true,
        loop: true,
        autoplaySpeed: 1000
    });
    $('.testimonials-slider-2').owlCarousel({
        items: 1,
        autoHeight: true,
        autoplay: true,
        loop: true
    });
    $('.portfolio-slider').owlCarousel({
        items: 1,
        autoHeight: true,
        autoplay: true,
        loop: true
    });
    $('.product-slider').owlCarousel({
        items: 1,
        autoHeight: true,
        loop: true,
        margin: 0
    });

    var sync1 = $("#sync1");
    var sync2 = $("#sync2");
    var slidesPerPage = 4; //globaly define number of elements per page
    var syncedSecondary = true;
    sync1.owlCarousel({
        items: 1,
        slideSpeed: 2000,
        autoplay: true,
        loop: true,
        dots: false,
        responsiveRefreshRate: 200
    }).on('changed.owl.carousel', syncPosition);
    sync2
        .on('initialized.owl.carousel', function() {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items: slidesPerPage,
            smartSpeed: 200,
            slideSpeed: 500,
            margin: 0,
            dots: false,
            slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
            responsiveRefreshRate: 100
        }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        //if you set loop to false, you have to restore this next line
        //var current = el.item.index;

        //if you disable loop you have to comment this block
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }
        sync2
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();
        if (current > end) {
            sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            sync1.data('owl.carousel').to(number, 100, true);
        }
    }
    sync2.on("click", ".owl-item", function(e) {
        e.preventDefault();
        var number = $(this).index();
        sync1.data('owl.carousel').to(number, 300, true);
    });


    $('.clients-carousel').owlCarousel({
        margin: 10,
        responsiveClass: true,
        autoplay: true,
        loop: true,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3,
                nav: false
            },
            1000: {
                items: 5,
                loop: false
            }
        }
    })


    // PROGRESS BARS
    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();
        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }
    var IsViewed = false;
    $(window).scroll(function() {
        $('.bar-percentage[data-percentage]:not(.viewed)').each(function() {
            var progress = $(this);
            if (isScrolledIntoView(progress.parent('.progress-bar'))) {

                var percentage = Math.ceil($(this).attr('data-percentage'));
                progress.addClass('viewed');
                $({
                    countNum: 0
                }).animate({
                    countNum: percentage
                }, {
                    duration: 3500,
                    easing: 'swing',
                    step: function() {
                        var pct = '';
                        if (percentage == 0) {
                            pct = Math.floor(this.countNum) + '%';
                        } else {
                            pct = Math.floor(this.countNum + 1) + '%';
                        }
                        progress.text(pct) && progress.siblings().children().css('width', pct);
                    }
                });
            }
        });
        IsViewed = true;
    });


    // SCROLL REVEAL
    window.sr = ScrollReveal();
    sr.reveal('.reveal-from-top, .reveal-from-bottom, .reveal-from-left, .reveal-from-right', {
        delay: 500,
        easing: 'ease',
        duration: 400,
        scale: 0
    });
    sr.reveal('.reveal-from-top', {
        origin: 'top'
    });
    sr.reveal('.reveal-from-left', {
        origin: 'left'
    });
    sr.reveal('.reveal-from-right', {
        origin: 'right'
    });


    // COUNTER
    $(function() {
        $(".counter").countimator({
            duration: 5000
        });
    });


    // SVG ANIMATIONS
    (function() {
        var docElem = window.document.documentElement;
        window.requestAnimFrame = function() {
            return (
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function( /* function */ callback) {
                    window.setTimeout(callback, 1000 / 60);
                }
            );
        }();
        window.cancelAnimFrame = function() {
            return (
                window.cancelAnimationFrame ||
                window.webkitCancelAnimationFrame ||
                window.mozCancelAnimationFrame ||
                window.oCancelAnimationFrame ||
                window.msCancelAnimationFrame ||
                function(id) {
                    window.clearTimeout(id);
                }
            );
        }();

        function SVGEl(el) {
            this.el = el;
            this.image = this.el.previousElementSibling;
            this.current_frame = 0;
            this.total_frames = 80;
            this.path = new Array();
            this.length = new Array();
            this.handle = 0;
            this.init();
        }
        SVGEl.prototype.init = function() {
            var self = this;
            [].slice.call(this.el.querySelectorAll('path')).forEach(function(path, i) {
                self.path[i] = path;
                var l = self.path[i].getTotalLength();
                self.length[i] = l;
                self.path[i].style.strokeDasharray = l + ' ' + l;
                self.path[i].style.strokeDashoffset = l;
            });
        };
        SVGEl.prototype.render = function() {
            if (this.rendered) return;
            this.rendered = true;
            this.draw();
        };
        SVGEl.prototype.draw = function() {
            var self = this,
                progress = this.current_frame / this.total_frames;
            if (progress > 1) {
                window.cancelAnimFrame(this.handle);
                this.showImage();
            } else {
                this.current_frame++;
                for (var j = 0, len = this.path.length; j < len; j++) {
                    this.path[j].style.strokeDashoffset = Math.floor(this.length[j] * (1 - progress));
                }
                this.handle = window.requestAnimFrame(function() {
                    self.draw();
                });
            }
        };
        SVGEl.prototype.showImage = function() {
            classie.add(this.image, 'show');
            classie.add(this.el, 'hide');
        };

        function getViewportH() {
            var client = docElem['clientHeight'],
                inner = window['innerHeight'];

            if (client < inner)
                return inner;
            else
                return client;
        }

        function scrollY() {
            return window.pageYOffset || docElem.scrollTop;
        }

        function getOffset(el) {
            var offsetTop = 0,
                offsetLeft = 0;
            do {
                if (!isNaN(el.offsetTop)) {
                    offsetTop += el.offsetTop;
                }
                if (!isNaN(el.offsetLeft)) {
                    offsetLeft += el.offsetLeft;
                }
            } while (el = el.offsetParent)

            return {
                top: offsetTop,
                left: offsetLeft
            };
        }

        function inViewport(el, h) {
            var elH = el.offsetHeight,
                scrolled = scrollY(),
                viewed = scrolled + getViewportH(),
                elTop = getOffset(el).top,
                elBottom = elTop + elH,
                // if 0, the element is considered in the viewport as soon as it enters.
                // if 1, the element is considered in the viewport only when it's fully inside
                // value in percentage (1 >= h >= 0)
                h = h || 0;

            return (elTop + elH * h) <= viewed && (elBottom) >= scrolled;
        }

        function init() {
            var svgs = Array.prototype.slice.call(document.querySelectorAll('.main svg')),
                svgArr = new Array(),
                didScroll = false,
                resizeTimeout;

            // the svgs already shown...
            svgs.forEach(function(el, i) {
                var svg = new SVGEl(el);
                svgArr[i] = svg;
                setTimeout(function(el) {
                    return function() {
                        if (inViewport(el.parentNode)) {
                            svg.render();
                        }
                    };
                }(el), 250);
            });
            var scrollHandler = function() {
                    if (!didScroll) {
                        didScroll = true;
                        setTimeout(function() {
                            scrollPage();
                        }, 60);
                    }
                },
                scrollPage = function() {
                    svgs.forEach(function(el, i) {
                        if (inViewport(el.parentNode, 0.5)) {
                            svgArr[i].render();
                        }
                    });
                    didScroll = false;
                },
                resizeHandler = function() {
                    function delayed() {
                        scrollPage();
                        resizeTimeout = null;
                    }
                    if (resizeTimeout) {
                        clearTimeout(resizeTimeout);
                    }
                    resizeTimeout = setTimeout(delayed, 200);
                };
            window.addEventListener('scroll', scrollHandler, false);
            window.addEventListener('resize', resizeHandler, false);
        }
        init();
    })();


    // HIDE/SHOW REPLY FORM
    $(".reply-form").hide();
    $("button.button.comment-reply").click(function() {
        $(this).toggleClass("active").next().slideToggle("fast");

        if ($.trim($(this).text()) === 'Cancel') {
            $(this).text('Reply');
        } else {
            $(this).text('Cancel');
        }
        return false;
    });
    $("a[href='" + window.location.hash + "']").parent(".button.comment-reply").click();


    // SEARCH OVERLAY
    $("#overlay").click(function() {
        $(".search-overlay").addClass('overlay-open');
    });
    $(".overlay-close").click(function() {
        $(".search-overlay").removeClass('overlay-open');
    });


    // FORM VALIDATION
    $("#contactForm").validator().on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formError();
            submitMSG(false, "Please fill in the required fields");
        } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm() {
        // Initiate Variables With Form Content
        var name = $("#name").val();
        var email = $("#email").val();
        var subject = $("#subject").val();
        var message = $("#message").val();

        $.ajax({
            type: "POST",
            url: "php/form-process.php",
            data: "name=" + name + "&subject=" + subject + "&email=" + email + "&message=" + message,
            success: function(text) {
                if (text == "success") {
                    formSuccess();
                } else {
                    formError();
                    submitMSG(false, text);
                }
            }
        });
    }

    function formSuccess() {
        $("#contactForm")[0].reset();
        submitMSG(true, "Message Submitted!")
    }

    function formError() {
        $("#contactForm").removeClass().addClass().one('', function() {
            $(this).removeClass();
        });
    }

    function submitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "text-success";
        } else {
            var msgClasses = "text-required";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
        $("#msgSubmit").show().delay(5000).fadeOut();
    }


    // NO V-MIDDLE
    $('.vertical-heading').closest('section').addClass('no-v-middle');
    $('.vertical-heading + div').closest('section').removeClass('no-v-middle');


    // BACK TO TOP
    var offset = 300,
        offset_opacity = 1200,
        scroll_top_duration = 500,
        $back_to_top = $('.backtotop');
    $(window).scroll(function() {
        ($(this).scrollTop() > offset) ? $back_to_top.addClass('is-visible'): $back_to_top.removeClass('is-visible fade-out');
        if ($(this).scrollTop() > offset_opacity) {
            $back_to_top.addClass('fade-out');
        }
    });
    $back_to_top.on('click', function(event) {
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0
        }, scroll_top_duration);
    });
});
