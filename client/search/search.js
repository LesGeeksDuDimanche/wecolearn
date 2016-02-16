

Template.Search.events({

  'submit form': function(event){
      event.preventDefault();
      var userPseudo = Profil.find({userId: Meteor.userId()}).pseudo;
      var searchTag = $('[name=searchInput]').val();
      var searchCity = $('[name=searchCity]').val();
      var profil;
      var profils = [];
      console.log(searchCity + searchTag);
      var tags = "";
      var profilId;
      if (Profil.findOne({city: searchCity}) && (ProfilTags.findOne({tag: searchTag}))){
        Profil.find({city: searchCity}).forEach(function (object) {
          if (ProfilTags.findOne({$and: [{userId: object.userId}, {tag: searchTag}]}) && (object.userId !== Meteor.userId())) {
              profilId = ProfilTags.findOne({$and: [{userId: object.userId}, {tag: searchTag}]}).userId;
              profils.push(Profil.findOne({userId: profilId}));
          }
        });
        profil = profils[0];

        ProfilTags.find({userId: profil.userId}).forEach(function(tagObject) {
            console.log("currentprofilId " + profil.userId);
            console.log(tagObject.userId);
            console.log(tagObject.tag);
            tags += tagObject.tag + " ";
        });
        console.log("first search answer " + profil.pseudo);

        Session.set('currentProfil', profil);
        Session.set('currentSearch', profils );
        Session.set('currentTagSearch', tags);
        $('#noMatchMessage').hide();
      } else {
      console.log('no match !');

// OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
// -----------------------------------
// suggestions if no match is made...
// -----------------------------------

      // if(ProfilTags.findOne({city: city})){
      //
      //  profil = ProfilTags.findOne({city: city});
      //  ProfilTags.find({userId: profil.userId}).forEach(function(tagObject) {
      //      console.log(tagObject.tag);
      //      tags += tagObject.tag + " ";
      //  });
      //
      //  Profil.find({userId: profil.userId})
      //
      //  Session.set('currentProfil', profil);
      //  Session.set('currentSearch', profils );
      //  Session.set('currentTagSearch', tags);
    //  }

// OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO

       $('#noMatchMessage').show();


      }
      if (Router.current().route.getName() !== "searchPage") {
        Router.go("searchPage");
      } else {

        Meteor.myFunctions.loadProfil(profil, tags);
        Session.set('SearchCount', 1);
       }
      },
  'input #searchInput': function (event) {
    var input = event.currentTarget.value;
    console.log("input" + input);
    input = input.split("");
    TagDb.find().forEach(function(object){
      var splittedTag = object.tag.split("");
      for (var i = 0; i < splittedTag.length; i++) {
        console.log("i" + i);
        if(i===3 || splittedTag[i] !== input[i]) {
          break;
        }
        if(i===2 && splittedTag[i] === input[i]) {
          Meteor.myFunctions.createTagSuggestion(object.tag);
          console.log("createTagSuggestion");
        }
      }
    });
  },
  'blur #searchInput': function(event) {
    setTimeout(function(){Meteor.myFunctions.clearTagSuggestions('.tagDiv');}, 100);
  }

});



Template.searchPage.rendered = function() {
      if (Session.get('currentProfil') && Session.get('currentProfil') !== '') {
      console.log("onrendered : " + Session.get('currentProfil'));
      Meteor.myFunctions.loadProfil(Session.get('currentProfil') ,Session.get('currentTagSearch'));
      Session.set('SearchCount', 1);
      } else {
      $('#noMatchMessage').show();
      }
};



Template.searchPage.events({
    "click #nextSearch" : function() {
      var count = Session.get('SearchCount');
      console.log("count : " + count);
      var profils = Session.get('currentSearch');
      if(profils[count]) {
          Session.set('currentProfil', profils[count]);
          console.log(profils[count].pseudo);
          var tags = "";
          ProfilTags.find({userId: profils[count].userId}).forEach(function(tagObject) {
              tags += tagObject.tag + " ";
          });
          Session.set('currentTagSearch', tags);
          Meteor.myFunctions.loadProfil(profils[count], Session.get('currentTagSearch'));
      }
      else if (Session.get('currentProfil')){
        console.log(Session.get('currentProfil'));
        loadProfil(Session.get('currentProfil'), Session.get('currentTagSearch'));
      }
      count = count + 1;
      Session.set('SearchCount', count);
    },
    "click #contact" : function() {
      Router.go('MessagesPage');
    }
});




Template.searchPage.helpers({

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