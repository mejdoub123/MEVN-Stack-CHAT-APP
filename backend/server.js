const express = require("express");
const dotenv = require("dotenv");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
const connectDB = require("./config/db");

dotenv.config();

//Connect DB
connectDB();
const app = express();
//To Accept Json Data
app.use(express.json());

//Difine Routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/message", require("./routes/messageRoutes"));

//Error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
const server = app.listen(PORT, () =>
  console.log(`Server Started on PORT ${PORT}`)
);
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST", "PUT"],
    transports: ["websocket", "polling"],
    wsEngine: "uws",
    credentials: true,
  },
  allowEIO3: true,
});
io.on("connection", (socket) => {
  console.log("Connected to socket.io ...");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User join Room : " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing", room));

  socket.on("stop typing", (room) => socket.in(room).emit("stop typing", room));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
