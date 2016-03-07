Meteor.searchFunctions = {

    keyHover : function (containerId) {


      // var length = $(divs).length;
      // console.log(length);
      // console.log($(divs)[0]);
      // element = $(divs)[0];


      var childNumber = 0;
      var hoveredDiv = containerId + " div:nth-child("+childNumber+")";
      console.log(hoveredDiv);
      // var elem = document.getElementById('tagSuggestionsContainer');
      // elem.children[0].style.className = "keyHover";
      // console.log( elem.children[0].style.className);
      // console.log($("#tagSuggestionsContainer div:nth-child(0)"));
      // // console.log($('#tagSuggestionsContainer div')[0]);
      // //
      // $("#tagSuggestionsContainer div:nth-child(0)").addClass("keyHover");
      $("#tagSuggestionsContainer div:nth-child(0)").attr("class", "keyHover");
      // // $('#tagSuggestionsContainer div')[0].addClass("keyHover");
      $('#tagSuggestionsContainer div')[0].attr("class","keyHover");
      //


      // $(divs)[0].attr("class", "keyHover");

    }





};
