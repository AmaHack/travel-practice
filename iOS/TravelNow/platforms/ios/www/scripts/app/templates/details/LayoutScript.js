Aria.tplScriptDefinition({
    $classpath : "app.templates.details.LayoutScript",
	$constructor: function(){
		var myScroll;
	},    
	$prototype : {

        $displayReady: function(){
        	console.log(this.data);
			myScroll = new iScroll('wrapper');
			this.initialize();
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
			document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
		},
		initialize : function () {
			 var myLatlng = new google.maps.LatLng(25.363882,120.044922);
			 var mapOptions = {
						 zoom: 4,
						 center: myLatlng,
						 mapTypeId: google.maps.MapTypeId.ROADMAP
			 };
			 
			 var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
			 
			 var contentString = '<div id="content">'+
			 '<div id="siteNotice">'+
			 '</div>'+
			 '<h1 id="firstHeading" class="firstHeading">Deals</h1>'+
			 '<div id="bodyContent">'+
			 '<p>Description of deals ' +
			 '<p><button onclick="javascript:bookButtonClicked()">Book</button> ' +

			 '</div>'+
			 '</div>';
						 var that = this;
			 var infowindow = new google.maps.InfoWindow({
														 content: contentString
														 });
			 
			 var marker = new google.maps.Marker({
												 position: myLatlng,
												 map: map,
												 title: 'Deals'
												 });
			 google.maps.event.addListener(marker, 'click', function() {
										   infowindow.open(map,marker);
										   });
		}

    }

});