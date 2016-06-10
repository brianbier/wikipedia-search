var search = (function(){
  function  searchRequest(search){
      $.ajax( {
        url: "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch="+ search + "&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max",
        jsonp: "callback",
        dataType: 'jsonp',
        data: { 
          action: "query", 
          list: "search", 
          srsearch: "javascript", 
          format: "json" 
        },
        xhrFields: { withCredentials: true },
        headers:{'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
        success: function(data) {
          localStorage.setItem("data",data);
          success(data);
        }

      });    
  }

  function success(data){
      var html = '';
        $.each(data.query.pages, function(key,value){
            var link = "https://en.wikipedia.org/?curid=";
            html += "<ul><a href="+link + value.pageid +" target='_blank'><li><h1>" + value.title + "</h1><p>"+value.extract +"</p></li></a></ul>";
        });
      $('.wrapper').html(html);
  }

  window.onpopstate = function(e){
    var res = localStorage.getItem('response');
    success(res);
  };


  function search(event){
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    var target = $(event.target);
    var request = target.find('input[name="search-request"]').val();
    searchRequest(request);
    target.trigger("reset");
  }

  function init(){
    $('form').on('submit', search);
  }
  
  return {
    init: init
  };

})();

$(document).ready(search.init);
