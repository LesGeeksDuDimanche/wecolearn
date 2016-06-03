Meteor.myFunctions = {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    loadProfil : function (currentObject ) {

    console.log("loadProfil", currentObject);
    var tags = "";
    ProfilTags.find({userId: currentObject.userId}).forEach(function(object, index) {
        if (index === 0) {
        tags += object.tag;
      } else {
        tags += ", " + object.tag;
      }
    });
    console.log(currentObject.photo);
    var photoUrl = Uploads.findOne({ _id: currentObject.photo});
    console.log(photoUrl);
    console.log(photoUrl.url());
    console.log(photoUrl.copies.uploads);
    console.log(photoUrl.copies.uploads.key);
    console.log('projectUploads/' + photoUrl.copies.uploads.key);
    // photoUrl = 'projectUploads/' + photoUrl.copies.uploads.key;
    Session.set('pseudoValue', currentObject.pseudo);
    Session.set('photoValue', photoUrl.url());
    Session.set('cityValue', currentObject.city);
    Session.set('tagsValue', tags);
    Session.set('bioValue', currentObject.Biography);
  },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    clearSuggestions : function (Class) {
      var Divs = $(Class);
      for (var i = 0; i < Divs.length; i++) {
        Divs[i].remove();
      }
      $('.suggestionsContainer').css('display', 'none');
    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    useValueInInput : function (value, id, className) {

      $(id).val(value);
      Meteor.myFunctions.clearSuggestions('.'+ className);
    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    createSuggestion : function (tagName, id, className, inputId){
      console.log("createSuggestion",inputId );
      $(id).css('display', 'inline-block');
      if (!document.getElementById(tagName)) {
        var parentNode = $(id);
        var tagDiv = $('<div></div>');
        tagDiv.attr('id',tagName);
        tagDiv.attr('class', className);
        tagDiv.html(tagName);
        tagDiv.click( function () { Meteor.myFunctions.useValueInInput(this.id, inputId, className); });
        parentNode.append(tagDiv);
      }
    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
     fillUl : function (tagName){
        var parentNode = document.getElementById('tagUl');
        var tagLi = document.createElement('li');
        var focusDiv = document.getElementById('tags');
        tagLi.id = "profil" + tagName;
        tagLi.className = 'tagLi';
        tagLi.innerHTML = tagName;
        tagLi.contentEditable = false;
        parentNode.insertBefore(tagLi, focusDiv );
        console.log("fillUl", "tagName", tagName);
        Meteor.myFunctions.checkIfNeedsScroll('#tagUl', 150);

        // parentNode.appendChild(tagLi);
        // Meteor.myFunctions.fitTagInputWidth(tagName);
    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    checkIfNeedsScroll : function (id, maxHeight) {
        var height = $(id).height();
        console.log("checkIfTagUlIsToBig", "height", height);
        if (height > maxHeight) {
          $(id).css('overflow-y','scroll');
          $(id).height(maxHeight + 'px');
        } else {
          $(id).css('overflow-y','hidden');
        }

    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
     addTagInInput : function (tagName) {
      if (!document.getElementById("profil" + tagName)) {
        // if (!document.getElementById("tagUl")) {
        //   Meteor.myFunctions.createUl(tagName);
        // } else {
          Meteor.myFunctions.fillUl(tagName);
        // }
      }
      // Meteor.myFunctions.fitTagInputWidth();
    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
     deleteLastList : function() {
       console.log("logdeleteLastList", $('.tagUl .tagLi').last().attr("id"));
      $('.tagUl .tagLi').last().remove();
    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
     addPseudo : function (name, selected) {
      var parentNode = $('#profilPseudo');
      var childNode = $("<div class='messagePseudoDiv'></div>");
      var childChildNode = $("<p class='messagePseudoP'></p>");
      childChildNode.text(name);
      childNode.attr('id',name);
      parentNode.append(childNode);
      childNode.append(childChildNode);
      console.log('addPseudo', name + selected);
      if (selected) {
        console.log('addPseudo', name + "selected");
        childNode.attr('class', 'selectedPseudoNameMessage');
      } else {
        childNode.click(function () { Meteor.myFunctions.loadMessagePage(this.id); });
      }
    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
     setPseudo : function (selectedName, otherNames) {
      // Meteor.myFunctions.addPseudo(selectedName, true);
      var userPseudo = Profil.findOne({userId: Meteor.userId()}).pseudo;
      console.log('setPseudo', selectedName);
      console.log(otherNames);
      if (otherNames[0] !== undefined) {

        otherNames.forEach(function (object) {
          if((object.user1 !== userPseudo)) {
             if (object.user1 === selectedName ) {
               Meteor.myFunctions.addPseudo(object.user1, true);
             } else {
               console.log('setPseudo',object.user1 , selectedName );
              console.log('setPseudo 1 false', selectedName);
             Meteor.myFunctions.addPseudo(object.user1, false);
             }
          } else if ((object.user2 !== userPseudo)){
              if (object.user2 === selectedName ) {
                Meteor.myFunctions.addPseudo(object.user2, true);
              } else {
              console.log('setPseudo',object.user2 , selectedName );
              console.log('setPseudo 2 false', selectedName);
              Meteor.myFunctions.addPseudo(object.user2, false);
              }
          }
         });
       } else {
         Meteor.myFunctions.addPseudo(userPseudo, true);
       }
      },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
      calculateTimeDifference : function (date) {
        console.log(date);
        date = new Date(date);
        console.log(date);
        var currentTime = new Date();
        var timeDif = (currentTime.getTime() - date.getTime());
        console.log(timeDif);
        if (timeDif > 1000) {
          timeDif = timeDif/1000;
          console.log(timeDif);
          if (timeDif > 60) {
            var secDif = timeDif % 60;
            var minDif = (timeDif - secDif) / 60;
            console.log(minDif);
            if (minDif > 60) {
              minRes = minDif % 60;
              var hourDif = (minDif - minRes) / 60;
              console.log(hourDif);
              if (hourDif > 24) {
                hourRes = hourDif % 24;
                dayDif = (hourDif - hourRes) / 24;
                console.log(dayDif);
                if (dayDif > 30 && dayDif < 366 ) {
                  dayRes = dayDif % 30;
                  monthDif = (dayDif - dayRes) / 30;
                  if ( dayDif > 365) {

                  } else {
                    return "Il y a " + monthDif.toFixed(0) + " mois";
                  }
                }
                else {
                  return "Il y a " + dayDif.toFixed(0) + " jour(s).";
                }

              } else {
                return "Il y a " + hourDif.toFixed(0) + " heure(s).";
              }
            } else {
              return "Il y a " + minDif.toFixed(0) + " minute(s).";
            }
          } else {
            return "Il y a " + timeDif.toFixed(0) + " seconde(s)";
          }

        } else {
          return "";
        }
      },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
      enterMessage : function (discussion) {
      discussion.forEach(function (messageObject) {

        var dateNode = $('<div class="messageDateDiv"</div>');
        var messageContainerNode = $('<div class="messageDiv"></div>');
        var messageNode = $('<p></p>');
        var userSpan = $('<a></a>');
        userSpan.attr('id', messageObject.user);
        messageNode.text(" : " + messageObject.message);
        userSpan.text(messageObject.user);
        userSpan.click( function() {
          Meteor.messageFunctions.showProfil(this.id);
        });
        var timeAgo =  Meteor.myFunctions.calculateTimeDifference(messageObject.date);
        dateNode.text(timeAgo);
        messageContainerNode.append(userSpan);
        messageContainerNode.append(messageNode);
        $('#messagesContainer').append(messageContainerNode);
        $('#messagesContainer').append(dateNode);
        if (messageObject.user === Session.get("currentUser")) {
          messageContainerNode.attr('class',"messageDiv userMessageDiv");
          dateNode.attr('class',"messageDateDiv userDateDiv");
        }
      });
      var objDiv = document.getElementById("messagesContainer");
      objDiv.scrollTop = objDiv.scrollHeight;
    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
     loadMessagePage : function (selectedPseudo) {


       if (selectedPseudo){
         Session.set("pseudoValue", selectedPseudo);
       }

      var user2Pseudo;
      var userPseudo = Profil.findOne({userId: Meteor.userId()}).pseudo;


      Meteor.myFunctions.clearSuggestions('.messageDateDiv');
      Meteor.myFunctions.clearSuggestions('.messageDiv');
      Meteor.myFunctions.clearSuggestions('.messagePseudoDiv');
      Meteor.myFunctions.clearSuggestions('.selectedPseudoNameMessage');

      var discussions =  Discussions.find({$or : [{user1 : userPseudo}, {user2: userPseudo}]}).fetch();
      discussions.sort(function(a,b){
        var aLength = a.discussion.length - 1;
        var bLength = b.discussion.length - 1;
        return new Date(b.discussion[bLength].date) - new Date(a.discussion[aLength].date);
      });
      if(Session.get("pseudoValue") && Session.get("pseudoValue") !== userPseudo) {
        console.log(Session.get("pseudoValue"));

      // get all discussions with user
        user2Pseudo = Session.get("pseudoValue");
      console.log("user2Pseudo", user2Pseudo, "userPseudo", userPseudo);
        if(Discussions.findOne({$or : [{$and : [{user1 : user2Pseudo}, {user2: userPseudo}]},{$and : [{user1 : userPseudo}, {user2: user2Pseudo}]}]})) {
          if (Discussions.findOne({$and : [{user1 : user2Pseudo}, {user2: userPseudo}]})) {
          Meteor.myFunctions.enterMessage((Discussions.findOne({$and : [{user1 : user2Pseudo}, {user2: userPseudo}]})).discussion);
          } else {
          Meteor.myFunctions.enterMessage((Discussions.findOne({$and : [{user1 : userPseudo}, {user2: user2Pseudo}]})).discussion);
          }
          // for (var i = 0; i < array.length; i++) {
          // user2Pseudo.push(Discussion)
          // }
        }
      } else {
            if (Discussions.find({$or : [{user1 : userPseudo}, {user2: userPseudo}]})) {
              sortedDiscussion = discussions;
              if (sortedDiscussion[0].user1 === userPseudo) {
              user2Pseudo = sortedDiscussion[0].user2;
              } else {
              user2Pseudo = sortedDiscussion[0].user1;
                }
              console.log(user2Pseudo);
                if (Discussions.findOne({$and : [{user1 : userPseudo}, {user2 : user2Pseudo}]})) {
                Meteor.myFunctions.enterMessage((Discussions.findOne({$and : [{user1 : userPseudo}, {user2 : user2Pseudo}]})).discussion);
                } else {
                  Meteor.myFunctions.enterMessage((Discussions.findOne({$and : [{user1 : user2Pseudo}, {user2 : userPseudo}]})).discussion);
                  }
            }
        }
        console.log("user2Pseudo", user2Pseudo, "userPseudo", userPseudo);

        Meteor.myFunctions.setPseudo(user2Pseudo, discussions);

    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    fillTags: function() {

      var tags = "";
      ProfilTags.find({userId: Meteor.userId()}).forEach(function(object) {
        Meteor.myFunctions.addTagInInput(object.tag);

      });


    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    getGeolocalization : function() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(Meteor.myFunctions.showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    showPosition : function(position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          Session.set("localization", {"latitude": latitude, "longitude": longitude });
          Meteor.myFunctions.getCityAccordingToLatLng(latitude, longitude);
          // Session.set("geoLocalizedCity", )
    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    checkCheckBoxAccorgingToDB : function() {
          Meteor.myFunctions.setSessionCheckBox(false, function(err, response) {
            console.log("callback time ?");
          });

    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    setCityInInput : function (city) {
          $('#profilCityEdit').val(city);
    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    getCityAccordingToLatLng : function (latitude, longitude) {

      var APIRequest = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+ latitude+","+longitude+"&sensor=true";
      Meteor.call('ASyncAjaxRequest', APIRequest, function(err, response){
        console.log("findCityAC call");
                if (err) {
                  console.log(err);
                } else {
                  console.log(response);
                  var city;
                  response.data.results[0].address_components.forEach( function(address_component) {
                    console.log(address_component);

                    if (address_component.types[0] == "locality") {
                        console.log("found", address_component.types[0]);
                        city = address_component.long_name;
                    }
                  });
                  console.log("city", city);
                  Session.set("cityFromLatAndLong", city);
                }
      });
      setTimeout(function(){
        console.log("", Session.get("cityFromLatAndLong"));
        Meteor.myFunctions.setCityInInput(Session.get("cityFromLatAndLong"));
      }, 300);

    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    setSessionCheckBox : function (geolocalize) {
        if ($('#geolocationChoice').prop("checked") ) {
          Session.set("AuthorizeGeolocation", 1);
          console.log("setSessionCheckBox", "checked");
          if (geolocalize) {
          Meteor.myFunctions.getGeolocalization();
          return;
          }
        } else {
          Session.set("AuthorizeGeolocation", 0);
          console.log("setSessionCheckBox", "not checked");
          return;
        }
    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    setCitySuggestions : function(containerId) {
      results = Session.get("citySearchResults");
      results.predictions.forEach(function (cityObject) {
        cityObject.terms.forEach(function (location) {
          if (location.offset === 0) {
            Meteor.myFunctions.createSuggestion(location.value, '#citySuggestionsContainer', 'cityDiv', containerId);
          }
        });
      });
    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    findCityAC : function(inputedLetters, containerId) {
      Session.set("citySearchResults", "");
      var APIRequest = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+inputedLetters+"&types=%28cities%29&language=fr&key=AIzaSyDOqNgcJgVCMV_KJpYlWDekJHwDmEtZr_w";
      Meteor.call('ASyncAjaxRequest', APIRequest, function(err, response){
        console.log("findCityAC call");
                if (err) {
                  console.log(err);
                } else {
                  console.log(response);
                  var results = response.data;
                  // results = JSON.stringify(results);
                  console.log(results);
                  Session.set("citySearchResults", results);
                }
      });
      setTimeout(function(){
        console.log("sessionResults", Session.get("citySearchResults"));
        Meteor.myFunctions.setCitySuggestions(containerId);
      }, 500);

    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    clearSessions : function() {
      Session.set( "citySearchResults", null);
      Session.set('pseudoValue', null);
      Session.set('photoValue', null);
      Session.set('cityValue', null);
      Session.set('tagsValue', null);
      Session.set('bioValue', null);
      Session.set( "currentUser", null);
      Session.set( "localization", null);
      Session.set( "currentPhotoId", null);
      Session.set( "tagInput", null);
      Session.set( "currentSearch", null);
      Session.set("SearchCount", 0);
    }
};
