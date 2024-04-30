var t=window.location.search
var token=t.replace('?authid=','')

if(token===""){
  location.href='https://sharmapushkar-coder.github.io/socioai/logind/?continue=https://sharmapushkar-coder.github.io/chat/login/'
}
else{
  localStorage.authid=token

  location.href='https://sharmapushkar-coder.github.io/chat/'
}
