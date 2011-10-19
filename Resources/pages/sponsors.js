//get current window
Ti.include('/common.js');
var currentWin = Ti.UI.currentWindow;

var data=[];
var table = Titanium.UI.createTableView({
	data: data
});

//get data
var loader = Titanium.Network.createHTTPClient();
	loader.onerror = function(){ Ti.API.debug('ouch'); }
	loader.open('GET', APP.ui.sponsorUrl);
	loader.send();
	
	loader.onload = function(){
		//make data work
		var rt = JSON.parse(this.responseText);
		
		for(var i = 0; i < rt.length; i++) {
			//create table view row
			var row = Ti.UI.createTableViewRow();
			
			//create label for row
			var label = Ti.UI.createLabel({
				text: rt[i].title,
				font:{fontSize:16,fontWeight:'bold'},
				width:'auto',
				textAlign:'left',
				top:2,
				left:80
			});
			
			//create logo image
			var logo =  Titanium.UI.createImageView({
				image: '/images/sponsor_logos/'+rt[i].image,
				width:64,
				left:5
			});
			
			//set row details
			row.refTitle = rt[i].title;
			row.companyInfo = rt[i].info;
			row.hasDetail = true;
			row.height = 70;
			
			//add label and logo to row
			row.add(label);
			row.add(logo);
			
			//add row to table
			data.push(row)
			
		}
		
		
		//add event listener to rows, to bring up sponsor info.
		table.addEventListener('click',function(e){
			var info = e.rowData.companyInfo;
			var title = e.rowData.refTitle;
			var w = Ti.UI.createWindow({
				title:title,
				backgroundColor: '#FFFFFF',
				barColor: APP.ui.barColor
			});
			
			var label_info = Ti.UI.createLabel({
				text: info,
				left: 5,
				right: 5,
				top: 5,
				height: 'auto',
				width: 'auto'
			});
			
			var b = Titanium.UI.createButton({
                title:'Close',
                style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
            });
            w.setLeftNavButton(b);
			w.add(label_info);
			w.open({modal:true});
			
			b.addEventListener('click',function()
            {
                w.close();
            });
		})
		
		//refresh data in the table;
		table.setData(data);
	}
//add table to current window
currentWin.add(table);
