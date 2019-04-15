$(document).ready(function(){
    // Declaring Variables and Helper Functions
    var socket_ip = "http://127.0.0.1";
    var socket_port = "1215";
    var socket = io(socket_ip+':'+socket_port, {transports: ['websocket']});
    function appendToScreen(data,sender) {
        if(sender == "me"){
            $("#messages").append('<li class="me">'+data+'<br><br><hr class=\"line\"><span class=\"time\">'+moment().locale('fa').format('ارسال شده در تاریخ ddd DD MMMM YYYY, ساعت HH:mm:ss')+'</span></li>');
        } 
        else {
            $("#messages").append('<li class="other">'+data+'<br><br><hr class=\"line-other\"><span class=\"time\">'+moment().locale('fa').format('ارسال شده در تاریخ ddd DD MMMM YYYY, ساعت HH:mm:ss')+'</span></li>');
        }
    }

    // get data and append to chat screen
    socket.on('send', function (data) {
        appendToScreen(data,"other");
    });

    // send data to server
    $('form').submit(function(e){
        e.preventDefault();
        var data = $('#m').val();
        appendToScreen(data,"me");
        socket.emit('message', data);
        $('#m').val('');
        return false;
    });
});