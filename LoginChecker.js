
$( document ).ready(function() {
  	firebase.auth().onAuthStateChanged(function(user) {
  		if (user) {
			document.getElementById("login").setAttribute("hidden","");
        document.getElementById("signUp").setAttribute("hidden","");
			alert("Welcome: "+user.email);
  		} else {
        document.getElementById("myAccout").setAttribute("hidden","");
        document.getElementById("signOut").setAttribute("hidden","");
    		console.log(' not signed in');
  		}
		});
	});

