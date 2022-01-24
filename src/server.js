import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", socket => {
    socket.on("enter_room", (msg) => {
        console.log(msg);
    });
});



// web socket
/* const wss = new WebSocket.Server({ server });
const sockets = [];
wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "anonymous";
    console.log("connected to browser");
    socket.on("close", () => console.log("disconnected from browser"));
    socket.on("message", (msg) => {
        const message = JSON.parse(msg);
        switch(message.type){
            case "new_message":
                sockets.forEach(soc => soc.send(`${socket.nickname}: ${message.payload.toString()}`));
                break;
            case "nickname":
                socket["nickname"] = message.payload;
                break;
        }
    });
}); */

httpServer.listen(3000, handleListen);