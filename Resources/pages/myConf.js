var currentWin = Ti.UI.currentWindow;

var myConftable = Ti.UI.createTableView();

//open db
function getSchedule() {
	var myData = [];
	var db = Ti.Database.open('myConfDB');
	
	r = db.execute('SELECT * FROM schedule');
	while (r.isValidRow())
	{
	  var row = Ti.UI.createTableViewRow();
	  var rowLabel = Ti.UI.createLabel({
	  	text: r.fieldByName('title'),
	  	top: -15,
	  	left: 5,
	  	color: '#000000'
	  });
	  
	  var timeLabel = Ti.UI.createLabel({
	  	text: r.fieldByName('time'),
	  	top: 20,
	  	left: 5,
	  	font: {fontSize: 10}
	  });
	  
	  row.add(rowLabel);
	  row.add(timeLabel);
	  
	  myData.push(row);
	  
	  r.next();
	}
 //return myData;
 myConftable.setData(myData);
 r.close();
 db.close();
}

currentWin.addEventListener('focus', function() { getSchedule(); });

currentWin.add(myConftable);
