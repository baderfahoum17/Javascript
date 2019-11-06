// adding new chat documents
// setting up a real-time listener to get new chats
// updating the suername
// updating the room 


class Chatroom {
    constructor(room,username){
        this.username = username;
        this.room = room;
        this.chats = DB.collection('chats');
        this.unsub;
    }
    async addChat(message){
        //format chat object
        const now = new Date();
        const chat = {
            message: message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        // save the chat document
        const response = await this.chats.add(chat);
        return response;
    }

    // setup real time listeners
    getChats(callback){
        this.unsub = this.chats
        .where('room','==',this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type == 'added'){
                    //update the UI
                    callback(change.doc.data());
                }
            });
        });
    }

    updateName(username){
        this.username = username;
        localStorage.setItem('username', username);
    }
    updateRoom(room){
        this.room = room;
        localStorage.setItem('room',room);
        console.log('room updated');
        // stop listening to the old room when we change room
        if(this.unsub){
            this.unsub();
        }
    }

}

// setTimeout(() => {
//     chatroom.updateRoom('gaming')
//     // chatroom.addChat("hello test everyone").then(()=> console.log('chat added'))
//     chatroom.updateName('Ali')
//     chatroom.getChats((data) =>{
//         console.log(data);
//     });
//     chatroom.addChat('hello');
// },3000);