Aria.tplScriptDefinition({
    $classpath : "app.templates.home.HomeLayoutScript",
	$constructor: function(){
		
	},    
	$prototype : {
		$displayReady: function(){
		},
		getDetails: function(){
			var url = "http://1.glassy-song-375.appspot.com/GetTopEvents?date=FutureDate&page_size=100&keywords=(Festivals%20||%20Holiday)&sort_order=popularity&sort_order=ascending&max_cities=5&lat=12.9667&lng=77.5667&max_events=10";
			//pageEngine.navigate({"pageId":"DETAILS"});
			  $.ajax({
			  	type: 'GET',
			  	url:url,
			  	crossDomain: true,
			  	contentType: "jsonp",
			  	dataType: 'jsonp',
			  	success:"_eventsCallback"
			  });
		},
		_eventsCallback: function(data){
			console.log(data);
		}
	}
})