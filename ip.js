// Function to fetch user IP Address from a third-party service
function getUserIP(callback){
  fetch('https://api.ipify.org/?format=json')
  .then(response => response.json())
  .then(data => callback(data.ip));
}

// Call the function to get the user's IP Address
getUserIP(ip => {
  console.log("User IP Address: ", ip);
});