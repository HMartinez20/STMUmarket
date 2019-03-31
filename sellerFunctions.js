/* JS used for seller.html */
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
		/*if (doc.exists) { */
			/* get and store min amount of seller data needed, omit sensitive information */
			var data = doc.data();
			var email = data.email;
			var name = data.first + data.last;
			var username = data.username;
			/*  var bio = data.bio;  */
			
		
			/* popover for contact seller, uses email retrieved from db */
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
				var postCount = snapshot.size;
				
				var cardImage = "<img src='Empty.jpg' class='card-img-top mt-3' style='background-color: grey;' alt=''></img>";
				var listings = document.createElement("div");
				listings.className = "container";
				var dRow = document.createElement("div");
				dRow.className = "row";
				var card;
				
				snapshot.docs.forEach(doc => {
					console.log(doc.data())
					var post = doc.data();
					
					var cardBody = "<div class='card-body'><h6 class='card-title'>"
					cardBody+= post.title + "</h6><p class='card-text'>" + post.price + "</p></div>";
			
					card = document.createElement("div");
					card.className = "card col-3";
					card.innerHTML = cardImage + cardBody;
					dRow.appendChild(card);
				
					
					
				})
				listings.appendChild(dRow);
				document.getElementById("sellerListings").appendChild(listings);
			})
		/* Code for loading seller's posting 
		var count = 4;
		var rowCount = 2;
		*/
		/*
		var card = "<div class='card col-3'>";
		var dRow = "<div class='row' >";
		var dcol = "<div class='col-sm'>";
		var divEnd = "</div>";
		var cardImage = "<img src='Empty.jpg' class='card-img-top mt-3' style='background-color: grey;' alt=''></img>";
		var cardBody = "<div class='card-body'><h6 class='card-title'>Title</h6><p class='card-text'>Description</p></div>";
			
		var iDiv = document.createElement('div');
		iDiv.id = 'dcard';
		iDiv.className = 'container';
		iDiv.innerHTML = "";	
			
		for(i=0;i<rowCount;i++){
			iDiv.innerHTML+= dRow;
			
			for(j=0;j<count;j++){
				iDiv.innerHTML+= dcol + card + cardImage + cardBody + divEnd + divEnd;
			}
			 iDiv.innerHTML+= divEnd; 
		}
			
	
			
		document.body.appendChild(iDiv);
		*/	
		/*
		pratice code for loading listings
	
		var cardImage = "<img src='Empty.jpg' class='card-img-top mt-3' style='background-color: grey;' alt=''></img>";
		var cardBody = "<div class='card-body'><h6 class='card-title'>Title</h6><p class='card-text'>Description</p></div>";
			
		var listings = document.createElement("div");
		listings.className = "container";
		var dRow = document.createElement("div");
		dRow.className = "row";
		var card;
		for(i=0;i<4;i++){
			card = document.createElement("div");
			card.className = "card col-3";
			card.innerHTML = cardImage + cardBody;
			dRow.appendChild(card);
		}
		listings.appendChild(dRow); */
		/* document.body.appendChild(listings); 
		document.getElementById("sellerListings").appendChild(listings); 
		*/
			
						      
		/* end sample code for dynamic div */
			
		/*	
	    	} else {
        	// doc.data() will be undefined in this case
        	console.log("No such document!");
   		 }
		 */
		}).catch(function(error) {
   		 	console.log("Error getting document:", error);
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
	
	
	
	
}); /* doc ready end */
