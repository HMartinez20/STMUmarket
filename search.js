var filter = 'price';
var order = 'asc';
var category = "none";

function changeFilter(newFilter, newOrder){
	filter = newFilter;
	order = newOrder;
  if(category != "none"){
		genListings(category);
	}
}

// search listings and display based on category and filters
function genListings(search){
	category = search;
  document.getElementById("listings").innerHTML = '';
  db.collection("items").where("category", "==", search).orderBy(filter, order).get().then(function(querySnapshot){
    querySnapshot.forEach(function(doc){ // doc.data() is never undefined for query doc snapshots
      if(doc.data().sold == "no"){ // only show unsold listings
        // create card for listing and append to the page
        var placeholder = document.createElement("div");
        placeholder.setAttribute("class","col-3");

        var imgSrc = "{{site.baseurl}}/Empty.jpg";
        if(doc.data().image1){ imgSrc = doc.data().image1; }

        var card = document.createElement("div");
        card.setAttribute("class","card");
        card.innerHTML= '<img src="'+imgSrc+'" class="card-img-top"/>'; 
        card.innerHTML += '<div class="card-body"><a class="card-title" href="' + ('item.html#' + doc.id) + '" target="_blank">'+ doc.data().title +'</a><p class="card-text">$'+ doc.data().price;
        card.innerHTML += '</p></div>';

        placeholder.appendChild(card);
        document.getElementById("listings").appendChild(placeholder);
      } // end of if
    });
  });
  
  var badgeArray = ["books","clothing","electronics","furniture","other"];
  badgeArray.forEach(function(item){
     document.getElementById(item+"Badge").setAttribute("hidden","");
  });
  
  var badge = document.getElementById(search+"Badge");
  if(badge.hasAttribute("hidden")){ badge.removeAttribute("hidden"); }
  //     else{ badge.setAttribute("hidden",""); }
}
