//Node Server which will handle socket io connections
const io = require('socket.io')(process.env.PORT || 8000, {
  cors :{
   origin: '*',
 }
});
  
  
const users={};
io.on('connection',socket=>{
    socket.on('new-user-joined', name =>{
     // console.log("New user",name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    socket.on('send',message =>{
      console.log("message : ",message);
      socket.broadcast.emit('receive', {message: message,name : users[socket.id]})
    });
      socket.on('disconnect',message =>{
      //  console.log("message : ",message);
        socket.broadcast.emit('left',  users[socket.id]);
        delete users[socket.id];
    });
})