Template.HomePage.rendered = function() {
      Session.set('currentProfil', '');
};


// Template.HomePage.created = function() {
//   if (Accounts._verifyEmailToken) {
//     Accounts.verifyEmail(Accounts._verifyEmailToken, function(err) {
//       if (err != null) {
//         if (err.message == 'Verify email link expired [403]') {
//           swal('This verification link has expired.')
//         }
//       } else {
//         swal('You have been verified!')
//       }
//     });
//   }
// };

Accounts.onEmailVerificationLink(function(token, done) {
  //your own logic
  Accounts.verifyEmail(token, function(error){
   if(!error) {
     Router.go("ProfilPage");
     alert('Email Vérifié ! Remplissez votre profil pour rencontrer d\' autres utilisateurs !');
   }
   done();
  });
});
