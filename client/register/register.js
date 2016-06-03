
Template.registerPage.events({
      'submit form': function(event){
          event.preventDefault();
          var email = $('[name=email]').val();
          var doubleEmail = $('[name=doubleEmail]').val();
          var password = $('[name=password]').val();
          if (email === doubleEmail) {
            Accounts.createUser({
                email: email,
                password: password
                }, function(error){
                      if(error){
                          console.log(error.reason); // Output error if registration fails
                      } else {
                          $('#registerFormContainer').hide();
                          $('#verifyEmailContainer').show();
                          console.log(Meteor.userId());
                          console.log(Meteor.user().emails[0].address);
                          Accounts.sendVerificationEmail(Meteor.userId(), Meteor.user().emails[0].address);
                          Router.go("ProfilPage"); // Redirect user if registration succeeds
                      }
            });
          } else {
            alert("Les emails ne correspondent pas.");
          }
      }
  });
