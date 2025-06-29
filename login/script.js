var t=window.location.search
var token=t.replace('?authid=','')

if(token===""){
  location.href='https://pushkarsharma2006.github.io/seenzone/logind/?continue=https://pushkarsharma2006.github.io/chat/login/'
}
else{
  localStorage.authid=token

  location.href='https://pushkarsharma2006.github.io/chat/'
}
