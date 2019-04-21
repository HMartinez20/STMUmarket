/* JS used for seller.html */
console.log("2:19");

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
	  console.log("IN");
	  console.log(user);
    // User is signed in.
  } else {
	  console.log(" Not In");
    // No user is signed in.
  }
});

/* get UID passed in URL, url format is https://hmartinez20.github.io/STMUmarket/seller.html#"UIDgoesHere" */
var sellerId = window.location.hash.substring(1)
console.log(sellerId);
	/* redirect to home page if no variable was passed */
	if (!(window.sellerId)){
		alert("Error Occurred, Redirecting to Home Page");
		window.location = "https://hmartinez20.github.io/STMUmarket/";
	}
/*
$( document ).ready(function() { 
*/
/* see if user is signed in */
	if (firebase.auth().currentUser){
		console.log("Signed In")
	}
	else{
		console.log("Not signed In")
	}

	
	/*load the seller's data from  firebase */
	db.collection("users").doc(window.sellerId).get().then(function(doc) {
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
			
			
			/* Get and display seller's listings, will load max of 12 listings */
			db.collection('items').where('seller', '==', data.username).where('sold', '==', "no").get().then((snapshot) => {
						console.log("getting active listings");
						var postCount = snapshot.size;
						var postNum = 0;
						var listings = document.createElement("div"); /* container for listings */
						var dRow; /* row of listings */
						/* add a listing card for each listing */
						snapshot.docs.forEach(doc => {
							if (postNum % 3==0){ /* start new row */
								dRow = document.createElement("div");
								dRow.className = "row";	
							}
							postNum+=1;
						
							/* get image url */
							var imgSrc = "{{site.baseurl}}/Empty.jpg";
							if(doc.data().image1){ imgSrc = doc.data().image1; }
							/* create col for listing */
							var col = document.createElement("div");
							col.setAttribute("class","col-4");
							/* create card for listing */
							var card = document.createElement("div");
							card.setAttribute("class","card");
							card.innerHTML= '<img src="'+imgSrc+'" class="card-img-top" style="max-width:500px; max-height:500px;"/>'; 
							card.innerHTML += '<div class="card-body"><a class="card-title" href="' + ('item.html#' + doc.id) + '" target="_blank">'+ doc.data().title +'</a><p class="card-text">$'+ doc.data().price;
							card.innerHTML += '</p></div>';
							
							col.appendChild(card);
							dRow.appendChild(col);
							
							if (postNum % 3==0 || postNum==postCount){ listings.appendChild(dRow); }
						})
						document.getElementById("sellerListings").appendChild(listings);
					})
			var sellerBio = document.createElement("p");
			sellerBio.innerHTML = "Average Rating: " + data.avgRating + "<br>";
			sellerBio.innerHTML += "# of Ratings: " + data.ratings + "<br>";
			sellerBio.innerHTML += data.bio;
			document.getElementById("sellerInfo").appendChild(sellerBio);
	    	} else {
        		// doc doesn't exist
        		alert("Invalid seller, redirecting to Home Page");
			window.location = "https://hmartinez20.github.io/STMUmarket/";
   		 }
		}).catch(function(error) {
   		 	console.log("Error getting document:", error);
		});	
/*
}); 
*/

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

