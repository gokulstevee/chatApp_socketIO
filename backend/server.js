const app = require("express")();

const httpServer = require("http").createServer(app);

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Socket: ", socket);
  console.log("Socket is active to connect");

  socket.on("chat", (payload) => {
    console.log("Payload: ", payload);
    io.emit("chat", payload);
  });
});

//here socket.io server is connecting to the port, so
httpServer.listen(5000, () => {
  console.log("Server is running at port 5000...");
});
