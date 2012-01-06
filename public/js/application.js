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
        switch(data.result) {
          case 'text':
            showResult(data.data);
            break;
          case 'list':
            var result = "<ul>";
            $.each(data.data, function(index, value) {
              result += "<li><a href='#' ref='" + encodeURI(value.link) + "'>" + value.text + "</a></li>";
            });
            result += "</ul>";
            showResult(result);
            break;
          case 'missing':
            showResult(data.data);
            break;
          case 'error':
            showResult(data.data);
            break;
          default:
            showResult('Server error - please try again later.');
        }
      });
    }
  });

  $('#result li a').live('click', function() {
    var url = decodeURI($(this).attr('ref'));
    $('#search').val(url);
    $('#search_form').submit();
  });
});