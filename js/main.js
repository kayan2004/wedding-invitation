var isVertical, tplID, isNPvar;
var npCount = 0;

isCoverPhoto = false;

isVertical = false;
tplID = 1;
isNPvar = true;
npCount = 2;
var evAutoPlay = true;
var evAutoplaySpeed = 8000;
var evInfinteLoop = true;
var VideoBufferPercent = 1;
function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

$(document).ready(function () {
  evBGSliderSpeed = 6;

  $(".main_slider_wrap").slick({
    arrows: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnFocus: false,
    pauseOnHover: false,
    touchMove: false,
    draggable: false,
  });
});