var apiURL = 'http://api.quickwiki.info/json?q=';

function showResult(data) {
  $('#result').html(data);
  $('#result').removeClass('blank');
}

$(document).ready(function() {
  $('#result').addClass('blank');

  $('#search_form').submit(function(e) {
    e.preventDefault();
    var query = $('#search').val();
    if(query != '') {
      $('#result').addClass('blank');
      $.get(apiURL + encodeURI(query), function(data) {
        if(typeof data != 'object') {
          try {
            data = JSON.parse(data);
          } catch(e) {
            data = {};
          }
        }
        if(data.result == 'text') {
          showResult(data.data);
        } else {
          showResult('Could not found article');
        }
      });
    }
  })
});