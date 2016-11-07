function displayAll() {
	var all = "<pre>";
	if(localStorage.data) all += "Rent<br>"+JSON.stringify(JSON.parse(localStorage.data),null,'\t')+"<br>";
	if(localStorage.sale) all += "Sale<br>"+JSON.stringify(JSON.parse(localStorage.sale),null,'\t')+"<br>";
	all +="</pre>";
	$("#output").html(all);
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

function download(filename, text) {
	text = JSON.stringify(JSON.parse(text),null,'\t');
    var el = document.createElement('a');
    el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    el.setAttribute('download', filename);
    el.click();
}

function loadTable(outputDiv) {
	var data = JSON.parse(localStorage.data);
	var res = "<table class='table'>";
	if(Object.keys(data).length!=0) {
		res+= "<tr><th>id</th>";
		for(x in data[Object.keys(data)[0]])
			res += "<th>"+x+"</th>";
		res +="</tr>";
	}
	var keys = Object.keys(data);
	for(i in keys) {
		var keys2 = Object.keys(data[keys[i]]);
		res += "<tr><td>"+keys[i]+"</td>";
		for(j in keys2) {
			//console.log("  j="+j);
				res += "<td>"+data[keys[i]][keys2[j]]+"</td>";
			//res += "<td><button onclick='edit("+i+")'>Edit</button></td>";
		}
		res += "</tr>";
	}
	res += "</table>";
	$('#'+outputDiv).html(res);
}

var localStorageSpace = function(){
    var allStrings = '';
    for(var key in window.localStorage){
        if(window.localStorage.hasOwnProperty(key)){
            allStrings += window.localStorage[key];
        }
    }
    return allStrings ? 3 + ((allStrings.length*16)/(8*1024)) + ' KB' : 'Empty (0 KB)';
};

$(function(){
	$("#size").html(localStorageSpace());
});