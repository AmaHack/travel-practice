Aria.tplScriptDefinition({
    $classpath : "app.templates.home.HomeLayoutScript",
	$constructor: function(){
		var myScroll;
        var arrOfPlaces = new Array();
	},
	$prototype : {

        $displayReady: function(){
        	$(".mask, .dialog, .popUp").hide();
			
			$(".close").click(function(){
				$(".mask, .dialog, .popUp").hide();
			});			

			myScroll = new iScroll('wrapper');
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
			document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
		},
     facebookData: function(){
     
     $(".loading, .mask").show();
     
     //                         fbeventful.locationEvent();
     
     this.facebookLogin();
     },
     facebookLogin : function(){
     
     if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
     if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
     if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
                         var that = this;
     
     var AccessTokenByFB;
     FB.login(
              function(response)
              {
              
              //Getting SELF information from FB
              FB.api('/me', function(response)
                     {
                     
                     //Successful response
                     if (response.authResponse != null)
                     {
                     var access_token =   FB.getAuthResponse()['accessToken'];
                     AccessTokenByFB = access_token;
                     }
                     
//                     alert("Good to see you, " + response.name + ".")

                     //facebook CurrentLocation (ex: Bangalore, India)
                     facebookCurrentLocation = response.location.name;
                     var re = /\s*, \s*/;
                     facebookCurrentCity = facebookCurrentLocation.split(re);
//                     alert("facebookCurrentCity " + facebookCurrentCity[0]);
                     window.localStorage.setItem("facebookCurrentCity", facebookCurrentCity[0]);

                     that.getFriendCheckinList();
                     });
              },
              { scope: "user_location, user_events friends_activities, friends_groups, friends_interests, friends_likes, friends_location, friends_events, friends_photos, friends_status, friends_groups, friends_likes, user_friends, user_interests, user_photo_video_tags, friends_photo_video_tags"}
              );
     },
     getFriendCheckinList : function(){
//     alert("Inside getFriendsCheckins");
     
     var friendIDs = new Array();
     var fdata;
     
     var friendsCount = 0;
     var count = 0;
     var one = 1;
     
                         var that = this;
     //Getting the friends data
     FB.api('/me/friends', { fields: 'id, name'},  function(response)
            {
            if (response.error)
            {
            }
            else
            {
            var data = document.getElementById('data');
            fdata=response.data;
            
            //Total friends' count from FB
            friendsCount = fdata.length;
//            alert("friendsCount original -- " + friendsCount);
            
            //Addding the friends' ID to array
            for(var x = 0; x < 5; x++)
            {
            friendIDs.push(fdata[x].id);
            }
            
            //Pushing an empty friend ID
            friendIDs.push("");
//            alert("friendIDs count after -- " + friendIDs.length);
            
//            alert("friendIDs " + friendIDs);
            
            //Getting the checkin result for 25 of the friends
            for (var i = 0; i < 6; i++)
            {
//            alert('/' + friendIDs[i] + '?fields=checkins.since(1351063053).limit(10).fields(message,place)');
            //FB.api QUERY
            FB.api('/' + friendIDs[i] + '?fields=checkins.since(1351063053).limit(10).fields(message,place)', function (result)
                   {
                   //In case of no response or error from FB
                   if(!result || result.error)
                   {
                   //Invalid
                   if(result.error.code == "100")
                   {
                   //Calculate & display the most visited places
//                   alert(" CALL displayMostCheckedInresult");
                   that.displayMostCheckedInPlacesResult();
                   }
                   
                   }
                   else
                   {
//                   alert("INSIDE ELSE");
//                   alert(JSON.stringify(result.checkins.data));
                   //Get the checkin results
                   var checkinElement = result.checkins.data;
                   var checkinElementCount = result.checkins.data.length;
                   
                   for(var j = 0; j < checkinElement.length; j++)
                   {
                   if(checkinElement[j].place != null)
                   {
                   //Getting the place details
                   var placeName = checkinElement[j].place.name;
                   
                   var locationDetails = checkinElement[j].place.location;
                   
                   var locationCity;// = checkinElement[j].place.location.city;
                   if(checkinElement[j].place.location.city != null)
                   {
                   locationCity = checkinElement[j].place.location.city;
                   }
                   else
                   {
                   continue;
                   }
                   var locationState = checkinElement[j].place.location.state;
                   var locationCountry = checkinElement[j].place.location.country;
                   
                   //Adding the cities into an array list
                   
                   this.arrOfPlaces.push(locationCity);
                   }
                   else
                   {
                   continue;
                   }
                   
                   }
                   }
                   });
            }
            
            }
            });
     },
     displayMostCheckedInPlacesResult: function(){
                         
     alert("Inside displayMostCheckedInresult");
                         alert("arrOfPlaces " + this.arrOfPlaces);
                         
     this.arrOfPlaces.sort();
     alert("Sorted array list " + this.arrOfPlaces);

     var frequency = {};  // array of frequency.
     var max = 0;  // holds the max frequency.
     var result;   // holds the max frequency element.
     
     var MostVisitedPlaceResult;
     var MostVisitedPlaceResultCount;
     
     for(var v in this.arrOfPlaces)
     {
     frequency[this.arrOfPlaces[v]]=(frequency[arrOfPlaces[v]] || 0)+1; // increment frequency.
     
     if(frequency[this.arrOfPlaces[v]] > max)
     {
     // is this frequency > max so far ?
     max = frequency[this.arrOfPlaces[v]];  // update max.
     result = this.arrOfPlaces[v];          // update result.
     }
     }
     
     var arrPlacesWithElementCount = this.array_count_max_values(this.arrOfPlaces);
     
     var dataArray = [];
     for (cityName in arrPlacesWithElementCount) {
     var count = arrPlacesWithElementCount[cityName];
     dataArray.push({cityName: cityName, count: count});
     }
     
     dataArray.sort(function(a, b){
                    if (a.count > b.count) return -1;
                    if (b.count > a.count) return 1;
                    return 0;
                    });
     
     var mostVisitedCity = dataArray[0].cityName;
     var mostVisitedCityCount = dataArray[0].count;
     window.localStorage.setItem("mostVisitedCity", mostVisitedCity);
     window.localStorage.setItem("mostVisitedCityCount", mostVisitedCityCount);
     alert("Most visited city " + dataArray[0].cityName + " - " + dataArray[0].count + " friends.");

     var secondmostVisitedCity = dataArray[1].cityName;
     var secondmostVisitedCityCount = dataArray[1].count;
     window.localStorage.setItem("secondMostVisitedCity", secondmostVisitedCity);
     window.localStorage.setItem("secondMostVisitedCityCount", secondmostVisitedCityCount);
     
     var thirdmostVisitedCity = dataArray[2].cityName;
     var thirdmostVisitedCityCount = dataArray[2].count;
     window.localStorage.setItem("thirdMostVisitedCity", thirdmostVisitedCity);
     window.localStorage.setItem("thirdMostVisitedCityCount", thirdmostVisitedCityCount);

     var facebookCity = window.localStorage.getItem("facebookCurrentCity");
     var gpsCurrentCity = window.localStorage.getItem("currentCityName");
                         
//                         if(mostVisitedCity == facebookCurrentCity[0])
//                         {
//                         if(secondmostVisitedCity == currentCityName)
//                         {
//                         MostVisitedPlaceResult = dataArray[2].cityName;
//                         MostVisitedPlaceResultCount = dataArray[2].count;
//                         }
//                         else
//                         {
//                         MostVisitedPlaceResult = dataArray[1].cityName;
//                         MostVisitedPlaceResultCount = dataArray[1].count;
//                         }
//                         }
//                         else if (currentCityName == mostVisitedCity)
//                         {
//                         MostVisitedPlaceResult = dataArray[1].cityName;
//                         MostVisitedPlaceResultCount = dataArray[1].count;
//                         }
//                         else
//                         {
//                         MostVisitedPlaceResult = dataArray[0].cityName;
//                         MostVisitedPlaceResultCount = dataArray[0].count;
//                         }

     this.displayPopUpResult();
     },
     array_count_max_values: function(array){
                         
     // http://kevin.vanzonneveld.net
     // +   original by: Ates Goral (http://magnetiq.com)
     // + namespaced by: Michael White (http://getsprink.com)
     // +      input by: sankai
     // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
     // +   input by: Shingo
     // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
     // *     example 1: array_count_values([ 3, 5, 3, "foo", "bar", "foo" ]);
     // *     returns 1: {3:2, 5:1, "foo":2, "bar":1}
     // *     example 2: array_count_values({ p1: 3, p2: 5, p3: 3, p4: "foo", p5: "bar", p6: "foo" });
     // *     returns 2: {3:2, 5:1, "foo":2, "bar":1}
     // *     example 3: array_count_values([ true, 4.2, 42, "fubar" ]);
     // *     returns 3: {42:1, "fubar":1}
     var tmp_arr = {},
     key = '',
     t = '';
     
     var __getType = function (obj) {
     // Objects are php associative arrays.
     var t = typeof obj;
     t = t.toLowerCase();
     if (t === "object") {
     t = "array";
     }
     return t;
     };
     
     var __countValue = function (value) {
     switch (typeof value) {
     case "number":
     if (Math.floor(value) !== value) {
     return;
     }
     // Fall-through
     case "string":
     if (value in this && this.hasOwnProperty(value)) {
     ++this[value];
     } else {
     this[value] = 1;
     }
     }
     };
     
     t = __getType(array);
     if (t === 'array') {
     for (key in array) {
     if (array.hasOwnProperty(key)) {
     __countValue.call(tmp_arr, array[key]);
     }
     }
     }
     console.log("tmp_arr " + JSON.stringify(tmp_arr));
     return tmp_arr;
     },
    displayPopUpResult: function(){
                         
    var mostVisitedPlace = window.localStorage.getItem("mostVisitedCity");
    var mostVisitedPlaceCount = window.localStorage.getItem("mostVisitedCityCount");

    var secondMostVisitedPlace = window.localStorage.getItem("secondMostVisitedCity");
    var secondMostVisitedPlaceCount = window.localStorage.getItem("secondMostVisitedCityCount");

    var thirdMostVisitedPlace = window.localStorage.getItem("thirdMostVisitedCity");
    var thirdMostVisitedPlaceCount = window.localStorage.getItem("thirdMostVisitedCityCount");

    if (mostVisitedPlace != null)
    {
    var myData = {};
    myData.title = "Inspired by friends";
    myData.desc = "The top three locations where several of your Facebook friends have recently enjoyed visiting, and we’re offering you great deals and offers to try it yourself";
    myData.list = new Array();
    myData.list[0] = {};
    myData.list[0].title = mostVisitedPlace;
    myData.list[0].desc = "visitied by " + mostVisitedPlaceCount + " of your friends";

    myData.list[1] = {};
    myData.list[1].title = secondMostVisitedPlace;
    myData.list[1].desc = "visitied by " + secondMostVisitedPlaceCount + " of your friends";

    myData.list[2] = {};
    myData.list[2].title = thirdMostVisitedPlace;
    myData.list[2].desc = "visitied by " + thirdMostVisitedPlaceCount + " of your friends";

    this.$json.setValue(this.data,"popupData",myData);

    $(".loading, .mask").show();
    $(".loading").hide();
    $(".popUp, .dialog").show();
    }
    else
    {
    $(".popUp, .dialog").hide();
    }
    },
    seasonalData: function(){
                         
         this.seasonalPlaces();
                         
    },
    wellbeingData: function(){
                         
         this.wellbeingPlaces();
    },
     getDetails: function(){
                         
     alert("Inside getDetails");
     this.moduleCtrl.data = this.data;
     fbeventful.locationEvent();
     pageEngine.navigate({'pageId':'DETAILS'});
                         
     },
     seasonalPlaces: function(){
                         
                         $(".loading, .mask").show();
                         var that = this;
     var url = "http://1.glassy-song-375.appspot.com/GetTopEvents?date=FutureDate&page_size=100&keywords=(Festivals || Holiday)&sort_order=popularity&sort_order=ascending&max_cities=3&lat=" + window.localStorage.getItem("lat") + "&lng=" + window.localStorage.getItem("lat") + "&max_events=10";
     
     $.ajax({
            url: url,
            cache: false,
            type: "POST",
            processData: false,
            dataType:"json",
            crossDomain:"true",
            complete: function (responseData, textStatus, jqXHR)
            {
            if(textStatus == "success")
            {
            var resp = JSON.parse(responseData.responseText);
            
            var cityValues = new Array();
            cityValues = Object.keys(resp.deals);
            
            window.localStorage.setItem("seasonalCity0", cityValues[0]);
            window.localStorage.setItem("seasonalCity1", cityValues[1]);
            window.localStorage.setItem("seasonalCity2", cityValues[2]);
            
            that.displaySeasonalPopUp();
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
     
     },
     displaySeasonalPopUp: function(){
                         var myData = {};
                         myData.title = "Seasonal inspirations";
                         myData.desc = "We know it is the time of the year, when you have an opportunity to take a break from your hectic life and escape to an exotic or tranquil places. Here is a great list of offers for such places to visit.";
                         myData.list = new Array();
                         //myData.list[0] = {};
                         
                         myData.list[0] = {};
                         myData.list[0].title = window.localStorage.getItem("seasonalCity0");
                         myData.list[0].desc = "TEST DATA";
                         
                         myData.list[1] = {};
                         myData.list[1].title = window.localStorage.getItem("seasonalCity1");
                         myData.list[1].desc = "TEST DATA";
                         
                         myData.list[2] = {};
                         myData.list[2].title = window.localStorage.getItem("seasonalCity2");
                         myData.list[2].desc = "TEST DATA";
                         
                         this.$json.setValue(this.data,"popupData",myData);
                         
                         $(".loading, .mask").show();
                         $(".loading").hide();
                         $(".popUp, .dialog").show();
                         
     },
     wellbeingPlaces: function (){
               
                         $(".loading, .mask").show();
                         
                         var that = this;
//                         http://1.glassy-song-375.appspot.com/GetTopEvents?date=FutureDate&page_size=100&keywords=(Festivals%20||%20Holiday)&sort_order=popularity&sort_order=ascending&max_cities=5&max_events=10&lat=12.7&lng=77.69
                         var url = "http://1.glassy-song-375.appspot.com/GetTopEvents?date=FutureDate&page_size=100&keywords=(Festivals%20||%20Holiday)&sort_order=popularity&sort_order=ascending&max_cities=5&max_events=10&lat=" + window.localStorage.getItem("lat") + "&lng=" + window.localStorage.getItem("lat");
                         
                         $.ajax({
                                url: url,
                                cache: false,
                                type: "POST",
                                processData: false,
                                dataType:"json",
                                crossDomain:"true",
                                complete: function (responseData, textStatus, jqXHR)
                                {
                                if(textStatus == "success")
                                {
                                var resp = JSON.parse(responseData.responseText);
                                
                                var cityValues = new Array();
                                cityValues = Object.keys(resp.deals);
                                
                                window.localStorage.setItem("wellbeingCity0", cityValues[0]);
                                window.localStorage.setItem("wellbeingCity1", cityValues[1]);
                                window.localStorage.setItem("wellbeingCity2", cityValues[2]);
                                
                                that.displayWellbeingPopUp();
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

     },
     displayWellbeingPopUp: function (){
                         var myData = {};
                         myData.title = "Well being inspirations";
                         myData.desc = "It seems you are likely to seek holidays with a specific focus, for example, wellbeing/medical tourism, learning/cultural holidays and ethical voyages. Here is a list of such great occasions which you would like to consider.";
                         myData.list = new Array();
                         //myData.list[0] = {};
                         
                         
                         myData.list[0] = {};
                         myData.list[0].title = window.localStorage.getItem("wellbeingCity0");
                         myData.list[0].desc = "TEST DATA";
                         
                         myData.list[1] = {};
                         myData.list[1].title = window.localStorage.getItem("wellbeingCity1");
                         myData.list[1].desc = "TEST DATA";
                         
                         myData.list[2] = {};
                         myData.list[2].title = window.localStorage.getItem("wellbeingCity2");
                         myData.list[2].desc = "TEST DATA";
                         
                         this.$json.setValue(this.data,"popupData",myData);
                         
                         $(".loading, .mask").show();
                         $(".loading").hide();
                         $(".popUp, .dialog").show();
                         $(".mask, .popUp, .dialog").show();
     }
                         

    }

});