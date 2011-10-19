Ti.include('/common.js');
var currentWin = Ti.UI.currentWindow;
//create and open DB
var db = Ti.Database.open('myConfDB');
//db.remove();
//db.execute('CREATE  TABLE IF NOT EXISTS "main"."schedule" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE , "title" VARCHAR, "presenter" VARCHAR, "section" VARCHAR, "time" TEXT, "info" TEXT)');
db.execute('CREATE TABLE IF NOT EXISTS "schedule" ("id" INTEGER PRIMARY KEY  NOT NULL  UNIQUE , "title" VARCHAR, "presenter" VARCHAR, "section" INTEGER, "text" TEXT, "time" VARCHAR)')	   
		   
var data=[];
var table = Titanium.UI.createTableView({
	data: data
});

	var loader = Titanium.Network.createHTTPClient();
	loader.onerror = function(){ Ti.API.debug('ouch'); }
	loader.open('GET', APP.ui.programUrl);
	loader.send();
	
	loader.onload = function(){

		var data3 = JSON.parse(this.responseText);

		for (var i = 0; i < data3.length; i++){
			var section = Titanium.UI.createTableViewSection();
			section.headerTitle = data3[i].time;
			section.sectionID = 'sec'+ i;
			for(var j = 0; j < data3[i].sessions.length; j++) {
				var row = Titanium.UI.createTableViewRow();
				var label = Ti.UI.createLabel({
					text: data3[i].sessions[j].title +' '+ i +''+j,
					font:{fontSize:16,fontWeight:'bold'},
					width:'auto',
					textAlign:'left',
					top:2,
					left:5,
					height:20,
					
				});
				row.rowId =  ''+i+''+j;
				row.hasDetail = true;
				row.sessionTitle = data3[i].sessions[j].title +' '+ i +''+j;
				row.sessionPresenter = data3[i].sessions[j].presenter;
				row.sessionTime = data3[i].time;
				row.add(label);
				section.add(row);
				
			}
			
			
			
			
			data[i] = section;
		};
		
		table.addEventListener('click', function(e)  
		{  
		   
		    var rowID =  e.rowData.rowId;
			var sectionId = e.section.sectionID;
			var sessionInfo = "bla bla bla";
			var sessionPresenter = e.rowData.sessionPresenter;
			var sessionTitle = e.rowData.sessionTitle;
			var sessionTime = e.rowData.sessionTime;
			
			
			
			var w = Ti.UI.createWindow({
				title:rowID,
				backgroundColor: '#FFFFFF',
				barColor: APP.ui.barColor
			});
			
			//find out if session is alreadr in myConf DB
			
			var resRow = db.execute('SELECT id FROM schedule WHERE id=' + rowID);
			var labelText = resRow.isValidRow() ? 'Remove from MyConf Schedule':'Add to MyConf Schedule'
			var deleteRow = resRow.isValidRow() ? true : false;
			
			//Ti.API.log(resRow.fieldByName('id'))
			var myConfButton = Titanium.UI.createButton({
                title: labelText,
                color: '#000000',
                width: 218,
                height: 40,
                font:{fontSize:13,fontWeight: 'bold'},
                delRow: deleteRow
            });
            
            var closeButton = Titanium.UI.createButton({
                title:'Close',
                style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
            });
            w.setLeftNavButton(closeButton);
         
            w.add(myConfButton);
            w.open({modal:true});
			
			myConfButton.addEventListener('click',function()
            {
                var sql,alertText;
                if(deleteRow) {
                	db.execute('DELETE FROM schedule WHERE id=?',rowID);
                	alertText =	sessionTitle+' has been removed from myConf Schedule';
                } else {
                	db.execute('INSERT OR IGNORE INTO schedule (id,title,presenter,section,text,time) VALUES (?,?,?,?,?,?)',rowID,sessionTitle,sessionPresenter,sectionId,sessionInfo,sessionTime);
                	alertText =	sessionTitle+' has been added to myConf Schedule';
                }
                
                
            	alert(alertText);
            	w.close();
            	
            	
            });
            
            closeButton.addEventListener('click',function()
            {
                w.close();
            });
		});  
		
		
		table.setData(data);
		currentWin.add(table);
	};