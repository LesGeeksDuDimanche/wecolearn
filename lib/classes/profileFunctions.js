Meteor.profileFunctions = {

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  insertProfileIntoProfileDB : function (userId, pseudo, photo, city, bio, tagListArray) {

    var ProfilCreated = false;

    Profil.find().forEach(function(object){
      if (object.userId === userId) {
        ProfilCreated = true;
      }
    });

    if(userId !== null && ProfilCreated === false) {

      // Insert a profile into the collection
      Meteor.call("insertIntoProfilDB", userId, pseudo, photo, city, bio, 0, function (err, result) {
        if (err) {
          console.log("insertIntoProfilDB","err", err);
        } else {
          if (Session.get("AuthorizeGeolocation") === 1) {
            Meteor.profileFunctions.localizationProfilEdit();
          } else {
            Meteor.profileFunctions.getGeolocalizationFromCity(city);
          }
        }
      });
    }

    // Insert profil-linked tags in profilTagDatabase
    Meteor.profileFunctions.insertIntoProfilTagDB(tagListArray, userId);

    // tags in Tagdatabase
    Meteor.profileFunctions.insertIntoTagDB(tagListArray);
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  insertIntoProfilTagDB: function(tagListArray, userId) {
    tagListArray.forEach(function(tag) {
      Meteor.call("insertIntoProfilTagsDB", userId, tag, function (err, result) {
        if (err) {
          console.log("insertIntoProfilTagsDB","err", err);
        }
        else {
          Meteor.profileFunctions.loadOrRefreshProfil();
        }
      });
    });
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  insertIntoTagDB: function(tagListArray) {

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
        console.log("insertingTags", tags);
        Meteor.call("insertIntoTagDB", tags, function (err, result) {
          if (err)
          console.log("insertIntoTagDB","err", err);
        });
      }
    });

  },





  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  getGeolocalizationFromCity : function (city) {

    var APIRequest = "http://nominatim.openstreetmap.org/search?q="+city+"+fr&format=json";
    Meteor.call('ASyncAjaxRequest', APIRequest, function(err, response){
      console.log("getGeolocalizationFromCity call");
      if (err) {
        console.log(err);
      } else {
        console.log(response);
        var results = {"latitude" : Number(response.data[0].lat),
        "longitude" : Number(response.data[0].lon)};
        // results = JSON.stringify(results);
        console.log(results);
        Session.set("geolocationFromCityResults", results);
        return results;
      }
    });
    setTimeout(function(){
      console.log("getGeolocalizationFromCityTimeOut", Session.get("geolocationFromCityResults"));
      return Meteor.profileFunctions.localizationProfilEdit(Session.get("geolocationFromCityResults"));
    }, 800);
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadOrRefreshProfil : function () {

    console.log("loadOrRefreshProfil");
    var profil = Profil.findOne({userId: Meteor.userId()});
    console.log("loadOrRefreshProfil", profil);
    var tags = "";
    ProfilTags.find({userId: Meteor.userId()}).forEach(function(object) {
      tags += object.tag + " ";
    });
    Meteor.myFunctions.loadProfil(profil);
    Meteor.profileFunctions.hideProfilEditSubmit();
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  cityProfilEdit : function () {

    var city = $('#profilCityEdit').val();
    if (Session.get("AuthorizeGeolocation") === 1) {
      Meteor.profileFunctions.localizationProfilEdit();
    } else {
      Meteor.profileFunctions.getGeolocalizationFromCity(city);
    }
    var object = Profil.findOne({userId: Meteor.userId()});
    Meteor.call("updateProfilDB", object._id, 'city', city, function (err, result) {
      if (err) {
        console.log("updateProfilDB", "err", err);
      }
      else {
        Meteor.profileFunctions.loadOrRefreshProfil();
      }
    });
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  localizationProfilEdit : function(geolocationFromCityResults) {

    console.log("localizationProfilEdit", "geolocationFromCityResults", geolocationFromCityResults );
    var object = Profil.findOne({userId: Meteor.userId()});
    console.log("localizationProfilEdit", "object", object );
    var localization;
    if (Session.get("AuthorizeGeolocation") === 1 && Session.get("localization")) {
      localization = {'authorization' : 1, 'localization' : Session.get("localization")};
    } else if (geolocationFromCityResults) {
      localization = {'authorization' : 0 , 'localization' : geolocationFromCityResults};
    } else {
      localization = {'authorization' : 0 , 'localization' : 0};
    }
    Meteor.call("updateProfilDB", object._id, 'localization', localization, function (err, result) {
      if (err) {
        console.log("updateProfilDB", "err", err);
      }
    });
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  photoProfilEdit : function () {

    var photo = Session.get("currentPhotoId");
    console.log(photo);
    var object = Profil.findOne({userId: Meteor.userId()});
    Meteor.call("updateProfilDB", object._id, 'photo', photo, function (err, result) {
      if (err) {
        console.log("updateProfilDB", "err", err);
      } else {
        Meteor.profileFunctions.loadOrRefreshProfil();
      }
    });
  },

  // ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  // uploadPhoto : function (fileObj) {
  //
  //   Uploads.insert(fileObj,function(err, fileObj){
  //       if(err) {
  //         console.log(err);
  //       } else
  //   console.log(fileObj);
  //   Session.set("currentPhotoId", fileObj._id);
  //   });
  // }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  pseudoProfilEdit : function () {

    var pseudo = $('#profilPseudoEdit').val();
    var object = Profil.findOne({userId: Meteor.userId()});
    Meteor.call("updateProfilDB", object._id, 'pseudo', pseudo, function (err, result) {
      if (err) {
        console.log("updateProfilDB", "err", err);
      } else {
        console.log("pseudoProfilEdit call shouldwork", result);
        Meteor.profileFunctions.loadOrRefreshProfil();
      }
    });
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  bioProfilEdit : function () {

    var bio = $('#profilBioEdit').val();
    var object = Profil.findOne({userId: Meteor.userId()});
    Meteor.call("updateProfilDB", object._id, 'Biography', bio, function (err, result) {
      if (err) {
        console.log("updateProfilDB", "err", err);
      } else {
        Meteor.profileFunctions.loadOrRefreshProfil();
      }
    });
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  tagsProfilEdit : function () {


    var userId = Meteor.userId();
    var tagListArray = [];
    var tagList = document.getElementsByClassName('tagLi');
    for (var i = 0; i < tagList.length; i++) {
      tagListArray.push(tagList[i].textContent);
    }


    // delete profil-linked tags in database
    ProfilTags.find({userId: Meteor.userId()}).forEach(function(object){
      Meteor.call("removeFromProfilDB", object._id, function (err, result) {
        if (err) {
          console.log("removeFromProfilDB", "err", err);
        }
      });
    });


    // Insert profil-linked tags in database
    tagListArray.forEach(function(tag) {
      Meteor.call("insertIntoProfilTagsDB", userId, tag, function (err, result) {
        if (err) {
          console.log("insertIntoProfilTagsDB", "err", err);
        } else {
          Meteor.profileFunctions.loadOrRefreshProfil();
        }
      });
    });

    // tags in Tagdatabase
    Meteor.profileFunctions.insertIntoTagDB(tagListArray);
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
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

    Meteor.profileFunctions.clearProfilForm();

    // hide send button

    $('#submitProfilEditForm').hide();


  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  showProfilSubmitForm: function() {

    Meteor.profileFunctions.clearProfilForm();
    $('#profilContainer').show();
    $('#editFirstTime').hide();
    $('#submitProfilEditForm').show();
    // city
    $('.profilCity').hide();
    $('#editCity').hide();
    $('#profilCityEditContainer').show();
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

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  clearProfilForm : function() {

    // clear form
    $("#profilPseudoEdit").val("");
    $("#profilPhotoEdit").val("");
    $("#profilCityEdit").val("");
    $("#profilBioEdit").val(Session.get('bioValue'));
    $('.tagLi').remove();

  },
};
