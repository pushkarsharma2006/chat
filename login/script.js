var t=window.location.search
var token=t.replace('?authid=','')

if(token===""){
  location.href='https://sharmapushkar-coder.github.io/Disclosure/logind/?continue=https://chat.connectopia.repl.co/login/'
}
else{
  localStorage.authid=token

  location.href='https://sharmapushkar-coder.github.io/chat/'
}
