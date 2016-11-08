var filters = {};

function currency(x) {
	try{
		var res = "";
		//console.log(x);
		if(x%100000 == 0 && Math.floor(x/100000)) {
			if(Math.floor(x/10000000) != 0) {
				//console.log(Math.floor(x/10000000) + "");
				res += Math.floor(x/10000000) + "";
				res += " Cr ";
				x = x%10000000;
			}
			//console.log(res);
			if(Math.floor(x/100000) != 0){
				res += Math.floor(x/100000);
				res += " L";
			}
			//console.log(res);
			return res;
		} else {
			x=x.toString();
			//console.log(x);
			var lastThree = x.substring(x.length-3);
			if(lastThree == "000")
			var otherNumbers = x.substring(0,x.length-3);
			if(otherNumbers != '')
			    lastThree = ',' + lastThree;
			res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
			return res;
		}
	}
	catch(e) {
		//console.log(e);
		return x;
	}
}

function filter(data) {
	if(filters.name && data.name.toLowerCase().indexOf(filters.name.toLowerCase())<0)
		return false;
	if(filters.minPrice && Number(filters.minPrice)>Number(data.demand))
		return false;
	if(filters.maxPrice && Number(filters.maxPrice)<Number(data.demand))
		return false;
	if(filters.bhk && (filters.bhk != "Any" && data.bhk != filters.bhk))
		return false;
	if(filters.type && (filters.type != "Any" && data.type != filters.type))
		return false;
	if(filters.area && (isNaN(Number(filters.area)) || data.unit!="sq.yd." || Number(data.area)<Number(filters.area) || Number(data.area)>(Number(filters.area)+100)))
		return false;
	if(filters.address && data.address.toLowerCase().indexOf(filters.address.toLowerCase())<0)
		return false;
	if(filters.sector && (data.sector != filters.sector))
		return false;
	if(filters.facing && (filters.facing != "Any" && data.facing != filters.facing))
		return false;
	if(filters.dealer && data.dealer.toLowerCase().indexOf(filters.dealer.toLowerCase())<0)
		return false;
	if(filters.corner && data.corner!="1")
		return false;
	if(filters.new && data.new!="1")
		return false;
	return true;
}
var saledata = "{}";
var pagePosition = 0;
var d1 = $.Deferred();
function getdata() {
	$('#entries').html("<center><img src='spinner.gif'></center>");
	$.get('xhr.php?q=sale',function() {
	})
	.done(function(data) {
		//console.log(data);
		saledata = data;
		loadList("entries");
		d1.resolve();
	})
	.fail(function() {
		$('#entries').html("<center>Unable to retrieve data.</center>");
	});
}

function loadList(div) {
	var box="";
	var data = JSON.parse(saledata);
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
			if(row.bhk!= "") box += "<div class='box-small' data-id='bhk'> "+row.bhk+" </div>";
			if(row.type!= "") box += "<div class='box-small' data-id='type'> "+row.type+" </div>";
			if(row.phone!= "") box += "<div class='box-small' data-id='phone'> <img src='images/phone.png'> <a href='tel:"+row.phone+"'> "+row.phone+"</a></div>";
			if(row.demand!= "") box += "<div class='box-small' data-id='demand'> Demand: <img src='images/rupee.png'>"+currency(row.demand)+" </div>";
			if(row.offer!= "") box += "<div class='box-small' data-id='offer'>Offer: <img src='images/rupee.png'>"+currency(row.offer)+" </div>";
			if(row.area!= "") box += "<div class='box-small' data-id='offer'> <img src='images/area.png'> "+currency(row.area)+" "+row.unit+" </div>";
			if(row.dealer!= "") box += "<div class='box-small' data-id='dealer'> "+row.dealer+" </div>";
			if(row.facing!= "") box += "<div class='box-small' data-id='facing'> "+row.facing+" facing </div>";
				if(row.new !="0") box +="<div class='box-small' data-id='new'> <img src='images/new.png' title='Newly Built'> </div>";
			if(row.corner == "1") box += "<div class='box-small' data-id='facing'>  Corner </div>";

			box += "<div class='btn btn-info box-small' onclick='edit("+row.id+")'>Edit</div>";
			box += "<div class='btn btn-danger box-small delButton'>x</div></div>";
		}
	}
	if(displayed == 0) box="<div class='col-sm-12 box'><center>No Results</center></div>";
	//console.log(box);
	$('#'+div).html(box);
	$('.delButton').on("click",del);
}

function reload() {
	pagePosition = $(window).scrollTop();
	d1= $.Deferred();
	getdata();
	$.when(d1).then(function(){
		$(window).scrollTop(pagePosition);
	});
}

function edit(id) {
	window.open('add.html?saleid='+id,'_blank');
}

function del(){
	//console.log($(this).parent());
	var id = $(this).parent().attr('id');
	var name = $(this).parent().find('[data-id=name]').html();
	var bhk = $(this).parent().find('[data-id=bhk]').html();
	var type = $(this).parent().find('[data-id=type]').html();
	if(confirm("Delete "+name+"'s "+bhk+" "+type+"?")) {
		$("#"+id).addClass("redBorder");
		$.get('xhr.php?q=sale-delete&id='+id,function(){
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