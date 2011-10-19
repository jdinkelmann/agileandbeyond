//Hellper methods

var APP = {};

APP.ui = {}; //create a UI namespace within your app

APP.ui.barColor = '#3399cc';
APP.ui.sponsorUrl = "http://www.agileandbeyond.org/helpers/sponsors.json";
APP.ui.programUrl = "http://www.agileandbeyond.org/helpers/schedule.json";

APP.ui.createHeaderView = function(/*Object*/ _args) {
    var v = Ti.UI.createView({
        backgroundColor:_args.bgColor||'red',
        height:80
    });
    v.add(Ti.UI.createLabel({
        text:_args.title||'My Cool App'
    }));
    return v;
};

APP.ui.createNewLabel = function(_args) {
	
	var label = Titanium.UI.createLabel({
		color:_args.color||'#999',
		text:_args.title||'some label',
		font:{fontSize:_args.fontSize||20,fontFamily:_args.fontFamily||'Helvetica Neue'},
		textAlign:'center',
		width:_args.width||'auto'
	});
	
	return label;
}

APP.ui.createWindowObject = function(_args) {
	Titanium.UI.createWindow({  
	    title: _args.title || 'My Conference Schedule',
	    backgroundColor:'#fff',
	    barColor: '#2cafe3'
	});
}

function parseResponse(obj)
{
    //Ti.API.info(JSON.parse(obj)); 
    Ti.API.info("length:    " + obj.sessionBlock.length);
 
    //lastRow = obj.DATA.length;
 
}
