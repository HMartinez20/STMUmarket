/* JS used for seller.html */
/* Get and display seller's name */
	var sellerID = "seller"; 
/*	load seller data	*/



if (firebase.auth().currentUser){
	console.log("Signed In")
}
else{
	console.log("Not signed In")
}


var seller = window.location.hash.substring(1)
console.log(seller)

/* db.collection('users').doc(firebase.auth().currentUser.uid).get()  */
db.collection("users").doc(seller).get()
	.then(function(doc) {
		if (doc.exists) {
			var data = doc.data();
			var email = data.email;
			var firstName = data.first;
			var lastName = data.last;
			var username = data.username;
			var postCount = data.posts;
			/*  var bio = data.bio;  */
			console.log(email);	
			
			$('#popover2').popover(
				{
				content: "To contact, send email to " + email + " \n and include STMUM and posting number as email subject",
				trigger: "focus"
				}				
			);
			var html = "<h1> " + username + " </h1>";
			$("#sellerName").html(html);
			
			$('#popover1').popover(); 
			
			
			/* sample getting documents from collection */
			
			db.collection(username).get().then((snapshot) => {
				snapshot.docs.forEach(doc => {
					console.log(doc.data())
				})
			})
			/* Code for loading seller's posting */
		var count = 4;
		var rowCount = postCount % 4;
		if ( (postCount%4) !== 0 ) {
			rowCount++;
		}
		var html = "";
		
		for (i=0;i<rowCount;i++){
			html+= "<div class='row' >"
			for(j=0;j<count;j++){
				html+= "<div class='card col-3' href='#'>";
				html+= "<img src='https://github.com/HMartinez20/STMUmarket/blob/master/Empty.jpg' height='200' width='200'>" 
				/* html+= "alt=''>"  */
				html+= "<div class='card-body'><h6 class='card-title'>Title</h6><p class='card-text'>"
				html+= "Description </p></div>"
				html+= " </div>";
				html+= "<br>";
			}
			html+= "</div>"
		}
		$("#sellerListings").html(html);
			
		/* pratice appending dynamic div elements */
		var cardImage = "<img src='Empty.jpg' class='card-img-top mt-3' style='background-color: grey;' alt=''></img>";
		var cardBody = "<div class='card-body'><h6 class='card-title'>Title</h6><p class='card-text'>Description</p></div>";
			
		var iDiv = document.createElement('div');
		iDiv.id = 'dcard';
		iDiv.className = 'card col-3';
		iDiv.innerHTML = cardImage + cardBody;
			
		document.body.appendChild(iDiv);
			
		/* end sample code for dynamic div */
			
	    	} else {
        	// doc.data() will be undefined in this case
        	console.log("No such document!");
   		 }
		}).catch(function(error) {
   		 	console.log("Error getting document:", error);
		});	
	
	 
/* popover for Ratings   */



/* Script to toggle popover */
/*
	$(document).ready(function () 
		{ $("[data-toggle=popover]").popover(); });
*/
/*
		var count = 4;
		var rowCount = 2;
		var html = "";
		
		for (i=0;i<rowCount;i++){
			html+= "<div class='row' >"
			for(j=0;j<count;j++){
				html+= "<div class='card col-3' >";
				html+= "<img src='{{site.baseurl}}/Empty.jpg' class='card-img-top mt-3' style='background-color: grey;'" 
				html+= "alt=''>"
				html+= "<div class='card-body'><h6 class='card-title'>Title</h6><p class='card-text'>"
				html+= "Description </p></div>"
				html+= " </div>";
				html+= "<br>";
			}
			html+= "</div>"
		}
		$("#sellerListings").html(html);
*/

/* Get and display seller's name 
$( document ).ready(function() {
var html = "<h1> " + username + " </h1>";
$("#sellerName").html(html);
});
*/


/*
	var sellerID = "seller";
		db.collection("users").doc(sellerID).get()
		.then(function(doc) {
    			if (doc.exists) {
				console.log("getting username");
				var data = doc.data();
				var html = "<h1> " + data.username + " </h1>";
				
				$("#sellerName").html(html);
	    		} else {
        		// doc.data() will be undefined in this case
        		console.log("No such document!");
   		 	 }
		})
		.catch(function(error) {
   		 	console.log("Error getting document:", error);
		});	
*/

/* Function to access seller information, currently testing */
	$("#setinfo").click(function(){
		db.collection("sampleseller").doc("samplelistings").set({
    			email: "srodriguezgome@mail.stmarytx.edu",
			first: "Salvador",
			last: "Rodriguez",
			username: "srodriguezgome",
			bio: "Hello. I am a Junior at St Mary's."
		})
		.then(function() {
    			console.log("Document successfully written!");
		})
		.catch(function(error) {
    			console.error("Error writing document: ", error);
		});
	});



