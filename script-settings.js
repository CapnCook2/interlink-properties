function displayAll() {
	$.when(d1, d2).then(function(){
		var all = "<pre>";
		all += "Rent<br>"+JSON.stringify(rentdata)+"<br>";
		all += "Sale<br>"+JSON.stringify(saledata)+"<br>";
		all +="</pre>";
		loadTable("output");
	});
}

var rentdata, saledata;
var d1,d2;
function getdata() {
	$.get('xhr.php?q=rent',function() {
	})
	.done(function(data) {
		rentdata =	JSON.parse(data);
		d1.resolve();
	})
	.fail(function() {
		rentdata = "failed to retrieve values.";
	});	
	$.get('xhr.php?q=sale',function() {
	})
	.done(function(data) {
		saledata = JSON.parse(data);
		d2.resolve();
	})
	.fail(function() {
		saledata = "failed to retrieve values.";
	});	
}


function clr() {
	if(confirm("Delete all data?")){
		if(confirm("Really delete all data? Everything will be gone.")){
			if(confirm("Are you really really sure?")){
				localStorage.data = "{}";
				alert("Everything deleted");
			}
		}
	}
}

function download() {
	text = JSON.stringify(rentdata);
	text += '\n';
	text += JSON.stringify(saledata);
    var el = document.createElement('a');
    el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    el.setAttribute('download', 'backup.txt');
    el.click();
}

function loadTable(outputDiv) {

	//rent tab
	var res = "<table class='table'>";
	if(Object.keys(rentdata).length!=0) {
		res+= "<tr>";
		for(x in rentdata[Object.keys(rentdata)[0]])
			res += "<th>"+x+"</th>";
		res +="</tr>";
	}
	var keys = Object.keys(rentdata);
	for(i in keys) {
		var keys2 = Object.keys(rentdata[keys[i]]);
		res += "<tr>";
		for(j in keys2) {
			//console.log("  j="+j);
				if(keys2[j] == 'added') {
					var d = new Date(Number(rentdata[keys[i]][keys2[j]]));
					res += "<td>"+d.toLocaleString()+"</td>";
				}
				else res += "<td>"+rentdata[keys[i]][keys2[j]]+"</td>";
			//res += "<td><button onclick='edit("+i+")'>Edit</button></td>";
		}
		res += "</tr>";
	}
	res += "</table>";
	$('#rent').html(res);


	//sale tab
	res = "<table class='table'>";
	if(Object.keys(saledata).length!=0) {
		res+= "<tr>";
		for(x in saledata[Object.keys(saledata)[0]])
			res += "<th>"+x+"</th>";
		res +="</tr>";
	}
	var keys = Object.keys(saledata);
	for(i in keys) {
		var keys2 = Object.keys(saledata[keys[i]]);
		res += "<tr>";
		for(j in keys2) {
			//console.log("  j="+j);
				if(keys2[j] == 'added') {
					var d = new Date(Number(saledata[keys[i]][keys2[j]]));
					res += "<td>"+d.toLocaleString()+"</td>";
				}
				else res += "<td>"+saledata[keys[i]][keys2[j]]+"</td>";
			//res += "<td><button onclick='edit("+i+")'>Edit</button></td>";
		}
		res += "</tr>";
	}
	res += "</table>";
	$('#sale').html(res);
}

function printSize() {
	$.when(d1, d2).then(function(){
		var length = JSON.stringify(rentdata).length + JSON.stringify(saledata).length;
		var size;
		if(length<1024)
			size = length.toFixed(3).toString()+' Bytes';
		else if(length>1024 && length<1024000)
			size = (length/1024).toFixed(3).toString()+' KB';
		else
			size = (length/10240000).toFixed(3).toString()+' MB';
		$("#size").html(size+'');
	});
};

$(function(){
	d1 = $.Deferred(), d2 = $.Deferred();
	getdata();
	$.when(d1, d2).then(function(){
		printSize();
		displayAll();
	});
});