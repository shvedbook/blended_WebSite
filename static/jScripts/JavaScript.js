



//counter for big json object
var jsoncounter = 0
//big json object
var data = 0;
$(document).ready(function () {
  


    var x = window.matchMedia("(max-width: 768px)")
    JSbysize(x) // Call listener function at run time
    x.addListener(JSbysize) // Attach listener function on state changes

    $("#navTrigger").click(function () {
        var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
    })
    $("#sendBtn").click(pullFromTB);
    //go to top btn

    //Get the button:
    mybutton = document.getElementById("goToTop");
    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () { scrollFunction() };

  
})
//הפעלת פונקציה בעזרת גודל מדיה
function JSbysize(x) {
    if (x.matches) { // If media query matches
        $("#h2Text").css("display", "inline");
    } else {
        $("#h2Text").css("display", "none");
    }
}
//pull data from textboxes to js variebles
function pullFromTB() {

    var thanim = parseInt($("#inputGroupSelect01 option:selected").val());
    var modelpedogogi = parseInt($("#inputGroupSelect02 option:selected").val());
    var eikef = parseInt($("#inputGroupSelect03 option:selected").val());
    var ramatoryanut = parseInt($("#inputGroupSelect04 option:selected").val());
    var mashavimkaiamim = parseInt($("#inputGroupSelect05 option:selected").val());

    
    dataValidation(thanim, modelpedogogi, eikef, ramatoryanut, mashavimkaiamim)
}

//function for data validation
function dataValidation(thanim, modelpedogogi, eikef, ramatoryanut, mashavimkaiamim){
    if (thanim != 0 && modelpedogogi != 0 && modelpedogogi != 0 && eikef != 0 && ramatoryanut != 0 && mashavimkaiamim != 0) {
        modelCalculation(thanim, modelpedogogi, eikef, ramatoryanut, mashavimkaiamim)
    }
    else {
        alert("you have to fill all the fields")
    }
}

//calculation of the model
function modelCalculation(thanim, modelpedogogi, eikef, ramatoryanut, mashavimkaiamim) {
    console.log("thanim = " + thanim + " modelpedogogi = " + modelpedogogi + " eikef = " + eikef + " ramatoryanut = " + ramatoryanut + " mashavimkaiamim = " + mashavimkaiamim)

    //$("#aiAnswer").text() = "רשימת המודלים הנמצאו מתאימים עבורך;";
    var numOfModels = 0;
    //בדיקה האם מודל תיווך מלא מתאים למקרה
    $("#aiAnswer").html("רשימת המודלים הנמצאו מתאימים עבורך:<br/>");
    if (modelpedogogi == 1) {
        numOfModels++;
        $("#aiAnswer").append("<div>מבין המודלים הקיימים רק מודל 'תיווך מלא' מתאים להנחייה צמודה</div>");
    }
    else {
        if ((thanim > 1) && (modelpedogogi > 2) && (ramatoryanut > 1)) {
            numOfModels++;
            $("#aiAnswer").append("<div>קבוצת אימון</div>");
        }
        if ((thanim > 1) && (modelpedogogi == 2) && (ramatoryanut > 1) && (mashavimkaiamim > 1) && (eikef == 3)) {
            numOfModels++;
            $("#aiAnswer").append("<div>חברותא</div>");
        }
        if (thanim == 3) {
            numOfModels++;
            $("#aiAnswer").append("<div>קבוצת קריאה - הוא המודל המוממלץ לקורסי העשרה</div>");
        }
        if ((thanim > 1) && (modelpedogogi == 2) && (ramatoryanut > 1) && (mashavimkaiamim > 1) && (eikef > 1)) {
            numOfModels++;
            $("#aiAnswer").append("<div>כיתה הפוכה</div>");
        }
        if (ramatoryanut == 1) {
            numOfModels++;
            $("#aiAnswer").append("<div>המודל המתאים ביותר ללומדים בעלי אוריינות נמוכה הוא 'תיווך מלא'</div>");
        }
    }
    

    //if no model found
    if (numOfModels == 0) {
        $("#aiAnswer").html("לא נמצאו תוצאות מתאימות עבורכם<br/>אתם מוזמנים לעיין ברשימת המודלים הקיימים")
    }
    
}

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//google api
var campus = new google.maps.LatLng(32.0936388, 34.8266105);
var hit = new google.maps.LatLng(32.0160976, 34.7752396);
var campusIcon = "images/campusIcon.png";
var hitIcon = "images/hit-icon.png";

function initialize() {
    var mapOptions = {
        center: campus,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("myGoogleMap"),
        mapOptions);

    var CAMPUS = new google.maps.Marker({ position: campus, animation: google.maps.Animation.BOUNCE, icon: campusIcon });
    CAMPUS.setMap(map);
    var philbox = new google.maps.Marker({ position: hit, animation: google.maps.Animation.DROP, icon: hitIcon });
    philbox.setMap(map);



    var infowindow = new google.maps.InfoWindow({ content: "קמפוס - מיזם הלמידה הדיגיטלית" });

    google.maps.event.addListener(CAMPUS, 'click', function () { infowindow.open(map, CAMPUS) })

    var infoWindow = new google.maps.InfoWindow({ content: "H.I.T. - המכון הטכנולוגי חולון" });

    google.maps.event.addListener(philbox, 'click', function () { infoWindow.open(map, philbox) })
}
google.maps.event.addDomListener(window, 'load', initialize);

