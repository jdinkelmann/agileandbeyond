//get common scripts
Ti.include('/common.js');

var currentWin = Ti.UI.currentWindow;


// var mapview = Titanium.Map.createView({
    // mapType: Titanium.Map.STANDARD_TYPE,
    // region:{latitude:42.3020395, longitude:-83.2313919, latitudeDelta:0.005, longitudeDelta:0.005},
    // animate:true,
    // regionFit:true,
    // userLocation:true
// });

var map = Ti.UI.createWebView();
var img =  Titanium.UI.createImageView({
				image: '/images/map/CEC.png',
				width: '100%',
				height: 'auto'
			});
map.add(img);
currentWin.add(map);
