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


    clearTagSuggestions : function (tagClass) {
      var tagDivs = $(tagClass);
      for (var i = 0; i < tagDivs.length; i++) {
        console.log(tagDivs[i].id);
        tagDivs[i].remove();
      }
    },

    useTagInInput : function (tag) {
      $('#searchInput').val(tag);
      Meteor.myFunctions.clearTagSuggestions('.tagDiv');
    },

    createTagSuggestion : function (tagName){
      // check if suggestion tag already exists
      // var tagNameString = '#'+tagName;
      // console.log(typeof $(tagNameString));
      // console.log($(tagNameString).id);
      if (!document.getElementById(tagName)) {
      // create div
        var parentNode = document.getElementById('inputContainer');
        var tagDiv = document.createElement('div');
        tagDiv.id = tagName;
        tagDiv.className = 'tagDiv';
        tagDiv.innerHTML = tagName;
        tagDiv.onclick = function () { Meteor.myFunctions.useTagInInput(this.id); };
        parentNode.appendChild(tagDiv);
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
          $(id).css('overflow-y','auto');
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

      Meteor.myFunctions.clearTagSuggestions('.messageDateDiv');
      Meteor.myFunctions.clearTagSuggestions('.messageDiv');
      Meteor.myFunctions.clearTagSuggestions('.messagePseudoDiv');
      Meteor.myFunctions.clearTagSuggestions('.selectedPseudoNameMessage');

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
          Profil.update(
            {
              _id: object._id
            },
            {
              $set: {
                city: city,
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


    }





};
