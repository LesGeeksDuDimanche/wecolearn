Meteor.messageFunctions = {
    showProfil: function(pseudo) {
        Session.set('currentProfil',Profil.findOne({pseudo: pseudo}));        
        Router.go('contactProfilPage');
        // -------------------------------------------------------------------
                  // This doesnt work....
                  // $('.contactContainer').hide();
                  // $('.contactContainer').css('display', 'none');
                  // $('#contact').hide();
                  // $('#contact').css('display', 'none !important');
        // -------------------------------------------------------------------

    }
};
