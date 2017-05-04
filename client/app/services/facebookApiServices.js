//require_once __DIR__ . '/vendor/autoload.php';

//var facebook_API_KEY = "63ba423109b2b8a006b9a4e255259c68";

window.fbAsyncInit = function() {
    FB.init({
      appId: '243919602679320',
      cookie: true, // This is important, it's not enabled by default
      version: 'v2.2',
      status: true
    });

    FB.getLoginStatus(function(response) {
      if(response.status === 'connected') {
        console.log('user is connected with facebook')
      } else if (response.status === 'not_authorized') {
        console.log('not authorized');
      } else {
        console.log('not logged onto facebook')
      }
    })
  };

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));