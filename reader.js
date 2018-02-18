
function lookup(title){
  $.ajax({
    type: "GET",
    url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=" + title +"&callback=?",
    contentType: "application/json; charset=utf-8",
    async: false,
    dataType: "json",
    success: function (data, textStatus, jqXHR) {
      
      var markup = data.parse.text["*"];

      var blurb = $('<div></div>').html(markup);
      // remove links as they will not work
      blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });
      // remove any references
      blurb.find('sup').remove();
      // remove cite error
      blurb.find('.mw-ext-cite-error').remove();
      var newtext = ($(blurb).find('p'));
      
      var temparray = [];
      var textarray = [];

      
      for (var i = 0; i < newtext.length; i++) {
        temparray.push(newtext[i].innerText.split(' ').join(',').split('-').join(',').split(','));
      }

      for (var i = 0; i < temparray.length; i++) {
        for (var j = 0; j < temparray[i].length; j++) {
          
          textarray.push(temparray[i][j]);

        }
      }


      var startButton = $('<input type="button" id ="playButton" value="Read" />');
      $("#playDiv").append(startButton);

      $("#playButton").click(function() {
        play(textarray);
      });

    },
      error: function (errorMessage) {
        alert("API Call Failed!");
      }
  });
}

// *************************************
function play(textarray) {
  console.log(textarray);
  $("#playDiv").html("");
  $("#playDiv").height(10);
  $('#playDiv').css('margin-top',10);
  $("#speedRead").css("border-style","solid");
  
  var i = 0;
  var time = 175;
  function myLoop (textarray) {
     setTimeout(function () {
        console.log(textarray[i]);
        $("#speedRead").html(textarray[i]);
        i++;
        if (i < textarray.length) {
           myLoop(textarray);
        }
        else{
          $("#speedRead").html("");
          $("#speedRead").css("border-style","none");
        }
     }, time)
  }

  myLoop(textarray);

}
// *************************************







// Adds item to list on click
$("#searchButton").click(function() {
  if ($("#searchTerm").val() != "") {
    console.log("not blank");
    var title = $("#searchTerm").val();
    console.log(title);
    lookup(title);
    $("#searchTerm").val("");
  }
});

// adds item to list on enter press
$(document).keypress(function(e) {
  if (e.which == 13) {
    if ($("#searchTerm").val() != "") {
      console.log("not blank");
      var title = $("#searchTerm").val();
      console.log(title);
      lookup(title);
      $("#searchTerm").val("");
    }
  }
});





