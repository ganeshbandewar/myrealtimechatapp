const socket = io()
let name;
let text = document.querySelector('#textarea')
let portionmessage = document.querySelector('.message_portion')
do {
    name = prompt('Please enter your name: ')
} while(!name)

text.addEventListener('keyup',function (e)
 {
    if(e.key === 'Enter') {
        reply(e.target.value)
    }
})

function reply(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    insert(msg, 'outgoing')
    text.value = ''
    takearrowdown()
socket.emit('message', msg)
}
/* this is to insert the message in the textbox*/
function insert(msg, type) {
    let newDiv = document.createElement('div')
    let classIMO = type
    newDiv.classList.add(classIMO, 'message')
 let csstothis = ` <h4>${msg.user}</h4><p>${msg.message}</p> `
    newDiv.innerHTML = csstothis
    portionmessage.appendChild(newDiv)
} 
socket.on('message',function(msg){
    insert(msg, 'incoming')
    takearrowdown()
})
function takearrowdown() {
    portionmessage.scrollTop = portionmessage.scrollHeight
}
