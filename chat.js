var database=firebase.database();
var authtoken=localStorage.getItem("authid")
var user_data_name
var txt , sender
var verified
var html=""
var home="https://sharmapushkar-coder.github.io/chat/"

setTimeout(function(){
        if (Notification.permission === 'granted') {
          var notification = new Notification('Buy Premium plans at just ₹10 ', {
          body: 'Notifications have been enabled.',
          icon: 'https://sharmapushkar-coder.github.io/Disclosure/LOGO.JPG'
        });

        notification.onclick = function() {
         alert("You can disable notifications at any time by clicking on the settings button at the left hand side of the url bar in your browser. Thank You")
        };
      }          
       },3000)

if ( window !== window.parent ) {
  location.href="about:blank"
} 
else {      
 Notification.requestPermission() 
}
if(typeof authtoken==="undefined"||authtoken===null||authtoken===""){
  location.href="login"
}
database.ref("login/"+authtoken).on("value",function(data){
  user_data_name=data.val().user
})

setTimeout(function(){
  if(typeof user_data_name==="undefined"||user_data_name===null||user_data_name===""){
    alert("Login failed please login again !")
    location.href="login"
  }
  else{
    database.ref("users/"+user_data_name).on("value",function(deta){
      verified=deta.val().verified
   })
  }
},7000)

setTimeout(function(){
  if(verified==="yes"){
    typer()
      document.getElementById("Msg_insert").innerHTML=""
      document.getElementById("msg_reading_div").style.display="block"
      document.getElementById("sender").style.display="block"
      document.getElementById("loading").style.display="none"
      console.log("Account is verified!")
      database.ref("chat").on("child_added",function(chat){
      txt=chat.val().msg,
      sender=chat.val().sender
      if(sender===user_data_name){
        html="<div align='right'><b class='g'id='message-"+chat.key+"'>You"+" : "+txt+"</b>"
        html+="<br><button data-id='"+ chat.key+"'onclick='del(this)'class='del'>Delete</button></br><br></br>"
        document.getElementById("Msg_insert").innerHTML+=html
         window.scrollTo(0,document.body.scrollHeight);
      }
      else if(typeof sender==="undefined"||sender===null||sender===""){
          //document.getElementById("noti-bot").play();
           html="<br></br><center><li style='background-color:white;color:black;padding:6px 6px 6px 6px;'>"+txt+"</li></center><br></br>"
        document.getElementById("Msg_insert").innerHTML+=html
      }
      else{
        html="<div align='left'><b class='g'>"+sender+" :"  +txt+"</b></div><br></br>"
        document.getElementById("Msg_insert").innerHTML+=html
        

        document.getElementById("noti").play();
         window.scrollTo(0,document.body.scrollHeight);
      }
     })
  }
  else if(verified==="no"){
    alert("You are not eligible to join this chat")
      // location.href="https://connectopia.repl.co/about/Activation.html"
    }
  else{
    document.write("<center><h1>We ran into a problem. </h1><br></br><button onclick='location.href=home'>Refresh</button></center>")
  }
},11000)
setTimeout(function(){
  window.scrollTo(0,document.body.scrollHeight);

},7000)





function send(){
  var msg_to_send=document.getElementById("msg-bar").value;
  if(msg_to_send===""){
    
  }
  else{
      database.ref("chat").push().set({
         'sender':user_data_name,
         'msg':msg_to_send
      })
     document.getElementById("msg-bar").value=""
     }

}


setInterval(function(){
  var user_verification
  database.ref("login/"+authtoken).on("value",function(data){
   user_verification=data.val().user;
  })
  if(typeof user_verification==="undefined"||user_verification===null||user_verification===""){
    
  }
  else if(user_verification!==user_data_name){
    document.getElementById("error").play();
    document.getElementById("msg_reading_div").innerHTML="<center><h2>Your actions were invalid !</h2>"
    document.getElementById("msg_reading_div").innerHTML+="<br></br><button onclick='window.history.back()'>Retry</button>"
    document.getElementById("sender").style.display="none"
  }
})




function del(self){
  var messId=self.getAttribute("data-id");
  database.ref("chat").child(messId).remove();

  
}
database.ref("chat").on("child_removed",function(chat){
    document.getElementById('message-'+chat.key).innerHTML="This Message has been deleted";
  })

function typer(){
  database.ref('typer').on('child_added',function(d){
    t=d.val().user
  })
  setInterval(function(){
    if(typeof t==="undefined"||t===null||t===""){
      
    }
    else if(t===user_data_name){
      document.getElementById("type").style.display="block"
      document.getElementById("type").innerHTML="You're Typing.."
      setTimeout(function(){
        document.getElementById("type").style.display="none";
        t=""
      },2000)
    }
    else{
      document.getElementById("type").style.display="block"
      document.getElementById("type").innerHTML=t+" is typing something..."
      setTimeout(function(){
        document.getElementById("type").style.display="none";
        t=""
      },2000)
    }
  })
}

function change(){
  database.ref('typer').push().set({
    'user':user_data_name
  })
}


function cache(){
  database.ref("typer").set({
    'del':null
  })
}
function saaf(){
  database.ref("chat").set({
    'msg':null
  })
}
setInterval(function(){
  cache()
},10000)
