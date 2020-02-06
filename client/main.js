'use strict'

var socket = io.connect('http://192.168.1.46:6677',{'forceNew':true});

socket.on('message', function(data){
    console.log(data);
    render(data);
});

function render(data){
    var html = data.map(function(message, index){
        return (`
            <div class="message">
                <strong>
                    ${message.nickname}
                </strong> dice:
                <p>
                    ${message.text}
                </p>
            </div>
        `);
    }).join(' ');

    var divMsg = document.getElementById('messages');
    divMsg.innerHTML = html;
    divMsg.scrollTop = divMsg.scrollHeight;
}

function addMessage(e){
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };

    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', message);

    return false;
}