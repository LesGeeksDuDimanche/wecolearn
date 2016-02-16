Meteor.myFunctions = {

    loadProfil : function (currentObject, tags) {

    Session.set('pseudoValue', currentObject.pseudo);
    Session.set('photoValue', currentObject.photo);
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

     fitTagInputWidth : function (tagName) {

        var tagWidth = $('#profil'+tagName).width();
        var tagInputWidth = $('#tags').width();
        var fullWidth = 100 /  document.documentElement.clientWidth;
        tagWidth = tagWidth * fullWidth;
        tagInputWidth = tagInputWidth * fullWidth;
        var newTagInputWidth = (tagInputWidth - tagWidth - 1.2);
        console.log("width measured" +  newTagInputWidth);
        if (newTagInputWidth < 15) {
          newTagInputWidth = 80;
        // console.log($('#tags').css("margin-top").replace("px", ""));
        console.log($('#tags').css("height").replace("px", ""));
        var newHeight =  ($('#tags').css("height").replace("px", "") * fullWidth) - 4;
        // var newMargin = ($('#tags').css("margin-top").replace("px", "") * fullWidth) + 4;
        // console.log(newMargin);
        console.log(newHeight);
        // $('#tags').css("margin-top",newMargin + "vw");
        $('#tags').css("height",newHeight + "vw");
        }
        $('#tags').width( newTagInputWidth + "vw");
        // $('#tags').focus();
        console.log("focusagain");
    },

     fillUl : function (tagName){
        var parentNode = document.getElementById('tagUl');
        var tagLi = document.createElement('li');
        tagLi.id = "profil" + tagName;
        tagLi.className = 'tagLi';
        tagLi.innerHTML = tagName;
        tagLi.contentEditable = false;
        parentNode.appendChild(tagLi);
        Meteor.myFunctions.fitTagInputWidth(tagName);
    },

     createUl : function (tagName) {
        var parentNode = document.getElementById('tagsContainer');
        var tagUl = document.createElement('ul');
        tagUl.id = "tagUl";
        tagUl.className = 'tagUl';
        var tagsNode = document.getElementById('tags');
        parentNode.insertBefore(tagUl, tagsNode);
        Meteor.myFunctions.fillUl(tagName);
    },


     addTagInInput : function (tagName) {
      if (!document.getElementById("profil" + tagName)) {
        if (!document.getElementById("tagUl")) {
          Meteor.myFunctions.createUl(tagName);
        } else {
          Meteor.myFunctions.fillUl(tagName);
        }
      }
    },

     deleteLastList : function() {
      $('.tagUl li:last').remove();
    },


     addPseudo : function (name, selected) {
      var parentNode = $('#profilPseudo');
      var childNode = $("<div class='messagePseudoDiv'></div>");
      childNode.text(name);
      childNode.attr('id',name);
      parentNode.append(childNode);

      if (selected) {
        childNode.attr('id', 'selectedPseudoNameMessage');
      } else {
        childNode.click(function () { Meteor.myFunctions.loadMessagePage(this.id); });
      }
    },





     setPseudo : function (selectedName, otherNames) {
      Meteor.myFunctions.addPseudo(selectedName, true);
      var userPseudo = Profil.findOne({userId: Meteor.userId()}).pseudo;
      console.log(otherNames);
      otherNames.forEach(function (object) {
        if((object.user1 !== userPseudo) && (object.user1 !== selectedName)) {
            Meteor.myFunctions.addPseudo(object.user1, false);
          } else if ((object.user2 !== userPseudo) && (object.user2 !== selectedName)){
            Meteor.myFunctions.addPseudo(object.user2, false);
            }
        });
    },

     enterMessage : function (discussion) {
      discussion.forEach(function (messageObject) {
        var dateNode = $('<div class="messageDateDiv"</div>');
        var messageNode = $('<div class="messageDiv"></div>');
        messageNode.text(messageObject.user + " : " + messageObject.message);
        dateNode.text(messageObject.date);
        $('#messagesContainer').append(messageNode);
        $('#messagesContainer').append(dateNode);
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
        console.log(user2Pseudo);
        console.log(discussions);
        Meteor.myFunctions.setPseudo(user2Pseudo, discussions);

    }
















};
