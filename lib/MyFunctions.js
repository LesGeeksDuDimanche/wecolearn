Meteor.myFunctions = {

    loadProfil : function (currentObject ) {


    var tags = "";
    ProfilTags.find({userId: currentObject.userId}).forEach(function(object) {
        tags += object.tag + " ";
    });

    // getImageURL
    // var photoUrl = Uploads.findOne({name: currentObject.photo}).fetch();
    var photoUrl = Uploads.findOne({ _id: currentObject.photo});
    console.log(photoUrl.name());
    console.log(photoUrl._id);
    console.log(photoUrl.url());
    console.log("loadProfil","photoUrl",photoUrl);
    // var photoUrl3 = Uploads.findOne({
      // $query: {'metadata.owner':  Meteor.userId()},
    // });
    // console.log(photoUrl3.name());
    // console.log(photoUrl3._id);
    // var photoUrl = Uploads.findOne({ original: {name:  "favicon.png" }});
    Session.set('pseudoValue', currentObject.pseudo);
    Session.set('photoValue', photoUrl.url());
    Session.set('cityValue', currentObject.city);
    Session.set('tagsValue', tags);
    Session.set('bioValue', currentObject.Biography);

  },


    clearSuggestions : function (Class) {
      var Divs = $(Class);
      for (var i = 0; i < Divs.length; i++) {
        Divs[i].remove();
      }
      $('.suggestionsContainer').css('display', 'none');
    },

    useValueInInput : function (value, id, className) {
      console.log(value, id, className);

      $(id).val(value);
      Meteor.myFunctions.clearSuggestions('.'+ className);
    },

    createSuggestion : function (tagName, id, className, inputId){
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

    // removeTagSuggestion : function (TagName) {
    //   $('[id=TagName]').remove();
    // },
    /**
    * bla bla
    *
    *
    */

    //  fitTagInputWidth : function (tagName) {
    //
    //
    //     // var tagLiWidth = Meteor.myFunctions.getSizeOfEditableDiv();
    //     var newTagLiWidth = 0;
    //     if (tagName) {
    //     newTagLiWidth = $('#profil'+tagName).width();
    //     console.log(tagLiWidth);
    //     }
    //     var someOfTags = tagLiWidth + newTagLiWidth;
    //     console.log("fitTagInputWidth","someOfTags", someOfTags);
    //     var substract = someOfTags % 300;
    //     console.log("substract",substract);
    //     var newTagInputWidth = (300 - substract);
    //     // console.log("width measured" +  newTagInputWidth);
    //     console.log("newTagInputWidth", newTagInputWidth);
    //     if (newTagInputWidth < 90) {
    //       newTagInputWidth = 300;
    //     // console.log($('#tags').css("height").replace("px", ""));
    //     // var newHeight =  ($('#tags').css("height").replace("px", "") - 30);
    //     // // var newMargin = ($('#tags').css("margin-top").replace("px", "") * fullWidth) + 4;
    //     // // console.log(newMargin);
    //     // console.log(newHeight);
    //     // // $('#tags').css("margin-top",newMargin + "vw");
    //     // $('#tags').css("height",newHeight + "px");
    //     }
    //     $('#tags').width( newTagInputWidth + "px");
    //     // $('#tags').focus();
    //     console.log("focusagain");
    // },

    //  getSizeOfEditableDiv : function() {
    //    var tagLiWidth = 0;
    //   //  for (var i = 0; i < $('.tagLi').length; i++) {
    //   $('.tagLi').each( function() {
     //
    //      tagLiWidth += $(this).outerWidth(true);
    //      console.log("getSizeOfEditableDiv", "tagLiWidth temp total :", tagLiWidth);
    //   }
    //   );
    //   //  }
    //    console.log("getSizeOfEditableDiv", "tagLiWidth total :", tagLiWidth );
    //    return tagLiWidth;
    //  },

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
    //  createUl : function (tagName) {
    //     var parentNode = document.getElementById('tagsContainer');
    //     var tagUl = document.createElement('ul');
    //     tagUl.id = "tagUl";
    //     tagUl.className = 'tagUl';
    //     var tagsNode = document.getElementById('tags');
    //     parentNode.insertBefore(tagUl, tagsNode);
    //     Meteor.myFunctions.fillUl(tagName);
    // },


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

     deleteLastList : function() {
       console.log("logdeleteLastList", $('.tagUl .tagLi').last().attr("id"));
      $('.tagUl .tagLi').last().remove();
    },


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





     setPseudo : function (selectedName, otherNames) {
      // Meteor.myFunctions.addPseudo(selectedName, true);
      var userPseudo = Profil.findOne({userId: Meteor.userId()}).pseudo;
      console.log('setPseudo', selectedName);
      console.log(otherNames);
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
      },

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
                    return monthDif + " mois";
                  }
                }
                else {
                  return dayDif + " jours.";
                }

              } else {
                return hourDif + " heures.";
              }
            } else {
              return minDif + " minutes.";
            }
          } else {
            return timeDif + " secondes";
          }

        } else {
          return timeDif + " mSecondes";
        }


      },
      enterMessage : function (discussion) {
      discussion.forEach(function (messageObject) {

        var dateNode = $('<div class="messageDateDiv"</div>');
        var messageNode = $('<div class="messageDiv"></div>');
        messageNode.text(messageObject.user + " : " + messageObject.message);
        var timeAgo =  Meteor.myFunctions.calculateTimeDifference(messageObject.date);
        dateNode.text("Il y a " + timeAgo);
        $('#messagesContainer').append(messageNode);
        $('#messagesContainer').append(dateNode);
        if (messageObject.user === Session.get("currentUser")) {
          messageNode.attr('class',"messageDiv userMessageDiv");
          dateNode.attr('class',"messageDateDiv userDateDiv");
        }
      });
    },







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

        Meteor.myFunctions.setPseudo(user2Pseudo, discussions);

    },

    cityProfilEdit : function () {

          var city = $('#profilCityEdit').val();
          var object = Profil.findOne({userId: Meteor.userId()});
          var localization;
          if (Session.get("AuthorizeGeolocation") === 1 && Session.get("localization")) {
            localization = {'authorization' : 1, 'localization' : Session.get("localization")};
          } else {
            localization = {'authorization' : 0, 'localization' : 0};
          }

          Profil.update(
            {
              _id: object._id
            },
            {
              $set: {
                city: city,
                localization: localization
              }
            }
          );

          // refresh/load profil
          var profil = Profil.findOne({userId: Meteor.userId()});
          var tags = "";
          ProfilTags.find({userId: Meteor.userId()}).forEach(function(object) {
              tags += object.tag + " ";
          });
          Meteor.myFunctions.loadProfil(profil);
          Meteor.myFunctions.hideProfilEditSubmit();


    },

    hideProfilEditSubmit : function () {

            // city

            $('.profilCity').show();
            $('#editCity').show();
            $('#profilCityEdit').hide();
            $('#geolocationChoiceContainer').hide();
            $('#profilCityEditSubmit').hide();
            $('#cancelProfilCityEditSubmit').hide();

            // photo

            $('.profilPhoto').show();
            $('#editPhoto').show();
            $('#profilPhotoEdit').hide();
            $('#profilPhotoEditSubmit').hide();
            $('#cancelProfilPhotoEditSubmit').hide();

            //  pseudo

            $('#profilPseudo').show();
            $('#editPseudo').show();
            $('#profilPseudoEdit').hide();
            $('#profilPseudoEditSubmit').hide();
            $('#cancelProfilPseudoEditSubmit').hide();

            //  bio

            $('#profilBio').show();
            $('#editBio').show();
            $('#profilBioEdit').hide();
            $('#profilBioEditSubmit').hide();
            $('#cancelProfilBioEditSubmit').hide();

            //  tags

            $('#profilTags').show();
            $('#editTags').show();
            $('#tagsContainer').hide();
            $('#profilTagsEditSubmit').hide();
            $('#cancelProfilTagsEditSubmit').hide();


            // clear form

            Meteor.myFunctions.clearProfilForm();


    },
    photoProfilEdit : function () {

          // var photo = $('#profilPhotoEdit').val();
          var photo = Session.get("currentPhotoId");
          var object = Profil.findOne({userId: Meteor.userId()});
          Profil.update(
            {
              _id: object._id
            },
            {
              $set: {
                photo: photo,
              }
            }
          );

          // refresh/load profil
          var profil = Profil.findOne({userId: Meteor.userId()});
          var tags = "";
          ProfilTags.find({userId: Meteor.userId()}).forEach(function(object) {
              tags += object.tag + " ";
          });
          Meteor.myFunctions.loadProfil(profil);
          Meteor.myFunctions.hideProfilEditSubmit();


    },
    pseudoProfilEdit : function () {

          var pseudo = $('#profilPseudoEdit').val();
          var object = Profil.findOne({userId: Meteor.userId()});
          Profil.update(
            {
              _id: object._id
            },
            {
              $set: {
                pseudo: pseudo,
              }
            }
          );

          // refresh/load profil
          var profil = Profil.findOne({userId: Meteor.userId()});
          var tags = "";
          ProfilTags.find({userId: Meteor.userId()}).forEach(function(object) {
              tags += object.tag + " ";
          });
          Meteor.myFunctions.loadProfil(profil);
          Meteor.myFunctions.hideProfilEditSubmit();


    },
    bioProfilEdit : function () {

          var bio = $('#profilBioEdit').val();
          var object = Profil.findOne({userId: Meteor.userId()});
          Profil.update(
            {
              _id: object._id
            },
            {
              $set: {
                Biography: bio
              }
            }
          );

          // refresh/load profil
          var profil = Profil.findOne({userId: Meteor.userId()});
          var tags = "";
          ProfilTags.find({userId: Meteor.userId()}).forEach(function(object) {
              tags += object.tag + " ";
          });
          Meteor.myFunctions.loadProfil(profil);
          Meteor.myFunctions.hideProfilEditSubmit();

    },
    tagsProfilEdit : function () {


          var userId = Meteor.userId();
          var tagListArray = [];
          var tagList = document.getElementsByClassName('tagLi');
          for (var i = 0; i < tagList.length; i++) {
            tagListArray.push(tagList[i].textContent);
          }


          // delete profil-linked tags in database
          ProfilTags.find({userId: Meteor.userId()}).forEach(function(object){
          ProfilTags.remove({_id: object._id});
          });


          // Insert profil-linked tags in database
          tagListArray.forEach(function(tag) {
              ProfilTags.insert({
                userId: userId,
                tag: tag
              });
          });


          // refresh/load profil
          var profil = Profil.findOne({userId: Meteor.userId()});
          var tags = "";
          ProfilTags.find({userId: Meteor.userId()}).forEach(function(object) {
              tags += object.tag + " ";
          });
          Meteor.myFunctions.loadProfil(profil);
          Meteor.myFunctions.hideProfilEditSubmit();


          tagListArray.forEach(function(tags) {
          //See if tag exists already
            var TagExists = false;
            TagDb.find().forEach(function(object){
              if (object.tag === tags ) {
                TagExists = true;
              }
            });

            //insert new tags
            if (TagExists === false) {
              TagDb.insert({
                tag: tags,
                createdAt: new Date()
              });
            }
          });


    },
    fillTags: function() {

      var tags = "";
      ProfilTags.find({userId: Meteor.userId()}).forEach(function(object) {
        Meteor.myFunctions.addTagInInput(object.tag);

      });


    },
    showProfilSubmitForm: function(firstEdit) {


      Meteor.myFunctions.clearProfilForm();
      $('#profilContainer').show();
      $('#editFirstTime').hide();
      $('#submitProfilEditForm').show();
      // city
      $('.profilCity').hide();
      $('#editCity').hide();
      $('#profilCityEdit').show();
      $('#geolocationChoiceContainer').show();
      $('#profilCityEditSubmit').hide();
      $('#cancelProfilCityEditSubmit').hide();
      // photo
      $('.profilPhoto').hide();
      $('#editPhoto').hide();
      $('#profilPhotoEdit').show();
      $('#profilPhotoEditSubmit').hide();
      $('#cancelProfilPhotoEditSubmit').hide();
      //  pseudo
      $('#profilPseudo').hide();
      $('#editPseudo').hide();
      $('#profilPseudoEdit').show();
      $('#profilPseudoEditSubmit').hide();
      $('#cancelProfilPseudoEditSubmit').hide();
      //  bio
      $('#profilBio').hide();
      $('#editBio').hide();
      $('#profilBioEdit').show();
      $('#profilBioEditSubmit').hide();
      $('#cancelProfilBioEditSubmit').hide();
      //  tags
      $('#profilTags').hide();
      $('#editTags').hide();
      $('#tagsContainer').show();
      $('#profilTagsEditSubmit').hide();
      $('#cancelProfilTagsEditSubmit').hide();
    },

    clearProfilForm : function() {

      // clear form
      $("#profilPseudoEdit").val("");
      $("#profilPhotoEdit").val("");
      $("#profilCityEdit").val("");
      $("#profilBioEdit").val(Session.get('bioValue'));
      $('.tagLi').remove();


    },

    getGeolocalization : function() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(Meteor.myFunctions.showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },
    showPosition : function(position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          Session.set("localization", {"latitude": latitude, "longitude": longitude });
          Meteor.myFunctions.getCityAccordingToLatLng(latitude, longitude);
          // Session.set("geoLocalizedCity", )
    },
    checkCheckBoxAccorgingToDB : function() {
          Meteor.myFunctions.setSessionCheckBox(false, function(err, response) {
            console.log("callback time ?");
          });

    },
    setCityInInput : function (city) {
          $('#profilCityEdit').val(city);
    },
    getCityAccordingToLatLng : function (latitude, longitude) {

      // var latitude = 44;
      // var longitude = 4;
      $.ajax({url: "http://maps.googleapis.com/maps/api/geocode/json?latlng="+ latitude+","+longitude+"&sensor=true", success: function(result){
                  console.log("getCityAccordingToLatLng", result);
                  console.log(result.results[0]);
                  var city;
                  $.each(result.results[0].address_components, function(i, address_component) {
                    console.log(address_component);

                    if (address_component.types[0] == "locality") {
                        console.log("found", address_component.types[0]);
                        city = address_component.long_name;
                    }
                  });
                  console.log("city", city);
                  Meteor.myFunctions.setCityInInput(city);
      }});
    },
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
    setCitySuggestions : function() {
      results = Session.get("citySearchResults");
      results.predictions.forEach(function (cityObject) {
        cityObject.terms.forEach(function (location) {
          if (location.offset === 0) {
            Meteor.myFunctions.createSuggestion(location.value, '#citySuggestionsContainer', 'cityDiv', '#searchCity');
          }
        });
      });
    },
    findCityAC : function(inputedLetters) {
      Session.set("citySearchResults", "");
      Meteor.call('findCityACServerSide', inputedLetters, function(err, response){
        console.log("findCityAC call");
                if (err) {
                  console.log(err);
                } else {
                  console.log(response);
                  var results = response.data;
                  // results = JSON.stringify(results);
                  console.log(results);
                  Session.set("citySearchResults", results);
                  return results;
                }
      });
      setTimeout(function(){
        console.log("sessionResults", Session.get("citySearchResults"));
        Meteor.myFunctions.setCitySuggestions(Session.get("citySearchResults"));
      }, 300);

    }
};
      // $.ajax({url: "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+inputedLetters+"&types=%28cities%29&language=fr&key=AIzaSyDOqNgcJgVCMV_KJpYlWDekJHwDmEtZr_w", success: function(result){
      //     console.log(result);
      //   }
      // });
