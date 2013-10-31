/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var arrOfPlaces = new Array();

var fbapp =
{
    facebookLogin : function ()
    {
        if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
        if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
        if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');

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
                        console.log("AccessTokenByFB " + AccessTokenByFB);
                        }
                        
                        //Welcome message to the user
                        console.log('Good to see you, ' + response.name + '.');
                        alert("Good to see you, " + response.name + ".")
                        
                        alert("current Latitude " + window.localStorage.getItem("lat"));
                        alert("current Longitude " + window.localStorage.getItem("lng"));
                        
                        //facebook CurrentLocation (ex: Bangalore, India)
                        facebookCurrentLocation = response.location.name;
                        console.log("facebookCurrentLocation " + facebookCurrentLocation);
                        //Facebook CurrentCity (Bangalore)
                        var re = /\s*, \s*/;
                        facebookCurrentCity = facebookCurrentLocation.split(re);
                        alert("facebookCurrentCity " + facebookCurrentCity[0]);
                        
                        if (response.session)
                        {
                        alert('logged in');
                        }
                        else
                        {
                        alert('not logged in');
                        fbapp.getLoginStatus();
                        }


                        });
                 
                 },
                 { scope: "user_location, user_events friends_activities, friends_groups, friends_interests, friends_likes, friends_location, friends_events, friends_photos, friends_status, friends_groups, friends_likes, user_friends, user_interests, user_photo_video_tags, friends_photo_video_tags"}
                 );

    },
    
    getLoginStatus: function()
    {
        alert("Inside getLoginStatus");
        fbapp.getFriendsCheckins();

//        //Getting the login status of the user
//        FB.getLoginStatus(function(response)
//                          {
//                          if (response.status == 'connected')
//                          {
//                          alert('logged in');
//                          //Get the friends check in results
//
//                          }
//                          else if (response.status == 'not_authorized')
//                          {
//                          alert('App not authorized. Kindly permit the app and try again.');
//                          }
//                          else
//                          {
//                          alert('Kindly login and and try again.');
//                          }
//                          
//                          });
    },
    
    getFriendsCheckins: function()
    {
        alert("Inside getFriendsCheckins");

        var friendIDs = [];
        var fdata;

        var friendsCount = 0;
        var count = 0;
        var one = 1;

        //Getting the friends data
        FB.api('/me/friends', { fields: 'id, name'},  function(response)
               {
               if (response.error)
               {
               alert(JSON.stringify(response.error));
               }
               else
               {
               var data = document.getElementById('data');
               fdata=response.data;
               
               //Total friends' count from FB
               friendsCount = fdata.length;
               console.log("friendsCount original -- " + friendsCount);
               alert("friendsCount original -- " + friendsCount);
               
               //Addding the friends' ID to array
               for(var x = 0; x < 25; x++)
               {
               friendIDs.push(fdata[x].id);
               }
               
               //Pushing an empty friend ID
               friendIDs.push("");
               console.log("friendIDs count after -- " + friendIDs.length);
               alert("friendIDs count after -- " + friendIDs.length);
               
               //Getting the checkin result for 25 of the friends
               for (var i = 0; i < friendIDs.length; i++)
               {
               //FB.api QUERY
//               console.log("/" + fdata[i].id + "?fields=checkins.since(1351063053).limit(10).fields(message,place)");
//               alert("/" + fdata[i].id + "?fields=checkins.since(1351063053).limit(10).fields(message,place)");
               
               var friendID;
               if (i == friendIDs.length -1)
               {
               friendID = "";
               }
               else
               {
               friendID = fdata[i].id;
               }
               
               FB.api('/' + friendID + '?fields=checkins.since(1351063053).limit(10).fields(message,place)', function (result)
                      {
//                      alert("Inside API CALL");
                      //In case of no response or error from FB
                      if(!result || result.error)
                      {
                      //Invalid
                      console.log("result.error " + JSON.stringify(result.error));
                      if(result.error.code == "100")
                      {
                      //                      document.getElementById("loadingDiv").style.display = "none";
                      
                      //Calculate & display the most visited places
                      alert(" CALL displayMostCheckedInresult");
                      fbapp.displayMostCheckedInresult();
                      }
                      
                      }
                      else
                      {
                      //Get the checkin results
                      var checkinElement = result.checkins.data;
                      var checkinElementCount = result.checkins.data.length;
//                      alert("checkinElementCount " + checkinElementCount);
                      
                      for(var j = 0; j < checkinElement.length; j++)
                      {
                      if(checkinElement[j].place != null)
                      {
                      //Getting the place details
                      var placeName = checkinElement[j].place.name;
//                      alert("placeName " + placeName);
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
//                      alert("locationCity " + locationCity);
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
    
    displayMostCheckedInresult: function()
    {
        alert("Inside displayMostCheckedInresult");
        arrOfPlaces.sort();
        
        alert("Sorted array list " + arrOfPlaces);
        var frequency = {};  // array of frequency.
        var max = 0;  // holds the max frequency.
        var result;   // holds the max frequency element.
        
        var MostVisitedPlaceResult;
        var MostVisitedPlaceResultCount;
        
        for(var v in arrOfPlaces)
        {
            frequency[arrOfPlaces[v]]=(frequency[arrOfPlaces[v]] || 0)+1; // increment frequency.
            
            if(frequency[arrOfPlaces[v]] > max)
            {
                // is this frequency > max so far ?
                max = frequency[arrOfPlaces[v]];  // update max.
                result = arrOfPlaces[v];          // update result.
            }
        }

        var arrPlacesWithElementCount = fbapp.array_count_values(arrOfPlaces);
        
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
        alert("Most visited city " + dataArray[0].cityName + " - " + dataArray[0].count + " friends.");

        window.localStorage.setItem("mostVisitedCity", mostVisitedCity);
        window.localStorage.setItem("mostVisitedCityCount", mostVisitedCityCount);
        
        var secondmostVisitedCity = dataArray[1].cityName;
        var secondmostVisitedCityCount = dataArray[1].count;
        alert("2nd Most visited city " + dataArray[1].cityName + " - " + dataArray[1].count + " friends.");
        
        window.localStorage.setItem("secondMostVisitedCity", secondmostVisitedCity);
        window.localStorage.setItem("secondMostVisitedCityCount", secondmostVisitedCityCount);

        var thirdmostVisitedCity = dataArray[2].cityName;
        var thirdmostVisitedCityCount = dataArray[2].count;
        alert("3rd Most visited city " + dataArray[2].cityName + " - " + dataArray[2].count + " friends.");

        window.localStorage.setItem("thirdMostVisitedCity", thirdmostVisitedCity);
        window.localStorage.setItem("thirdMostVisitedCityCount", thirdmostVisitedCityCount);

        
        displayPopUpResult();
        
        if(mostVisitedCity == facebookCurrentCity[0])
        {
            if(secondmostVisitedCity == currentCityName)
            {
                MostVisitedPlaceResult = dataArray[2].cityName;
                MostVisitedPlaceResultCount = dataArray[2].count;
            }
            else
            {
                MostVisitedPlaceResult = dataArray[1].cityName;
                MostVisitedPlaceResultCount = dataArray[1].count;
            }
        }
        else if (currentCityName == mostVisitedCity)
        {
            MostVisitedPlaceResult = dataArray[1].cityName;
            MostVisitedPlaceResultCount = dataArray[1].count;
        }
        else
        {
            MostVisitedPlaceResult = dataArray[0].cityName;
            MostVisitedPlaceResultCount = dataArray[0].count;
        }
        alert(MostVisitedPlaceResultCount + " of your friends have visited " + MostVisitedPlaceResult + ". Would you like to try?");

    },
    
    array_count_values: function(array)
    {
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
    }
    
};
