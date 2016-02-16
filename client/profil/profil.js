
Template.ProfilPage.events({

    "submit .profilForm": function (event) {

      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var userId = Meteor.userId();
      var pseudo = event.target.pseudo.value;
      var photo = event.target.photo.value;
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

      console.log(ProfilCreated);

      if(userId !== null && ProfilCreated === false) {

      // Insert a profile into the collection
        console.log(tags);
        Profil.insert({
          userId: userId,
          pseudo: pseudo,
          photo: photo,
          city: city,
          Biography: bio,
          createdAt: new Date()
        });



      } else {
        console.log("edited");
        var object = Profil.findOne({userId: Meteor.userId()});

          Profil.update(
            {
              _id: object._id
            },
            {
              $set: {
                pseudo: pseudo,
                photo: photo,
                city: city,
                Biography: bio
              }
            }
          );

        // delete profil-linked tags in database
        ProfilTags.find({userId: Meteor.userId()}).forEach(function(object){
          console.log("is it deleting ?");
          ProfilTags.remove({_id: object._id});
        });



      }

      // Insert profil-linked tags in database
        tagListArray.forEach(function(tag) {
              ProfilTags.insert({
                userId: userId,
                tag: tag
              });
        });

      // Clear form
      event.target.pseudo.value = "";
      event.target.photo.value = "";
      event.target.city.value = "";
      event.target.biography.value = "";
      $('.tagUl').remove();

      // hide form
      Session.set('hiddenform', 'hidden');

      // show button
      $('#editProfil').show();
      $('#profilContainer').show();


      // refresh/load profil
      var profil = Profil.findOne({userId: Meteor.userId()});
      console.log(profil.pseudo);
      var tags = "";
      ProfilTags.find({userId: Meteor.userId()}).forEach(function(object) {
          tags += object.tag + " ";
      });
      console.log(tags);

      Meteor.myFunctions.loadProfil(profil, tags);



      // tag in databse
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
    "click #editProfil" : function() {
        Session.set('hiddenform', '');
        $('#editProfil').hide();
        $('#editFirstTime').hide();
        $('#profilContainer').hide();
    },
    "click #editFirstTime" : function() {
        Session.set('hiddenform', '');
        $('#editProfil').hide();
        $('#editFirstTime').hide();
        $('#profilContainer').hide();
    },
    "input #tags" : function(event) {
      console.log($('#tags').text());
      Session.set("tagInput", $('#tags').text());
    },
    "focus #tags" : function(event) {
      $('#tags').keydown(function (e) {
          var key = e.which || e.keyCode;
          if (key === 13 || key === 32) { // 13 is enter, 32 is space
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
    }
  });



  Template.ProfilPage.rendered = function() {
        console.log("profil page");
        Session.set('hiddenform', 'hidden');
        if (Profil.findOne({userId: Meteor.userId()})) {
          console.log("loaded");
          var tags = "";
          ProfilTags.find({userId: Meteor.userId()}).forEach(function(object) {
              console.log(object.tag);
              tags += object.tag + " ";
          });
          console.log(tags);
          Meteor.myFunctions.loadProfil(Profil.findOne({userId: Meteor.userId()}), tags);
          $('#editProfil').show();
          $('#editFirstTime').hide();
        }
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
