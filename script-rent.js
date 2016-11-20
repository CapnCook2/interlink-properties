var filters = {bachelors:true,job:true,business:true};

function currency(x) {
	x=x.toString();
	var lastThree = x.substring(x.length-3);
	var otherNumbers = x.substring(0,x.length-3);
	if(otherNumbers != '')
	    lastThree = ',' + lastThree;
	var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
	return res;
}

function filter(data) {
	if(filters.name && data.name.toLowerCase().indexOf(filters.name.toLowerCase())<=-1)
		return false;
	if(filters.minRent && Number(filters.minRent)>Number(data.rent))
		return false;
	if(filters.maxRent && Number(filters.maxRent)<Number(data.rent))
		return false;
	if(filters.area && (isNaN(Number(filters.area)) || data.unit!="sq.yd." || Number(data.area)<Number(filters.area) || Number(data.area)>(Number(filters.area)+100)))
		return false;
	if(filters.bhk && (filters.bhk != "Any" && data.bhk != filters.bhk))
		return false;
	if(filters.address && data.address.toLowerCase().indexOf(filters.address.toLowerCase())<=-1)
		return false;
	if(filters.sector && (data.sector != filters.sector))
		return false;
	if(filters.type && (filters.type != "Any" && data.type != filters.type))
		return false;
	if(!((filters.bachelors && data.bachelors=="1") || (filters.job && data.job=="1") || (filters.business && data.business=="1") || (filters.family && data.family=="1")))
		return false;
	if(filters.rooms && data.rooms!="1")
		return false;
	if(filters.kitchen && data.kitchen!="1")
		return false;
	if(filters.new && data.new!="1")
		return false;
	return true;
}

var rentdata = "{}";
var pagePosition = 0;
var d1 = $.Deferred();
function getdata() {
	pagePosition = $(window).scrollTop();
	$('.loader').fadeIn(200);
	$.get('xhr.php?q=rent',function() {
	})
	.done(function(data) {
		rentdata = data;
		loadList("entries");
		d1.resolve();
		$('.loader').fadeOut(200);
	})
	.fail(function() {
		$('.loader').fadeOut(200);
		$('#entries').html("<center>Unable to retrieve data.</center>");
	});	
}

function loadList(div) {
	var box="";
	//console.log("server sent: "+rentdata);
	try {
		var data = JSON.parse(rentdata);
		var displayed = 0;
		for(var i=data.length-1;i>=0;i--) {
			var row = data[i];
			//console.log(row);
			if(filter(row)){
				displayed++;
				var date = new Date(Number(row.added));
				box += "<div class='col-sm-12 box' id='"+row.id+"''><p class='text-left'>"+ date.toLocaleString()+"</p>";
				if(row.address!= "") box += "<div class='box-small' data-id='address'><img src='images/address.png'>&nbsp;"+row.address+", Sec-"+row.sector+" </div>";
				if(row.name!= "") box += "<div class='box-small'><img src='images/name.png'>&nbsp;<span data-id='name'>"+row.name+"</span> </div>";
				if(row.bhk!= "") box += "<div class='box-small' data-id='bhk'>"+row.bhk+" </div>";
				if(row.type!= "") box += "<div class='box-small' data-id='type'>"+row.type+" </div>";
				if(row.area!= "") box += "<div class='box-small' data-id='type'><img src='images/area.png'>&nbsp;"+currency(row.area)+" "+row.unit +" </div>";
				if(row.phone!= "") box += "<div class='box-small' data-id='phone'><img src='images/phone.png'><a href='tel:"+row.phone+"'> "+row.phone+"</a></div>";
				if(row.rent!= "") box += "<div class='box-small' data-id='rent'><img src='images/rupee.png'>&nbsp;"+currency(row.rent)+" </div>";
				//console.log(row.bachelors+row.job+row.business);
				if(row.bachelors !="0") box += "<div class='box-small' data-id='bachelors'> "+"bachelors"+" </div>";
				if(row.job !="0") box +="<div class='box-small' data-id='job'> "+"job"+" </div>";
				if(row.business !="0") box +="<div class='box-small' data-id='business'> "+"business"+" </div>";
				if(row.family !="0") box +="<div class='box-small' data-id='family'> "+"Family"+" </div>";
				if(row.new !="0") box +="<div class='box-small' data-id='new'> <img src='images/new.png' title='Newly Built'> </div>";
				if(row.kitchen !="0" || row.rooms !="0") {
					var woodwork = "<img src='images/wood.png'>&nbsp;";
					if(row.kitchen !="0") woodwork += "Kitchen";
					if(row.kitchen !="0" && row.rooms !="0") woodwork +=", ";
					if(row.rooms !="0") woodwork += "Rooms";
					box += "<div class='box-small' data-id='woodwork'>"+woodwork+"</div>";
				}

				box += "<div class='btn btn-info box-small' onclick='edit("+row.id+")'>Edit</div>";
				box += "<div class='btn btn-danger box-small delButton'>x</div></div>";
			}
		}
		if(displayed == 0) box="<div class='box'><center>No Results</center></div>";
		//console.log(box);
		$('#'+div).html(box);
		$('.delButton').on("click",del);
	}
	catch(e) {
		$('#'+div).html(rentdata);
	}
}

function reload() {
	pagePosition = $(window).scrollTop();
	d1 = $.Deferred();
	getdata();
	$.when(d1).then(function(){
		$(window).scrollTop(pagePosition);
	});
}

function edit(id) {
	window.open('add.html?rentid='+id,'_blank');
}

function del(){
	//console.log($(this).parent());
	var id = $(this).parent().attr('id');
	var name = $(this).parent().find('[data-id=name]').html();
	var bhk = $(this).parent().find('[data-id=bhk]').html();
	var type = $(this).parent().find('[data-id=type]').html();
	if(confirm("Delete "+name+"'s "+bhk+" "+type+"?")) {
		$("#"+id).addClass("redBorder");
		$.get('xhr.php?q=rent-delete&id='+id,function(){
			//console.log("delete query sent");
		})
		.done(function(data){
			//console.log("delete done: "+data);
			$("#"+id).hide(500,function(){
				pagePosition = $(window).scrollTop();
				d1 = $.Deferred();
				getdata();
				$.when(d1).then(function(){
					$(window).scrollTop(pagePosition);
				});
			});
		});
	}
}

function filterclr() {
	$("#filterForm").trigger('reset');
	filters = {bachelors:true,job:true,business:true};
	loadList("entries");
}

$(function(){

	getdata();

	$('.filter').on("keyup",function(){
		if($(this).val()=="")
			delete filters[$(this).attr('name')];
		else
			filters[$(this).attr('name')] = $(this).val();
		loadList("entries");
	});
	$('.filter').on("change",function(){
		if($(this).val()=="")
			delete filters[$(this).attr('name')];
		else
			filters[$(this).attr('name')] = $(this).val();
		loadList("entries");
	});

	$('.filter-check').on("click",function(){
			filters[$(this).attr('name')] = $(this).prop('checked');
			loadList("entries");
	});

	$("#filterForm").submit( function(event) {
		event.preventDefault();
	});

});