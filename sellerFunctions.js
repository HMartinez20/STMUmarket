/* JS used for seller.html */

console.log("4:23");

$( document ).ready(function() {	
/* see if user is signed in */
	if (firebase.auth().currentUser){
		console.log("Signed In")
	}
	else{
		console.log("Not signed In")
	}

	/* get UID passed in URL, url format is https://hmartinez20.github.io/STMUmarket/seller.html#"UIDgoesHere" */
	var sellerId = window.location.hash.substring(1)
	/* TESTING, prints UID */
	console.log(sellerId)

	/*load the seller's data from  firebase */
	db.collection("users").doc(sellerId).get().then(function(doc) {
		if (doc.exists) { 
			/* get and store min amount of seller data needed, omit sensitive information */
			var data = doc.data();
			var email = data.email;
			var name = data.first + data.last;
			var username = data.username;
			/*  var bio = data.bio;  */
			
		
			/* popover for contact seller, uses email retrieved from db */
			$('#popover2').popover(
				{
				html:true,
				content: "To contact, send email to " + email + " <br> and include STMUM and posting number as email subject",
				trigger: "focus"
				}				
			);
			
			
			/* set and display seller username to html*/
			var seller = document.createElement('h1');
			seller.innerHTML = username;
			document.getElementById('sellerName').appendChild(seller);
			
			
			/* Popover for Ratings */
			$('#popover1').popover(); 
			
			/*sample for 1 folder files */
			let ref = firebase.database().ref("child/path");
			
			
			/*
			.orderByChild('seller')
			*/
			ref.child('items').once("value", (snapshot) => {
				console.log(snapshot.val());
				console.log("Got snapshot");
				console.log(snapshot.size);
				var s = snapshot.size;
				console.log(s);
				
			});
	
			
			/* Get and display seller's listings */
			db.collection(username).get().then((snapshot) => {
				var postCount = snapshot.size;
				var postNum = 0;
				var cardImage = "<img class='card-image-top mt-3' src='Empty.jpg' style='background-color: blue;' alt=''></img>";
				/* container for listings */
				var listings = document.createElement("div");
				/* listings.className = "container"; */
				/* row of listigs */
				var dRow;
				/* listing card, contains image, title, and price */
				var card;
				/* add a listing card for each listing */
				snapshot.docs.forEach(doc => {
					if (postNum % 4==0){
						dRow = document.createElement("div");
						dRow.className = "row";	
					}
					postNum+=1;
					
					var post = doc.data();
					/* listing's title and price in card body */
					var cardBody = "<div class='card-body'><h4 class='card-title'>"
					cardBody+= post.title + "</h4><p class='card-text'> Asking Price: $" + post.price + "</p></div>";
			
					card = document.createElement("div");
					card.className = "card col-3";
					card.innerHTML = cardImage + cardBody;
					dRow.appendChild(card);	
					
					if (postNum % 4==0 || postNum==postCount){
						listings.appendChild(dRow);	
					}
				})
				
				document.getElementById("sellerListings").appendChild(listings);
			})
	    	} else {
        	// doc doesn't exist
        	console.log("Requested document does not exist...");
   		 }
		}).catch(function(error) {
   		 	console.log("Error getting document:", error);
		});	
}); 

/* Function to set seller information, remove later
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
*/	

