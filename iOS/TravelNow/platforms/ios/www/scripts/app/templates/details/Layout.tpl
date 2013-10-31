{Template {
  $classpath : "app.templates.details.Layout",
  $hasScript: true
}}

  {macro main()}
   <div id="header">
    <div class="backButton"><a href="index.html"></a></div>
  </div>
  <div id="wrapper" class="detailsWrapper">
    <div id="scroller">
      <ul id="thelist">
        <li class="maps">
        {section {
          id : "mapblock",
          macro : {
            name: "mapmacro"
          }
        }/}
        </li>
        <li class="placeDetails">
          <div class="container">
            <div class="header">Place details</div>
            <div class="placeDescription">
              <div class="content">
              {section {
                id : "placeblock",
                macro : {
                  name: "placemacro"
                }
              }/}
              </div>
            </div>
          </div>
        </li>
        <li class="placeDetails events">
          <div class="container">
              {section {
                id : "eventblock",
                macro : {
                  name: "eventmacro"
                }
              }/}
          </div>
        </li>
      </ul>
    </div>
  </div>             
  <div id="footer">
     <div class="button"  onClick="window.open('search.html', '_self')">Book</div>
  </div>

  {/macro}
  {macro mapmacro()}
    <iframe  frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=bangalore&amp;aq=&amp;sll=37.0625,-95.677068&amp;sspn=63.640894,135.263672&amp;ie=UTF8&amp;hq=&amp;hnear=Bangalore,+Bangalore+Urban,+Karnataka,+India&amp;ll=12.971599,77.594563&amp;spn=0.624407,1.056747&amp;t=m&amp;z=11&amp;output=embed"></iframe>
  {/macro}

  {macro placemacro()}
    <img src="img/place.png"> <span><strong>Place:</strong> Bangalore, India</span> </span><strong>Description:</strong> Bangalore is the capital city of the Indian state of Karnataka. Located on the Deccan Plateau in the south-eastern part of Karnataka. Bangalore is Indias third most populous city and fifth-most populous urban agglomeration. Bangalore is known as the Silicon Valley of India because of its position as the nations leading Information technology (IT) exporter.[6][7][8] Located at a height of over 3,000 feet (914.4 m) above sea level, </span> 
  {/macro}

  {macro eventmacro()}
    <div class="header">Events in Bangalore</div>
    <div class="placeDescription">
      <div class="content"> <img src="img/photo_geoffreys_airport-road_bangalore@v56z5xmh_4uf4_2_150.jpg"> <span><strong class="name">Oktoberfest</strong> </span> <span class="des">Oktoberfests have long been a part of German festivity. The Royal Orchid offers its own version of the celebration at its English pub, Geoffrey’s. Geoffrey’s at The Royal Orchid is transforming itself to provide a lively dining experience, in order to celebrate the historic Oktoberfest. The a la carte menu, specially designed for the festival, has a wide range of sizzlers that feature German favourites like sauerkraut, spaetzle, bratwurst and frikadelle will be served. Both vegetarian and non-vegetarian options will be available. Considering beer is a big part of the festival, the pub will serve a wide range of beer brands for guests to explore. These include Kingfisher, Fosters, Budweiser, Tuborg, Heineken, Carlsberg, Peroni, Corona, Christoffel, Orval and St Bernadus. </span> </div>
    </div>
    <div class="placeDescription">
      <div class="content"> <img src="img/photo_i-bar_mg-road_bangalore@glr4ulmh_4t91_2_150.jpg"> <span><strong  class="name">Ladies Night</strong></span> <span class="des"> Toxic Thursday at i-Bar tonight!! The Biggest, Boldest & Baddest girl’s night out in town on a Thursday night!! Ladies get free drinks till 10:30pm, DJ Raghu got some fun new tunes lined up for tonight!! Call your friends, gang up and head over to i-Bar!! </span> </div>
    </div>
    <div class="placeDescription">
      <div class="content"> <img src="img/photo_tasveer_lavelle-road_bangalore@zhyem0lh_4nj7_1_150.jpg"> <span><strong class="name">Micheal Kenna - A Journey Through Asia</strong><span  class="des">Michael Kenna - A Journey Through Asia. Tasveer invites you to a photography exhibition by prolific landscape photographer Michael Kenna. The exhibition presents 48 black and white photographs, made from 2006 to 2013, that take us on a journey across the landscapes of India, Thailand, Vietnam, China, South Korea and Japan. This is Tasveers first exhibition of the season in partnership with Vacheron Constantin!</span> </div>
    </div>
    <div class="placeDescription">
      <div class="content"> <img src="img/photo_kala-rasa_jayanagar_bangalore@rcjvfumh_4u48_1_150.jpg"> <span><strong class="name">Silent Hues - an exhibition of artworks by 14 hearing impaired artists</strong> </span> <span class="des">Bangalore is the capital city of the Indian state of Karnataka. Located on the Deccan Plateau in the south-eastern part of Karnataka. 
        The show “Silent Hues“is an amalgamation of various styles and mediums created by deaf and mute artists who despite the odds, have gone on to conquer art. The artists are not just from Karnataka, but across India- Chennai, Rajasthan, Bhubaneshwar, Kolhapur, Noida, The works on display are inspired by nature, landscapes, wildlife, people and other assorted themes, also with a spiritual connect making this an elegant and sometime sublime display of artworks. The Artists express their emotions and passion through their art. Vibrant, bold, intense and intricately detailed, the artists’ works are sometimes narrative in style with stories and themes related to the various elements in their society and their manifestations. The show is a statement of their commitment, embodies their positive spirit and speaks louder than any voice, of their never say die attitude towards art and towards life. The artists whose works are on display in ‘Silent Hues’ are S. Rajeev, Jyothi Kumar, Sanjay Saraf, Immamuddin, Rekha Chitrakumar, Ganesh Shetty, Smt Rajni, Sunil Kulkarni, Kumari Sonia, CV Supriya, Archana, Ravikumar, Sekar and Smt. Savithri. Kalarasa is proud to give voice to their expression and wing to their flight towards the horizons of success and fulfillment. There would be International artists like Marco V, John Dahlback, Yves V & Marcel Woods. </span> </div>
    </div>
    <div class="placeDescription">
      <div class="content"> <img src="img/photo_benjarong_ulsoor_bangalore@laaivimh_4su2_1_150.jpg"> <span><strong class="name">Royal Thai Food Festival</strong></span> <span class="des">Benjarong is all set to host the ‘Royal Thai Food Festival’ at Benjarong. Specialist Chef Tharee Charupas, who has flown down exclusively from Thailand, will be hosting the festival along with Benjarong’s Brand Chef Ram Kumar. The festival will feature a specially crafted menu with delicacies created by Thai noble women in the past. The authentic recipes of the Royal Thai cuisine have been passed down over generations and are still served to the Thai Royal family. Exquisite preparation and cooking techniques, along with delicate and careful presentation while serving are unique to this traditional cuisine. Gaining popularity among the nobles of the Ayyuthaya Kingdom in the 1930s, the Royal Thai Cuisine legacy was passed down to future royal generations. To this day, only select places in Thailand serve these recipes. The special menu includes a handpicked selection of vegetarian and non vegetarian delicacies. Starters include Goong sarong, Tung Tong and Kunchien pu tod. Apart from soups and salads made with unique flavours and ingredients, the highlights on the main course include Khao Mok influenced by Islamic kitchens, the Poo pahd pong karee and Hed Hohu Pahd Bai graprou. </span> </div>
    </div>
  {/macro}

{/Template}