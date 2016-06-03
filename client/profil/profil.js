Template.ProfilPage.rendered = function() {

      Meteor.subscribe("profil", function() {

        if (Profil.findOne({userId: Meteor.userId()})) {
          Meteor.myFunctions.loadProfil(Profil.findOne({userId: Meteor.userId()}));
          $('#editFirstTime').hide();
          $('#submitProfilEditForm').hide();
        } else {
          $('#profilContainer').hide();
          Meteor.profileFunctions.showProfilSubmitForm();
        }
        Meteor.myFunctions.checkIfNeedsScroll('#profilTags', 160);
        Meteor.myFunctions.checkCheckBoxAccorgingToDB();
      });
};

Template.ProfilPage.events({

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    'change .fileInput':function(event,tmpl){

      FS.Utility.eachFile(event,function(file){
        var fileObj = new FS.File(file);
        Uploads.insert(fileObj,function(err, fileObj){
          console.log(err);
          console.log(fileObj);
            if(err) {
              console.log(err);
            } else {
              console.log(fileObj._id);
              Session.set("currentPhotoId", fileObj._id);
              // $('.fileInput').
            }
        });
      });

      // FS.Utility.eachFile(event,function(file){
      //   var fileObj = new FS.File(file);
        // Meteor.profileFunctions.uploadPhoto(event);
      // });
    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    "submit .profilForm": function (event) {

      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var userId = Meteor.userId();
      var pseudo = event.target.pseudo.value;
      var photo = Session.get("currentPhotoId");
      var city = event.target.city.value;
      var bio = event.target.biography.value;
      var tagListArray = [];
      var tagList = document.getElementsByClassName('tagLi');
      for (var i = 0; i < tagList.length; i++) {
        tagListArray.push(tagList[i].textContent);
      }

      //inserts profile in DB
      Meteor.profileFunctions.insertProfileIntoProfileDB(userId, pseudo, photo, city, bio, tagListArray);

    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    'click #geolocationChoice' : function(e) {
      console.log("message");
      Meteor.myFunctions.setSessionCheckBox(true);

    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    "input #tags" : function(event) {
      console.log($('#tags').text());
      Session.set("tagInput", $('#tags').text());
    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    "focus #tags" : function(event) {
      $('#tags').keypress(function(e){
        var key = e.which || e.keyCode;
        if (key === 13 || key === 32) {
          e.preventDefault();
       }
      });
      $('#tags').keyup(function (e) {
          e.stopPropagation();
          var key = e.which || e.keyCode;
          if (key === 13 || key === 32) { // 13 is enter, 32 is space
            e.preventDefault();
            var value = Session.get("tagInput");
            console.log(value + "value");
            // $('#tags').blur();
            $('#tags').text("");
            Meteor.myFunctions.addTagInInput(value);
          }
          if ((key === 8) && ($('#tags').text() === "")){
            Meteor.myFunctions.deleteLastList();
          }
      });
    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    "click .tagLi" : function(event) {
      console.log("tagLi");
      event.stopPropagation();
    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    "click #tagsContainer" : function(event) {
      // Session.get()
      $('#tags').focus();
      console.log("tagsContainer");
    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    "click #editCity" : function (event) {
      Meteor.profileFunctions.hideProfilEditSubmit();
        $('.profilCity').hide();
        $('#editCity').hide();
        $('#profilCityEdit').show();
        $('#profilCityEditContainer').show();
        $('#geolocationChoiceContainer').show();
        $('#profilCityEditSubmit').show();
        $('#cancelProfilCityEditSubmit').show();
    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    "click #profilCityEditSubmit": function () {

        Meteor.profileFunctions.cityProfilEdit();


    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    "click #cancelProfilCityEditSubmit": function () {

        Meteor.profileFunctions.hideProfilEditSubmit();

    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Auto-complete
      "input #profilCityEdit" : function(event) {
        if (Session.get("AuthorizeGeolocation") === 0) {
          Meteor.myFunctions.clearSuggestions('.cityDiv');
          var input = event.currentTarget.value;
          console.log("input searchCity", input);
          if (input !== "") {
            Meteor.myFunctions.findCityAC(input, '#profilCityEdit');
          }
        }
      },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    "click #editPhoto" : function (event) {
      Meteor.profileFunctions.hideProfilEditSubmit();
        $('.profilPhoto').hide();
        $('#editPhoto').hide();
        $('#profilPhotoEdit').show();
        $('#profilPhotoEditSubmit').show();
        $('#cancelProfilPhotoEditSubmit').show();
    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    "click #profilPhotoEditSubmit": function () {

        Meteor.profileFunctions.photoProfilEdit();

    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    "click #cancelProfilPhotoEditSubmit": function () {

        Meteor.profileFunctions.hideProfilEditSubmit();

    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    "click #editPseudo" : function (event) {
      Meteor.profileFunctions.hideProfilEditSubmit();
        $('#profilPseudo').hide();
        $('#editPseudo').hide();
        $('#profilPseudoEdit').show();
        $('#profilPseudoEditSubmit').show();
        $('#cancelProfilPseudoEditSubmit').show();
    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    "click #profilPseudoEditSubmit": function () {

        Meteor.profileFunctions.pseudoProfilEdit();

    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    "click #cancelProfilPseudoEditSubmit": function () {

        Meteor.profileFunctions.hideProfilEditSubmit();

    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    "click #editTags" : function (event) {
      Meteor.profileFunctions.hideProfilEditSubmit();
          $('#profilTags').hide();
          $('#editTags').hide();
          $('#tagsContainer').show();
          $('#profilTagsEditSubmit').show();
          $('#cancelProfilTagsEditSubmit').show();
      Meteor.myFunctions.fillTags();
    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    "click #profilTagsEditSubmit": function () {
            Meteor.profileFunctions.tagsProfilEdit();

    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    "click #cancelProfilTagsEditSubmit": function () {
            Meteor.profileFunctions.hideProfilEditSubmit();
    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
        "click #editBio" : function (event) {
          Meteor.profileFunctions.hideProfilEditSubmit();
              $('#profilBio').hide();
              $('#editBio').hide();
              $('#profilBioEdit').show();
              $('#profilBioEditSubmit').show();
              $('#cancelProfilBioEditSubmit').show();
        },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
        "click #profilBioEditSubmit": function () {
                Meteor.profileFunctions.bioProfilEdit();
        },

///////////////////////////////////////////////////////////////////////////////////////////////////////////
        "click #cancelProfilBioEditSubmit": function () {
                Meteor.profileFunctions.hideProfilEditSubmit();
        },
});




Template.ProfilPage.helpers({

    pseudo: function () {
      return Session.get("pseudoValue");
    },
    photo: function () {
      return Session.get("photoValue");
    },
    city: function () {
      return Session.get("cityValue");
    },
    Tags: function () {
      return Session.get("tagsValue");
    },
    Bio: function () {
      return Session.get("bioValue");
    }
});
