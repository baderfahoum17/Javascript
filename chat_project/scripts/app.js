const chatList = document.querySelector('.chat-list');
const chatform = document.querySelector('.new-chat')
const nameform = document.querySelector('.new-name');
const updatemssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

// console.log(nameform);
// console.log(form);
console.log(chatList);

// room selection, using event delegation
rooms.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        // clear the dom 
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        // we need to set up a new listener after unsubing 
        chatroom.getChats((chatdata) => {
            chatUI.render(chatdata);
        });
    }
})

// add a new chat
chatform.addEventListener('submit', e => {
    e.preventDefault();
    let message = chatform.message.value.trim();
    // console.log(message);
    chatroom.addChat(message).then(() => chatform.reset())
        .catch(err => console.log(err));
})

//update username
nameform.addEventListener('submit', e => {
    e.preventDefault();
    let name = nameform.name.value.trim();
    console.log(name);
    chatroom.updateName(name);

    //reset the form
    nameform.reset();
    // show and hide the update message
    updatemssg.innerText = `Your name was update to: ${name}`;
    setTimeout(() => { updatemssg.innerText = '' }, 3000);
});

// check localStorage for a name
const username = localStorage.username ? localStorage.username : 'Unkown'
const chatname = localStorage.room ? localStorage.room : "general";

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom(chatname, username);

// get the chats and render
chatroom.getChats((data) => {
    chatUI.render(data);
})

