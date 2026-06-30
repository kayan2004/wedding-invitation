// $(document).ready(function(e) {
//     var lang = $('#main').data('language');
//     var p_lbls = {
//         'show_days': {
//             'en': 'Days',
//             'ar': 'يوم'
//         },
//         'show_hours': {
//             'en': 'Hours',
//             'ar': 'ساعة'
//         },
//         'show_minutes': {
//             'en': 'Minutes',
//             'ar': 'دقيقة'
//         },
//         'show_seconds': {
//             'en': 'Seconds',
//             'ar': 'ثانية'
//         },
//     };

//     appHeight();

//     $(".main_slider_wrap").on('init', function(event, slick, direction) {
//         setTimeout(function() {
//             $(".main_slider_wrap").addClass('ini_zoom');
//         }, 300);
//     });
//     var VerticalNav = false;
//     var Verticalswipe = false;

//     if ($(window).width() > 1024 || isVertical) {
//         VerticalNav = true;
//         Verticalswipe = true;
//     }
//     $('.page_slide .page_slide.spacerSlide').remove();
//     var storySlider = $(".page_slide #page_slider");
//     storySlider.slick({
//         'arrows': false,
//         'dots': false,
//         'slidesToShow': 1,
//         'slidesToScroll': 1,
//         'infinite': false,
//         'pauseOnFocus': false,
//         'pauseOnHover': false,
//         'vertical': VerticalNav,
//         'verticalSwiping': Verticalswipe,
//         'autoplay': false,
//         'lazyLoad': 'ondemand' 
//     });

//     if (evAutoplaySpeed && evAutoplaySpeed > 0) {
//         if ($('#audioLockScreen').length === 0) {
//         }
//     }

//     if (evAutoPlay && $('#ios_audio_lockscreen').length) {
//         storySlider.slick('slickPause');
//     }

//     storySlider.on('wheel', (function(e) {
//         e.preventDefault();

//         if (e.originalEvent.deltaY < 0) {
//             $(this).slick('slickPrev');
//         } else {
//             $(this).slick('slickNext');
//         }
//     }));

//     slidesCount = $("#page_slider .page_slide").length - 1;

//     var audio_flag = 0;
//     var bgAudio = document.getElementById('bgmusic');

//     storySlider.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
//         if (nextSlide != 0) {
//             $('.firstLineTextMain').addClass('hideIntroLine');
//             $('.intro_screen').addClass('dim');
//             if ($('#music_player_BTN').length > 0) {
//                 $('#music_player_BTN').addClass('showAudioBtn');
//             }
//             if ($('#bgmusic').length > 0) {
//                 if (audio_flag == 0) {
//                     bgAudio.play();
//                 }
//                 audio_flag++;
//             }

//         } else {
//             $('.introLineIMG, .firstLineTextMain').removeClass('hideIntroLine');
//             $('.intro_screen').removeClass('dim');
//             if ($('#music_player_BTN').length > 0) {
//                 $('#music_player_BTN').removeClass('showAudioBtn');
//             }
//         }
//         if (nextSlide == slidesCount) {
//             setTimeout(function() {
//                 $('.page_slide #sec_story').addClass('showPoweredBy');
//             }, 300);
//         } else {
//             $('.page_slide #sec_story').removeClass('showPoweredBy');
//         }

//         var sn_el = slick.$slides.get(nextSlide);
//         if ($(sn_el).hasClass('IMGslide')) {
//             $(sn_el).addClass('animIMG');
//         }
//         setTimeout(function() {
//             $(sn_el).siblings().removeClass('animIMG');
//         }, 300);

//         var progress = (nextSlide / slidesCount) * 100;
//         $('.progress_bar .progress_state').css('width', progress + '%');
//     });


//     var deadline = $('#countdown_timer').data('deadline');

//     $('#clockTimer').countdown(deadline, function(event) {
//         var clkHTML = buildClockHTML(p_lbls, lang);
//         $(this).html(event.strftime(clkHTML)).on('finish.countdown', function(event) {
//             $('#countdown_timer').remove();
//         });
//     });

//     $('#music_player_BTN').on('click', function() {
//         togglePause();
//     });

//     if (IsMobile() && $('#ios_audio_lockscreen').length > 0) {
//         handleMobileLockScreen();
//     }

//     $('.prompt').fadeOut();
//     RunSwipeUpHelper();

//     $('video#customvidbackground').addClass('hideVideo');
// });

// $(window).on('load', function() {
//     $('#preloaderCont').fadeOut();

//     evtCount = 0;
//     evTimer = setInterval(function() {
//         evtCount++;
//     }, 1000);

//     if (!$('#ios_audio_lockscreen').length) {
//         RunPrompter();
//     }

//     if (!IsMobile()) {
//         $(".main_slider_wrap").slick('slickPlay');
//         PlayBgVido();
//         LoadVideo(VideoBufferPercent);
//     }
  
// });

// $(window).on('resize', function() {
//     appHeight();
// });

// function buildClockHTML(p_lbls, lang) {
//     var clkHTML = ''
//         + '<div id="totaldays" class="tcell t_days">'
//         + '<span class="t_val daysVal">%D</span>'
//         + '<span class="t_label">' + p_lbls.show_days[lang] + '</span>'
//         + '</div>'
//         + '<div id="totalhours" class="tcell t_hours">'
//         + '<span class="t_val hoursVal">%H</span>'
//         + '<span class="t_label">' + p_lbls.show_hours[lang] + '</span>'
//         + '</div>'
//         + '<div id="totalminutes" class="tcell t_mins">'
//         + '<span class="t_val minsVal">%M</span>'
//         + '<span class="t_label">' + p_lbls.show_minutes[lang] + '</span>'
//         + '</div>'
//         + '<div id="totalseconds" class="tcell t_secs">'
//         + '<span class="t_val secsVal">%S</span>'
//         + '<span class="t_label">' + p_lbls.show_seconds[lang] + '</span>'
//         + '</div>';

//     if (lang == 'ar') {
//         clkHTML = ''
//             + '<div id="totalseconds" class="tcell t_secs">'
//             + '<span class="t_val secsVal">%S</span>'
//             + '<span class="t_label">' + p_lbls.show_seconds[lang] + '</span>'
//             + '</div>'
//             + '<div id="totalminutes" class="tcell t_mins">'
//             + '<span class="t_val minsVal">%M</span>'
//             + '<span class="t_label">' + p_lbls.show_minutes[lang] + '</span>'
//             + '</div>'
//             + '<div id="totalhours" class="tcell t_hours">'
//             + '<span class="t_val hoursVal">%H</span>'
//             + '<span class="t_label">' + p_lbls.show_hours[lang] + '</span>'
//             + '</div>'
//             + '<div id="totaldays" class="tcell t_days">'
//             + '<span class="t_val daysVal">%D</span>'
//             + '<span class="t_label">' + p_lbls.show_days[lang] + '</span>'
//             + '</div>';
//     }
//     return clkHTML;
// }

// function handleMobileLockScreen() {
//     $('#ios_audio_lockscreen').css('display', 'block');
//     $('.main_wrapper').addClass('iosAudio');
//     $('.ct_article #sec_story').css('opacity', 0);

//     $('#ios_audio_lockscreen').on('click', function() {
//         if ($('body').hasClass('ct_article')) {
//             $("html, body").scrollTop(0);
//             $('.ct_article #sec_story').css('opacity', 1);
//             RunSwipeUpHelper();
//         }

//         var myAudio_start = document.getElementById('bgmusic');
//         if (myAudio_start) {
//             myAudio_start.play();
//         }

//         $(this).fadeOut(300);
//         setTimeout(function() {
//             $('.main_wrapper').removeClass('iosAudio');
//             $('.page_slide.helperSlide').addClass('hlpIndicShow');
//         }, 400);

//         if (evAutoPlay) {
//             // customAutoPlay(evAutoplaySpeed);
//         }

//         GuestName_fld_val = $('.form-wrapper .guestNames_dyn_wrapper').text();
//         $('form .form-field #full_name').val(GuestName_fld_val);

//         $(".main_slider_wrap").slick('slickPlay');
//         PlayBgVido();
//         LoadVideo(VideoBufferPercent);
//         RunPrompter();
//     });
// }

// function togglePause() {
//     var myAudio = document.getElementById('bgmusic');
//     return myAudio.paused ? myAudio.play() : myAudio.pause();
// }

// function appHeight() {
//     var idealHeight = 635;
//     var windowHeight = $(window).height();
//     var windowWidth = $(window).width();
//     var appframe_height = windowHeight;
//     var appframe_width = windowWidth;

//     if (windowHeight < 490 && windowWidth > 700) {
//         appframe_height = idealHeight;
//     } else if (windowHeight > 636 && windowWidth > 769) {
//         appframe_height = idealHeight;
//     } else {
//         appframe_height = windowHeight;
//     }

//     if (windowWidth > 680) {
//         appframe_width = 375;
//     } else {
//         appframe_width = windowWidth;
//     }

//     $('.page_slide #main .main_wrapper, .page_slide .page_slide').css('height', appframe_height + 'px');
//     $('#main .main_wrapper, .ct_article #sec_intro').css('width', appframe_width + 'px');
// }

// function IsMobile() {
//     var isMobile = false;
//     if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//         isMobile = true;
//     }
//     return isMobile;
// }

// function RunSwipeUpHelper() {
//     HideSwipeUp();
//     if ($('body').hasClass('ct_article')) {
//         var _counter = 0;
//         var scrollTimer = setInterval(function() {
//             _counter++;
//             if (_counter % 2 !== 0) {
//                 if ($("html, body").scrollTop() < 100) {
//                     ShowSwipeUp();
//                 } else {
//                     HideSwipeUp();
//                     clearInterval(scrollTimer);
//                 }
//             }
//         }, 6300); 
//     }

//     $(window).on('scroll', function() {
//         if ($("html, body").scrollTop() > 99) {
//             HideSwipeUp();
//             clearInterval(scrollTimer);
//         }
//     });
// }

// function ShowSwipeUp() {
//     $('.prompt_swipeUp').fadeIn();
//     $('.prompt_swipeUp').addClass('isVisible');
//     setTimeout(function() {
//         HideSwipeUp();
//     }, 6300);
// }

// function HideSwipeUp() {
//     $('.prompt_swipeUp').fadeOut();
//     $('.prompt_swipeUp').removeClass('isVisible');
// }

// function RunPrompter() {
//     intervalId_start = null;
//     setTimeout(function() {
//         ShowPrompt();
//         intervalId_start = setInterval(function() {
//             ShowPrompt();
//         }, 12000); 
//     }, 2000);

//     var storySlidesCount = $(".page_slide #page_slider").slick('getSlick').slideCount;
//     var NeedPrompter = true;
//     intervalId = null;

//     $(".page_slide #page_slider").on('afterChange', function() {
//         $('.prompt').hide();
//         clearInterval(intervalId_start);
//         var userDidSwipe = false;

//         var current_slide_classes = $('.page_slide #page_slider .slick-current').attr('class');
//         var ExecludeSlides = ['rsvp', 'endFrame'];

//         var containsExcludedValue = ExecludeSlides.some(value => current_slide_classes.includes(value));

//         if (!containsExcludedValue) {
//             if (NeedPrompter) {
//                 var timeoutId = setTimeout(function() {
//                     if (!userDidSwipe) {
//                         ShowPrompt();
//                         intervalId = setInterval(function() {
//                             if (!userDidSwipe) {
//                                 ShowPrompt();
//                             }
//                         }, 12000); 
//                     }
//                 }, 5000);
//             }
//         } else {
//             NeedPrompter = false;
//         }

//         $(".page_slide #page_slider").on('afterChange', function() {
//             $('.prompt').hide();
//             clearTimeout(timeoutId);
//             clearInterval(intervalId);
//             userDidSwipe = true;
//         });

//         $(".page_slide #page_slider").on('beforeChange', function() {
//             $('.prompt').hide();
//         });
//     });
// }

// function ShowPrompt() {
//     $('.prompt').fadeIn();
//     setTimeout(function() {
//         $('.prompt').fadeOut();
//     }, 5000);
// }

// function PlayBgVido() {
//     if ($('video#customvidbackground').length > 0) {
//         $('#customvidbackground')[0].play();
//     }
// }

// function restartVideo() {
//     var BGvideo = document.getElementById("customvidbackground");
//     BGvideo.currentTime = 0;
//     BGvideo.play(); 
// }

// function isLoaded(BufferLimit) {
//     var vbLimit = BufferLimit;
//     if (BufferLimit < 1) {
//         vbLimit = 1;
//     }
//     if (BufferLimit > 99) {
//         vbLimit = 99;
//     }
//     var BGvideo = document.getElementById("customvidbackground");
//     if (BGvideo.buffered.length > 0) {
//         var buffered = BGvideo.buffered.end(0);
//         var duration = BGvideo.duration;
//         var bufferedPercentage = (buffered / duration) * 100;

//         return bufferedPercentage >= BufferLimit;
//     }
//     return false;
// }

// function LoadVideo(per_buffer_val) {
//     if ($('video#customvidbackground').length > 0) {
//         var vidBufferTimer = setInterval(function() {
//             if (isLoaded(per_buffer_val)) {
//                 clearInterval(vidBufferTimer);
//                 $('video#customvidbackground').removeClass('hideVideo');
//                 restartVideo();
//             }
//         }, 500);
//     }
// }