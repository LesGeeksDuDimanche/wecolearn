Template.searchPage.rendered = function() {
      Meteor.subscribe("profil", function() {
        if (Session.get('currentProfil') && Session.get('currentProfil') !== '') {
          Meteor.myFunctions.loadProfil(Session.get('currentProfil'));

// -------------------------------------------------------------------
          // This doesnt work....
          // $('.contactContainer').hide();
          // $('.contactContainer').css('display', 'none');
// -------------------------------------------------------------------

        }
      });

};
