$(document).on( "click", "#sign-in-btn", function(){
  var _username = $('#inputEmail').val();
  var _password = $('#inputPassword').val();
  var _rememberMe = $('#remember-me-cb').is(':checked');
  var _data = JSON.stringify({ username : _username, password: _password, rememberMe: _rememberMe });
  $.ajax({
    url: "/api/user/login",
    type: "POST",
    contentType: "application/json", 
    data: _data 
  })
  .done(function(data) {
    if(data.state === "success")
      window.location.href = data.url;
    else
      alert(data.msg);
  }); 
}); 