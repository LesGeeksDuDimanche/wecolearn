Meteor.publish("profil", function () {
  return Profil.find();
});
Meteor.publish("discussions", function () {
  return Discussions.find();
});

Future = Npm.require('fibers/future');
// Meteor.startup(function () {


      Meteor.methods({
        'findCityACServerSide': function(inputedLetters) {
            var fut = new Future();
            setTimeout(
                Meteor.bindEnvironment(
                    function() {
                      Meteor.http.post("https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+inputedLetters+"&types=%28cities%29&language=fr&key=AIzaSyDOqNgcJgVCMV_KJpYlWDekJHwDmEtZr_w", function(err, result) {
                        fut.return(result);
                      });

                    },
                    function(exception) {
                        console.log("Exception : ", exception);
                        fut.throw(new Error("Async function throw exception"));
                    }
                ),
                50
            );
            return fut.wait();
        }
      });
// });
          // $.ajax({url: "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+inputedLetters+"&types=%28cities%29&language=fr&key=AIzaSyDOqNgcJgVCMV_KJpYlWDekJHwDmEtZr_w", success: function(result){
          //   }
        // });
// Template.ProfilPage.rendered = function() {
//   var inputedLetters = "Lyo";
//   $.ajax({url: "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+inputedLetters+"&types=%28cities%29&language=fr&key=AIzaSyDOqNgcJgVCMV_KJpYlWDekJHwDmEtZr_w", success: function(result){
//     console.log(result);
//     }
//   });
// };

// var asyncFunc = function(callback){
//
//       setTimeout(function(){
//
//         console.log("asyncFunc");
//             var result = function () {
//               var inputedLetters = "Lyo";
//               Meteor.http.post("https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Lyo&types=%28cities%29&language=fr&key=AIzaSyDOqNgcJgVCMV_KJpYlWDekJHwDmEtZr_w", function(err, result) {
//                 if(!err) {
//                   return result;
//                 } else {
//                   return err;
//                 }
//               });
//             };
//             console.log("result" + result());
//
//             callback(null, result);
//
//       },2000);
//   };
//   var syncFunc = Meteor.wrapAsync(asyncFunc);

//
// var findCityACRequest = function() {
//           var inputedLetters = "Lyo";
//           Meteor.http.post("https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+inputedLetters+"&types=%28cities%29&language=fr&key=AIzaSyDOqNgcJgVCMV_KJpYlWDekJHwDmEtZr_w", function(err, result) {
//             if(!err) {
//               return result;
//             } else {
//               return err;
//             }
//           });
// };
