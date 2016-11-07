$(function() {
	var rentchecks = ["bachelors","job","business","family","new","rooms","kitchen"];
	var salechecks = ["corner","new"];
	if(getUrlParameter('rentid')){
		var id = getUrlParameter('rentid');
		$.get('xhr.php?q=rent-single&id='+id,function(){
		})
		.done(function(data) {
			data = JSON.parse(data);
			data = data[0];
			//console.log(data);
			$.each($("#add-form .field"),function(i,val){
				//console.log($(this).attr("name")+": "+data[$(this).attr("name")])
				$(this).val(data[$(this).attr("name")]);
			});
			$.each($("#add-form [type=checkbox]"),function(i,val){
				//console.log($(this).attr("name")+": "+(data[$(this).attr("name")]));
				$(this).prop("checked",(data[$(this).attr("name")]=='1'?true:false));
			});
		});
	}

	if(getUrlParameter('saleid')){
		//	//console.log("saleid");
		$(".nav-tabs a[href='#sale']").tab('show');
		var id = getUrlParameter('saleid');
		$.get('xhr.php?q=sale-single&id='+id,function(){
		})
		.done(function(data) {
			//console.log(data);
			data = JSON.parse(data);
			data = data[0];
			$.each($("#sale-form .field"),function(i,val){
				//console.log($(this).attr("name")+": "+data[$(this).attr("name")])
				$(this).val(data[$(this).attr("name")]);
			});
			$.each($("#sale-form [type=checkbox]"),function(i,val){
				//console.log($(this).attr("name")+": "+(data[$(this).attr("name")]));
				$(this).prop("checked",(data[$(this).attr("name")]=='1'?true:false));
			});
		});
	}

	$('#add-form').submit(function(event){
		event.preventDefault();

		var entry = {added: new Date().getTime()};
		$("#add-form").serializeArray().map(function(x){
			if(rentchecks.indexOf(x.name)>=0)
				entry[x.name] = "1";
			else
				entry[x.name] = x.value;
		});
		$.each(rentchecks,function(i) {
			//console.log(rentchecks[i]);
			if(!entry[rentchecks[i]])
				entry[rentchecks[i]] = "0";
		});
		//console.log(entry);

		//console.log(getUrlParameter('id'));
		if(getUrlParameter('rentid')) {
			delete entry['added'];
			$('#sending-notif').slideDown(100);
			$.post("xhr.php?q=edit-rent",{id:getUrlParameter('rentid'), data: entry} ,function() {
			})
			.done(function(data) {
				console.log(data);
				if(data.indexOf("Error")>-1) {
					$('#sending-notif').slideUp(100,function() {
						$('#error-notif').slideDown(100).delay(3000).slideUp(100);
					});
				} else {
					$('#add-form').trigger('reset');
					$(window).scrollTop(0);
					$('#sending-notif').slideUp(100,function() {
						$('#success-notif').slideDown(100).delay(500).slideUp(100);
					});
					window.close();
				}
				
			})
			.fail(function() {
				$('#sending-notif').slideUp(100,function() {
					$('#error-notif').slideDown(100).delay(3000).slideUp(100);
				});
			});
		}
		else {
			$('#sending-notif').slideDown(100);
			$.post("xhr.php?q=add-rent",{ data: entry} ,function() {
			})
			.done(function(data) {
				//console.log(data);
				if(data.indexOf("Error")>-1) {
					$('#sending-notif').slideUp(100,function() {
						$('#error-notif').slideDown(100).delay(3000).slideUp(100);
					});
				} else {
					$('#add-form').trigger('reset');
					$(window).scrollTop(0);
					$('#sending-notif').slideUp(100,function() {
						$('#success-notif').slideDown(100).delay(500).slideUp(100);
					});
					if(getUrlParameter('rentid')) window.close();
				}
				
			})
			.fail(function() {
				$('#sending-notif').slideUp(100,function() {
					$('#error-notif').slideDown(100).delay(3000).slideUp(100);
				});
			});
		}

	});

	$('#sale-form').submit(function(event){
		event.preventDefault();
		
		var entry = {added: new Date().getTime()};
		$("#sale-form").serializeArray().map(function(x){
			if(salechecks.indexOf(x.name)>=0)
				entry[x.name] = "1";
			else
				entry[x.name] = x.value;
		});
		$.each(salechecks,function(i) {
			//console.log(salechecks[i]);
			if(!entry[salechecks[i]])
				entry[salechecks[i]] = "0";
		});
		if(getUrlParameter('saleid')) {
			delete entry['added'];
			$('#sending-notif').slideDown(100);
			$.post("xhr.php?q=edit-sale",{id:getUrlParameter('saleid'), data: entry} ,function() {
			})
			.done(function(data) {
				//console.log(data);
				if(data.indexOf("Error")>-1) {
					$('#sending-notif').slideUp(100,function() {
						$('#error-notif').slideDown(100).delay(3000).slideUp(100);
					});
				} else {
					$('#add-form').trigger('reset');
					$(window).scrollTop(0);
					$('#sending-notif').slideUp(100,function() {
						$('#success-notif').slideDown(100).delay(500).slideUp(100);
					});
					window.close();
				}
				
			})
			.fail(function() {
				$('#sending-notif').slideUp(100,function() {
					$('#error-notif').slideDown(100).delay(3000).slideUp(100);
				});
			});
		}
		else {
			$('#sending-notif').slideDown(100);
			$.post("xhr.php?q=add-sale",{ data: entry} ,function() {
			})
			.done(function(data) {
				//console.log(data);
				if(data.indexOf("Error")>-1) {
					$('#sending-notif').slideUp(100,function() {
						$('#error-notif').slideDown(100).delay(3000).slideUp(100);
					});
				} else {
					$('#sale-form').trigger('reset');
					$(window).scrollTop(0);
					$('#sending-notif').slideUp(100,function() {
						$('#success-notif').slideDown(100).delay(500).slideUp(100);
					});
				}
				
			})
			.fail(function() {
				$('#sending-notif').slideUp(100,function() {
					$('#error-notif').slideDown(100).delay(3000).slideUp(100);
				});
			});
		}

	});

});


function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
