
Template.ProfilPage.events({

    'change .fileInput':function(event,tmpl){
      FS.Utility.eachFile(event,function(file){
        var fileObj = new FS.File(file);
        console.log(fileObj);
        Uploads.insert(fileObj,function(err, fileObj){
          console.log(err);
        console.log(fileObj);
        Session.set("currentPhotoId", fileObj._id);
        });
      });
    },

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

      var ProfilCreated = false;

      Profil.find().forEach(function(object){
          if (object.userId === userId) {
            ProfilCreated = true;
          }
      });
      var localization;
      if (Session.get("AuthorizeGeolocation") === 1) {
        localization = {'authorization' : 0, 'localization' : Session.get("localization")};
      } else {
        localization = {'authorization' : 0, 'localization' : 0};
      }

      if(userId !== null && ProfilCreated === false) {

      // Insert a profile into the collection
        Profil.insert({
          userId: userId,
          pseudo: pseudo,
          photo: photo,
          city: city,
          Biography: bio,
          localization: localization,
          createdAt: new Date()
        });



      }

      // Insert profil-linked tags in database
      tagListArray.forEach(function(tag) {
          ProfilTags.insert({
            userId: userId,
            tag: tag
          });
      });

      // hide edit
      Meteor.myFunctions.hideProfilEditSubmit();
      $('#submitProfilEditForm').hide();


      // refresh/load profil
      var profil = Profil.findOne({userId: Meteor.userId()});

      Meteor.myFunctions.loadProfil(profil);



      // tag in database
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
    "click #editFirstTime" : function() {
        Meteor.myFunctions.showProfilSubmitForm();
    },
    'click #geolocationChoice' : function(e) {
      console.log("message");
      Meteor.myFunctions.setSessionCheckBox(true);

    },
    "input #tags" : function(event) {
      console.log($('#tags').text());
      Session.set("tagInput", $('#tags').text());
    },
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
    "click .tagLi" : function(event) {
      console.log("tagLi");
      event.stopPropagation();
    },
    "click #tagsContainer" : function(event) {
      // Session.get()
      $('#tags').focus();
      console.log("tagsContainer");
    },


// Edit City

    "click #editCity" : function (event) {
      Meteor.myFunctions.hideProfilEditSubmit();
        $('.profilCity').hide();
        $('#editCity').hide();
        $('#profilCityEdit').show();
        $('#geolocationChoiceContainer').show();
        $('#profilCityEditSubmit').show();
        $('#cancelProfilCityEditSubmit').show();
    },
    "click #profilCityEditSubmit": function () {

        Meteor.myFunctions.cityProfilEdit();

    },
    "click #cancelProfilCityEditSubmit": function () {

        Meteor.myFunctions.hideProfilEditSubmit();

    },
    //Auto-complete
    "input #profilCityEdit" : function(event) {

      var input = event.currentTarget.value;

      Meteor.myFunctions.findCityAC(input);


    },
// Edit Photo

    "click #editPhoto" : function (event) {
      Meteor.myFunctions.hideProfilEditSubmit();
        $('.profilPhoto').hide();
        $('#editPhoto').hide();
        $('#profilPhotoEdit').show();
        $('#profilPhotoEditSubmit').show();
        $('#cancelProfilPhotoEditSubmit').show();
    },
    "click #profilPhotoEditSubmit": function () {

        Meteor.myFunctions.photoProfilEdit();

    },
    "click #cancelProfilPhotoEditSubmit": function () {

        Meteor.myFunctions.hideProfilEditSubmit();

    },


// Edit Pseudo

    "click #editPseudo" : function (event) {
      Meteor.myFunctions.hideProfilEditSubmit();
        $('#profilPseudo').hide();
        $('#editPseudo').hide();
        $('#profilPseudoEdit').show();
        $('#profilPseudoEditSubmit').show();
        $('#cancelProfilPseudoEditSubmit').show();
    },
    "click #profilPseudoEditSubmit": function () {

        Meteor.myFunctions.pseudoProfilEdit();

    },
    "click #cancelProfilPseudoEditSubmit": function () {

        Meteor.myFunctions.hideProfilEditSubmit();

    },


// Edit Tags

    "click #editTags" : function (event) {
      Meteor.myFunctions.hideProfilEditSubmit();
          $('#profilTags').hide();
          $('#editTags').hide();
          $('#tagsContainer').show();
          $('#profilTagsEditSubmit').show();
          $('#cancelProfilTagsEditSubmit').show();
      Meteor.myFunctions.fillTags();
    },
    "click #profilTagsEditSubmit": function () {
            Meteor.myFunctions.tagsProfilEdit();

    },
    "click #cancelProfilTagsEditSubmit": function () {
            Meteor.myFunctions.hideProfilEditSubmit();
    },

    // Edit Bio

        "click #editBio" : function (event) {
          Meteor.myFunctions.hideProfilEditSubmit();
              $('#profilBio').hide();
              $('#editBio').hide();
              $('#profilBioEdit').show();
              $('#profilBioEditSubmit').show();
              $('#cancelProfilBioEditSubmit').show();
        },
        "click #profilBioEditSubmit": function () {
                Meteor.myFunctions.bioProfilEdit();
        },
        "click #cancelProfilBioEditSubmit": function () {
                Meteor.myFunctions.hideProfilEditSubmit();
        },




});



  Template.ProfilPage.rendered = function() {
        Meteor.subscribe("profil", function() {
          if (Profil.findOne({userId: Meteor.userId()})) {
            Meteor.myFunctions.loadProfil(Profil.findOne({userId: Meteor.userId()}));
            $('#editFirstTime').hide();
            $('#submitProfilEditForm').hide();
          } else {
            $('#profilContainer').hide();
            $('#editFirstTime').show();
          }
          Meteor.myFunctions.checkIfNeedsScroll('#profilTags', 160);
          Meteor.myFunctions.checkCheckBoxAccorgingToDB();
        });
  };



  Template.ProfilPage.helpers({
    hiddenForm: function () {
      return Session.get("hiddenform");
    },
    pseudo: function () {
      return Session.get("pseudoValue");
    },
    photo: function () {
      return Session.get("photoValue");
    },
    // photo: function () {
    //   return Uploads.findOne();
    // },
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
