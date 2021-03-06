function initialize() {
    var a = {
        zoom: 4
    };
    
    map = new google.maps.Map(document.getElementById("map-canvas"), a), navigator.geolocation ? navigator.geolocation.getCurrentPosition(function(a) {
        pos = new google.maps.LatLng(a.coords.latitude, a.coords.longitude), map.panTo(pos), map.setCenter(pos), window.setTimeout(placeMarker, 2000);
    }, function() {
        handleNoGeolocation(!0)
    }) : handleNoGeolocation(!1), $.getJSON("js/myPlace.json", function(a) {
        $.each(a, function(a, b) {
            oldPos.push(new google.maps.LatLng(b.lat, b.lon)), currentCity.push(b.country + " " + b.regionName + " " + b.city)
        })
    })
}

function placeMarker() {
    for (var c = 0; c < oldPos.length; c++) initMarker(c,c*200);
    initOtherEvent()
}

function initMarker(a,i) {
   window.setTimeout(function() {
        marker.push(new google.maps.Marker({
            position: oldPos[a],
            map: map,
            animation:google.maps.Animation.DROP
        }));
        addMarkerEvent(a);
   }, i);
}

function handleNoGeolocation(a) {
    if (a) var b = "Error: The Geolocation service failed";
    else var b = "Error: Your browser doesn't support geolocation.";
    var c = {
        map: map,
        position: new google.maps.LatLng(60, 105),
        content: b
    };
    new google.maps.InfoWindow(c);
    map.setCenter(c.position)
}

function addMarkerEvent(a) {
    google.maps.event.addListener(marker[a], "click", function(b) {
        $contents = $("html").find(".contents"), $ul = $("html").find(".content ul"), $.getJSON("js/description.json", function(b) {
            console.log(b[a].imgSrc), $ul.html('<li><h2><span class="cityName">' + currentCity[a] + '</span></h2><h2><span class="descript">' + b[a].description + '</span></h2><div class="picture picture' + a + '"><img src=' + b[a].imgSrc + "></div><li>")
        }), t.to($contents, .5, {
            autoAlpha: 1
        })
    })
}

function initOtherEvent() {
    $close.on("click", function() {
        return t.to($contents, .5, {
            autoAlpha: 0
        }), !1
    })
}
var map, pos, oldPos = [],
    currentCity = [],
    infowindow, marker = [],
    positionArray = [],
    $contents, $content, $close = $(".close"),
    currentCity, t = TweenMax;
google.maps.event.addDomListener(window, "load", initialize);