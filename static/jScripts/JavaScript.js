//counter for big json object
var jsoncounter = 0;
//big json object
var data = 0;
$(document).ready(function () {
  // Gets the video src from the data-src on each button
  $('#clickImg').click(() => {
    $('#btnForVideo').click();
    window.location.replace('#clickImg');
  });
  var $videoSrc;
  $('.video-btn').click(function () {
    $videoSrc = $(this).data('src');
  });
  console.log($videoSrc);

  // when the modal is opened autoplay it
  $('#myModal').on('shown.bs.modal', function (e) {
    // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
    $('#video').attr('src', $videoSrc + '?autoplay=1&amp;modestbranding=1&amp;showinfo=0');
  });

  // stop playing the youtube video when I close the modal
  $('#myModal').on('hide.bs.modal', function (e) {
    // a poor man's stop video
    $('#video').attr('src', $videoSrc);
  });

  // document ready
  //check if all fields filled
  $(document).change(function () {
    checkIfAllField();
  });
  $('.description').css('display', 'none');

  $('#blendedAnsNone').css('display', 'none');
  var x = window.matchMedia('(max-width: 768px)');
  JSbysize(x); // Call listener function at run time
  x.addListener(JSbysize); // Attach listener function on state changes

  $('#navTrigger').click(function () {
    var x = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
      x.className += ' responsive';
    } else {
      x.className = 'topnav';
    }
  });
  $('#sendBtn').click(pullFromTB);
  //go to top btn

  //Get the button:
  mybutton = document.getElementById('goToTop');
  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };
});
//הפעלת פונקציה בעזרת גודל מדיה
function JSbysize(x) {
  if (x.matches) {
    // If media query matches
    $('#h2Text').css('display', 'inline');
  } else {
    $('#h2Text').css('display', 'none');
  }
}
//pull data from textboxes to js variebles
function pullFromTB() {
  var thanim = parseInt($('#inputGroupSelect01 option:selected').val());
  var modelpedogogi = parseInt($('#inputGroupSelect02 option:selected').val());
  var eikef = parseInt($('#inputGroupSelect03 option:selected').val());
  var ramatoryanut = parseInt($('#inputGroupSelect04 option:selected').val());
  var mashavimkaiamim = parseInt($('#inputGroupSelect05 option:selected').val());
  var containt = parseInt($('#inputGroupSelect01 option:selected').text());
  var pedadogyModel = parseInt($('#inputGroupSelect02 option:selected').text());
  var scope = parseInt($('#inputGroupSelect03 option:selected').text());
  var literacy = parseInt($('#inputGroupSelect04 option:selected').text());
  var resources = parseInt($('#inputGroupSelect05 option:selected').text());
  //send data to data validation
  dataValidation(thanim, modelpedogogi, eikef, ramatoryanut, mashavimkaiamim);
  // send data to data tracing service
}

//function for data validation
function dataValidation(thanim, modelpedogogi, eikef, ramatoryanut, mashavimkaiamim) {
  if (
    thanim != 0 &&
    modelpedogogi != 0 &&
    modelpedogogi != 0 &&
    eikef != 0 &&
    ramatoryanut != 0 &&
    mashavimkaiamim != 0
  ) {
    modelCalculation(thanim, modelpedogogi, eikef, ramatoryanut, mashavimkaiamim);
  } else {
    alert('you have to fill all the fields');
  }
}
function hideAllAnswers() {
  $('#facetoface').css('display', 'none');
  $('#kvuzatImun').css('display', 'none');
  $('#kvuzatKria').css('display', 'none');
  $('#havruta').css('display', 'none');
}
//calculation of the model
function modelCalculation(thanim, modelpedogogi, eikef, ramatoryanut, mashavimkaiamim) {
  hideAllAnswers();

  //$("#aiAnswer").text() = "רשימת המודלים הנמצאו מתאימים עבורך;";
  var numOfModels = 0;
  //בדיקה האם מודל תיווך מלא מתאים למקרה
  // $('#aiAnswer').html('רשימת המודלים הנמצאו מתאימים עבורך:<br/>');
  if (modelpedogogi == 1) {
    numOfModels++;
    $('#facetoface').css('display', 'block');

    $('#facetoface').show();
    toSendBtn();
  } else {
    if (modelpedogogi == 5) {
      $('#onlineblend').css('display', 'block');
      numOfModels++;
      console.log('1');
    } else {
      if (thanim > 1 && modelpedogogi > 2 && ramatoryanut > 1) {
        console.log('2');
        numOfModels++;
        $('#kvuzatImun').css('display', 'block');
        toSendBtn();
        numOfModels++;
      }
      if (
        thanim > 1 &&
        modelpedogogi == 2 &&
        ramatoryanut > 1 &&
        mashavimkaiamim > 1 &&
        eikef == 3
      ) {
        console.log('3');
        numOfModels++;
        $('#facetoface').css('display', 'block');
      } else if (thanim == 3) {
        console.log('4');
        numOfModels++;
        $('#kitaafuha').css('display', 'block');
        toSendBtn();
        numOfModels++;
      } else if (
        thanim > 1 &&
        modelpedogogi == 2 &&
        ramatoryanut > 1 &&
        mashavimkaiamim > 1 &&
        eikef > 1
      ) {
        console.log('5');
        numOfModels++;
        $('#kitaafuha').css('display', 'block');
        toSendBtn();
        numOfModels++;
      }
      if (ramatoryanut == 4) {
        console.log('6');
        numOfModels++;

        $('#facetoface').css('display', 'block');
        toSendBtn();
        numOfModels++;
      } else if (ramatoryanut == 1) {
        console.log('7');
        numOfModels++;

        $('#facetoface').css('display', 'block');
        toSendBtn();
        numOfModels++;
      }
    }
  }

  //if no model found
  if (numOfModels == 0) {
    $('#facetoface').css('display', 'block');
  }
  setTimeout(() => {
    window.location.replace('/#aiAnswer');
  }, 500);
}

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = 'block';
  } else {
    mybutton.style.display = 'none';
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

/*carusel script */
$('.carousel slide').carousel({
  interval: false,
});

$('.carousel').carousel('pause');

//check if all inputs filled

function checkIfAllField() {
  let notEmpty = true;
  for (i = 1; i < 6; i++) {
    if (parseInt($(`#inputGroupSelect0${i} option:selected`).val()) == 0) {
      notEmpty = false;
    }
  }
  if (notEmpty) {
    $('#sendBtn').attr('disabled', false);
  } else {
    $('#sendBtn').attr('disabled', true);
  }

  /*if (notEmpty) {
    $('sendBtn').attr('disabled', false);
  }*/
}
function toSendBtn() {
  setTimeout(() => {
    location.replace('/#sendBtn');
  }, 500);
}

/*Show the model disc */
function showDescription() {
  if ($('.description').css('display') == 'none') {
    $('#showDescBtn').text('סגור מידע נוסף');
    $('.description').css('display', 'block');
  } else {
    $('#showDescBtn').text('קרא/י עוד..');
    $('.description').css('display', 'none');
  }
}
