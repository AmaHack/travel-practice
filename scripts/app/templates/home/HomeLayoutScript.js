Aria.tplScriptDefinition({
    $classpath : "app.templates.home.HomeLayoutScript",
	$constructor: function(){
		
	},    
	$prototype : {
		$displayReady: function(){
		},
		getDetails: function(){{
			 
			 alert("getDetails clicke");
						 
			var url = "http://1.glassy-song-375.appspot.com/GetTopEvents?date=FutureDate&page_size=100&keywords=(Festivals%20||%20Holiday)&sort_order=popularity&sort_order=ascending&max_cities=5&lat=12.9667&lng=77.5667&max_events=10";
			/*//pageEngine.navigate({"pageId":"DETAILS"});
			  $.ajax({
			  	type: 'GET',
			  	url:url,
			  	crossDomain: true,
			  	success:"_eventsCallback"
			  });*/

		  	/*var oArgs = {
            	app_key:"qxsrCN2tPvNF3kVk",
            	id: "20218701",
           	 	q: "(Festivals || Holiday)",
      			max_cities:5,
      			"date": "FutureDate",
      			page_size: 100,
      			sort_order: "popularity",
      			sort_order: "ascending",
        	};

        	//console.log(EVDB);return;
		  	EVDB.API.call("/events/get", oArgs, function(oData) {

		  		console.log(oData);

		      	// Note: this relies on the custom toString() methods below

		    });*/

			$.ajax({
				   url: url,
				   cache: false,
				   type: "POST",
				   processData: false,
				   crossDomain:"true",
				   complete: function (responseData, textStatus, jqXHR)
				   {
				   if(textStatus == "success")
				   {
				   alert("CALL SUCCESS");
				   alert(JSON.stringify(responseData));

				   }
				   else
				   {
				   alert("FAILED IF");
				   }
				   },
					error: function (responseData, textStatus, errorThrown)
					   {
						console.log('POST failed.');
					   alert("FAILEDS API CALL");
					}
			});
		}},
		_eventsCallback: function(data){
			console.log(data);
		}
	}
})