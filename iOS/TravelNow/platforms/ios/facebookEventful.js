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
var fbeventful =
{
    locationEvent: function()
    {
        var url = "http://1.glassy-song-375.appspot.com/GetTopEvents?date=FutureDate&page_size=100&location=Bangalore&sort_order=popularity&sort_order=ascending&max_cities=1&lat=" + window.localStorage.getItem("lat") + "&lng=" + window.localStorage.getItem("lat") + "&max_events=10";

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

    }
    
};
