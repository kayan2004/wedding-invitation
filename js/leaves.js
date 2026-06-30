/* Define the number of leaves to be used in the animation */
const NUMBER_OF_LEAVES = 20;

/* Called when the "Falling Leaves" page is completely loaded. */
function init_leaves(folder, images) {
    /* Get a reference to the element that will contain the leaves */
    var container = document.getElementById('fallingImageContainer');
    /* Fill the empty container with new leaves */
    for (var i = 0; i < NUMBER_OF_LEAVES; i++) {
        container.appendChild(createALeaf(folder, images));
    }
}

/* Receives the lowest and highest values of a range and returns a random integer that falls within that range. */
function randomInteger(low, high) {
    return low + Math.floor(Math.random() * (high - low));
}

/* Receives the lowest and highest values of a range and returns a random float that falls within that range. */
function randomFloat(low, high) {
    return low + Math.random() * (high - low);
}

/* Receives a number and returns its CSS pixel value. */
function pixelValue(value) {
    return value + 'px';
}

/* Returns a duration value for the falling animation. */
function durationValue(value) {
    return value + 's';
}

/* Uses an img element to create each leaf. */
function createALeaf(folder, images) {
    var leafDiv = document.createElement('div');
    var image = document.createElement('img');

    image.src = images[randomInteger(0, images.length)];
    leafDiv.style.top = "115%";

    var screenWidth = $(window).width();
    var scrnPixlVal = parseInt(screenWidth * 2.5);

    leafDiv.style.left = pixelValue(randomInteger(scrnPixlVal, 10));

    var spinAnimationName = (Math.random() < 0.8) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';
    if (folder == 'balloons') {
        spinAnimationName = (Math.random() < 0.8) ? 'clockwiseSpin_balloon' : 'counterclockwiseSpinAndFlip_balloon';
    }

    leafDiv.style.webkitAnimationName = 'fade, drop';
    image.style.webkitAnimationName = spinAnimationName;

    var fadeAndDropDuration = durationValue(randomFloat(40, 16));
    var spinDuration = durationValue(randomFloat(11, 20));

    leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;

    var leafDelay = durationValue(randomFloat(1, 0));
    leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;

    image.style.webkitAnimationDuration = spinDuration;

    leafDiv.appendChild(image);

    return leafDiv;
}

function re_init_leaves(folder, images) {
    if ($('#fallingImageContainer').length > 0) {
        $('#fallingImageContainer').empty();
        $('#fallingImageContainer').removeAttr('class');
    } else {
        $('.main').prepend('<div id="fallingImageContainer"></div>');
    }
    if (folder) {
        $('#fallingImageContainer').addClass(folder);
        init_leaves(folder, images);
    }
}

window.addEventListener('DOMContentLoaded', function () {
    var leafcont = document.getElementById('fallingImageContainer');
    if (typeof (leafcont) != 'undefined' && leafcont != null) {
        var folder = leafcont.getAttribute('data-image');
        var imagesAttribute = leafcont.getAttribute('data-images');
        
        // Assuming imagesAttribute is a single URL
        var images = [imagesAttribute];
        
        leafcont.className = folder;
        init_leaves(folder, images);
    }
}, false);
