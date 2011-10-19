// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
Ti.include('common.js');
// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var program = Titanium.UI.createWindow({  
    title:'Conference Program',
    backgroundColor:'#2cafe3',
    url: '/pages/program.js',
    barColor: APP.ui.barColor
});
var programTab = Titanium.UI.createTab({  
    icon:'/images/icons/cal.png',
    backgroundColor: APP.ui.barColor,
    title:'Program',
    window:program
});



//
// create controls tab and root window
//

var myConf = Titanium.UI.createWindow({  
    title:'My Conference Schedule',
    backgroundColor:'#fff',
    url: '/pages/myConf.js',
    barColor: APP.ui.barColor
});
var myConfTab = Titanium.UI.createTab({  
    icon:'/images/icons/myConf.png',
    title:'MyConf',
    backgroundColor: APP.ui.barColor,
    window:myConf
});

var sponsorWin = Titanium.UI.createWindow({  
    title:'Our Sponsors',
    backgroundColor:'#fff',
    url: '/pages/sponsors.js',
    barColor: APP.ui.barColor
});
var sponsorTab = Titanium.UI.createTab({  
    icon:'/images/icons/sponsor.png',
    title:'Sponsors',
    window:sponsorWin
});

var mapWin = Titanium.UI.createWindow({  
    title:'Conference Map',
    backgroundColor:'#fff',
    url: '/pages/map.js',
    barColor: APP.ui.barColor
});
var mapTab = Titanium.UI.createTab({  
    icon:'/images/icons/map.png',
    title:'Map',
    window:mapWin
});

// var label2 = Titanium.UI.createLabel({
	// color:'#999',
	// text:'I am Window 2',
	// font:{fontSize:20,fontFamily:'Helvetica Neue'},
	// textAlign:'center',
	// width:'auto'
// });

//win2.add(label2);



//
//  add tabs
//
tabGroup.addTab(programTab);  
tabGroup.addTab(myConfTab); 
tabGroup.addTab(sponsorTab); 
tabGroup.addTab(mapTab);  


// open tab group
tabGroup.open();
