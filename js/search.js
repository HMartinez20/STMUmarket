/* Javscript for index page
   Generates the table to display all current, unsold items from
	 our Firebase database.
	 Last Updated: 4/30/2019 by Hailey Martinez
 */

var category = "none"; // On page load, change selected category to none

// When the filter is changed, the table is cleared and
// re-generated according to the new filter.
function changeFilter(newFilter, newOrder){
	//console.log(newFilter+", "+newOrder);
	if(category != "none"){ genListings(category, newFilter, newOrder); }
}

/*TEST:
query = query.where(x, '==', y)
...
query.get()...
*/

// Search listings and display based on category and filters
// On page load, set default search parameters
function genListings(search = 'none', filter = 'price', order = 'asc'){
	//console.log(search+", "+filter+", "+order);
	category = search; // Change category to selected category
	if(search != 'none'){
		var query = db.collection("items").where("category", "==", search);
		document.getElementById("paginate").innerHTML = ''; // Clear page buttns
		query.get().then(function(querySnapshot){
			var noPages = (querySnapshot.size > 16)? Math.ceil(querySnapshot.size/16)+1: 1;
			console.log(querySnapshot.size, Math.ceil(querySnapshot.size/16)+1, noPages);
			for(var i = 1; i <= noPages; i++){
				var pageBtn = document.createElement("label");
				pageBtn.setAttribute("class","btn btn-outline-primary");
				if(i == 1){ pageBtn.setAttribute("class", "btn btn-outline-primary active"); }
				pageBtn.setAttribute("id", "page"+i);
				pageBtn.setAttribute("onclick", "genPage('page"+i+"', "+(((i-1)*16)+1)+", '"+search+"', '"+filter+"', '"+order+"')");
				pageBtn.innerHTML= i+'<input type="radio" name="options">';
				document.getElementById("paginate").appendChild(pageBtn);
			}
		});
		genPage('page1', 1, search, filter, order);

		// Show the appropriate category "badge" as confirmation of category change
		var badgeArray = ["books","clothing","electronics","furniture","other"];
		badgeArray.forEach(function(item){
			 document.getElementById(item+"Badge").setAttribute("hidden","");
		});
		var badge = document.getElementById(search+"Badge");
		if(badge.hasAttribute("hidden")){ badge.removeAttribute("hidden"); }
	}
}

function genPage(pgNo, setStart, search, filter, order){
	console.log(pgNo, setStart, search, filter, order);
	
	document.getElementById("listings").innerHTML = ''; // Clear table
	var query = db.collection("items").where("category", "==", search).orderBy(filter, order);
	query.limit(16).startAt(setStart).get().then(function(querySnapshot){
		querySnapshot.forEach(function(doc){
			if(doc.data().sold == "no"){ // Only show unsold listings
				var imgSrc = "{{site.baseurl}}/Empty.jpg"; // Default image
				if(doc.data().image1){ imgSrc = doc.data().image1; }

				var card = document.createElement("div");
				card.setAttribute("class","card-block col-3");
				card.innerHTML= '<img src="'+imgSrc+'" class="card-img-top img-thumbnail" style="object-fit: contain; height: 12rem;"/>'; 
				card.innerHTML += '<div class="card-body pl-0 pb-0 pr-0"><p class="text-truncate card-title"><a href="' + ('item.html#' + doc.id) + '" target="_blank">'+ doc.data().title +'</a></p><p class="card-text">$'+ doc.data().price;
				card.innerHTML += '</p></div>';

				document.getElementById("listings").appendChild(card);
			}
		});
		document.getElementById("pageBtns").removeAttribute("hidden"); // Result page buttons
	});
}
