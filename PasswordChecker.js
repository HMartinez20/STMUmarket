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
  console.log("good");
}
