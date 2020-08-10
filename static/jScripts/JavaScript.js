//counter for big json object
var jsoncounter = 0;
//big json object
var data = 0;
$(document).ready(function () {
  //check if all fields filled
  $(document).change(function () {
    checkIfAllField();
  });
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

  dataValidation(thanim, modelpedogogi, eikef, ramatoryanut, mashavimkaiamim);
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
    $('#aiAnswer').html("<div>מבין המודלים הקיימים רק מודל 'תיווך מלא' מתאים להנחייה צמודה</div>");
    $('#facetoface').css('display', 'block');

    $('#facetoface').show();
    toSendBtn();
  } else {
    if (thanim > 1 && modelpedogogi > 2 && ramatoryanut > 1) {
      numOfModels++;
      $('#kvuzatImun').css('display', 'block');
      toSendBtn();
    }
    if (thanim > 1 && modelpedogogi == 2 && ramatoryanut > 1 && mashavimkaiamim > 1 && eikef == 3) {
      numOfModels++;
      $('#facetoface').css('display', 'block');
    }
    if (thanim == 3) {
      numOfModels++;
      $('#kitaafuha').css('display', 'block');
      toSendBtn();
    }
    if (thanim > 1 && modelpedogogi == 2 && ramatoryanut > 1 && mashavimkaiamim > 1 && eikef > 1) {
      numOfModels++;
      $('#kitaafuha').css('display', 'block');
      toSendBtn();
    }
    if (ramatoryanut == 1) {
      numOfModels++;
      $('#aiAnswer').html(
        "<div>המודל המתאים ביותר ללומדים בעלי אוריינות נמוכה הוא 'תיווך מלא'</div>"
      );

      $('#facetoface').css('display', 'block');
      toSendBtn();
    }
  }

  //if no model found
  if (numOfModels == 0) {
    $('#blendedAnsNone').css('display', 'block');
  }
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
