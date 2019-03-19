/* JS used for seller.html */
var email = "hello";

/* Get and display seller's name */
	var sellerID = "seller"; 

db.collection("users").doc(sellerID).get()
	.then(function(doc) {
    		if (doc.exists) {
			var data = doc.data();
			var html = "<h1> " + data.username + " </h1>";
			email = data.email;
			console.log(email);
			
			$('#popover2').popover(
			{
				content: "To contact, send email to" + email + "and include STMUM and posting number as email subject"
			}
		);
	    	} else {
        	// doc.data() will be undefined in this case
        	console.log("No such document!");
   		 }
		}).catch(function(error) {
   		 	console.log("Error getting document:", error);
		});	


$('#popover1').popover(); 

 $('#popover2').popover(
	{
	content: "To contact, send email to " + email + " \n and include STMUM and posting number as email subject"
	}
);
	


/* Script to toggle popover */
/*
	$(document).ready(function () 
		{ $("[data-toggle=popover]").popover(); });
*/



	
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


/* Get and display seller's name */
	var sellerID = "seller";
		db.collection("users").doc(sellerID).get()
		.then(function(doc) {
    			if (doc.exists) {
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


/* Function to access seller information, currently testing */
	$("#setinfo").click(function(){
		db.collection("users").doc("seller").set({
    			email: "srodriguezgome@mail.stmarytx.edu",
			first: "Salvador",
			last: "Rodriguez",
			username: "srodriguezgome"
		})
		.then(function() {
    			console.log("Document successfully written!");
		})
		.catch(function(error) {
    			console.error("Error writing document: ", error);
		});
	});



