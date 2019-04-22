/* This Javascript function is checks to see if the user is typing the same password on both lines and lets the usesr know if they are 
   typing it correctly or not.

*/
var check = function() {
  if (document.getElementById('pass').value ==
    document.getElementById('passwordRepeat').value) {
    document.getElementById('message').style.color = 'green';
    document.getElementById('message').innerHTML = 'matching';
    console.log("test");
  } else {
    document.getElementById('message').style.color = 'red';
    document.getElementById('message').innerHTML = 'not matching';
  }
  console.log("good"); /* This is for error checking on the console tab when inspecting the website. */
}
