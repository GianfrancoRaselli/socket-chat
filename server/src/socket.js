const jwt = require('jsonwebtoken');
const { User } = require('./models/index');
const Message = require('./models/Message');

const io = require('socket.io')(process.env.SOCKET_PORT, {
  cors: {
    origin: true,
    credentials: true,
    methods: ['GET', 'POST'],
  }
});

io.on('connection', (socket) => {
  console.log('New user connected');

  onJoin(socket);
  onSendMessage(socket);
});

function onJoin(socket) {
  socket.on('join', async (token) => {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET || "tokentest");
    const user = await User.findById(payload._id);
    if(user) {
      socket.userFromId = user._id.toString();
      socket.join(socket.userFromId);
    }
  });
}

function onSendMessage(socket) {
  socket.on('sendMessage', async (messageInfo) => {
    socket.to(socket.userFromId).emit('receiveMessage', { userFromId: socket.userFromId, message: messageInfo.message });
    socket.to(messageInfo.userToId).emit('receiveMessage', { userFromId: socket.userFromId, message: messageInfo.message });
    
    const message = new Message({ userFromId: socket.userFromId, userToId: messageInfo.userToId, message: messageInfo.message });
    message.save();
  });
}