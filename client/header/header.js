
Template.header.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('HomePage');
    },
    // 'click .nav li a' : function(event){
    //   if ($('.active')) {
    //     $('.active').removeClass('active');
    //   }
    //   $(event.target).addClass('active');
    // }
});

Template.header.rendered = function () {
      var routeName = "#" + Router.current().route.getName() + "Li";
      console.log("routeName",routeName);
        if ($('.active')) {
          $('.active').removeClass('active');
        }
      $(routeName).addClass('active');
      // $('#')
};
