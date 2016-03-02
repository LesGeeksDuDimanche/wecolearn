Meteor.publish("profil", function () {
  return Profil.find();
});
Meteor.publish("discussions", function () {
  return Discussions.find();
});

Meteor.startup(function () {
  Meteor.methods({
      findCityACServerSide: function() {
          var inputedLetters = "Lyo";
          Meteor.http.post("https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+inputedLetters+"&types=%28cities%29&language=fr&key=AIzaSyDOqNgcJgVCMV_KJpYlWDekJHwDmEtZr_w", function(err, result) {
                  if (!err) {
            console.log("result" + result);
            // console.log("string" + JSON.stringify(result, {indent: true}));
            // return JSON.stringify(result, {indent: true});
            return 'hello !';
                  }
      // do something with the result.
          });
      }
  });
          // $.ajax({url: "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+inputedLetters+"&types=%28cities%29&language=fr&key=AIzaSyDOqNgcJgVCMV_KJpYlWDekJHwDmEtZr_w", success: function(result){
          //   }
        // });
});
// Template.ProfilPage.rendered = function() {
//   var inputedLetters = "Lyo";
//   $.ajax({url: "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+inputedLetters+"&types=%28cities%29&language=fr&key=AIzaSyDOqNgcJgVCMV_KJpYlWDekJHwDmEtZr_w", success: function(result){
//     console.log(result);
//     }
//   });
// };
