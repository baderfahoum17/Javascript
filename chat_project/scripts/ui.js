// render chat templates to the DOM
// clear the list of chats upon switching rooms

class ChatUI{
    constructor(chatlist){
        this.chatlist = chatlist;
    }
    clear(){
        this.chatlist.innerHTML = '';
    }
    //create an html snippet to display inside the DOM
    render(data){
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            { addSuffix: true }
        );
        const html = `
        <li class="list-group-item">
            <span class="username">${data.username}:</span>
            <span class="message">${data.message}<br></span>
            <span class="time">${when}</span>   
        </li>
        `;

        this.chatlist.innerHTML += html;

    }


}