
Template.registerPage.events({
      'submit form': function(event){
          event.preventDefault();
          var email = $('[name=email]').val();
          var password = $('[name=password]').val();
          Accounts.createUser({
              email: email,
              password: password
              }, function(error){
                    if(error){
                        console.log(error.reason); // Output error if registration fails
                    } else {
                        Router.go("HomePage"); // Redirect user if registration succeeds
                    }
          });
      }
  });
