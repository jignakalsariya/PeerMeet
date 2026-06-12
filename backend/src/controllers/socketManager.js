import {Server} from "socket.io"

let connections = {}
let messages = {}
let timeOnline = {}

export const connectToSocket = (server) => {
    const io = new Server(server);

    io.on("connection", (socket) => {
        socket.on("join-call", (path) => {
            if(connections[path] === undefined){
                connections[path] = []
            }
            connections[path].push(socket.id)

            timeOnline[socket.id] = new.Date();

            for(let a = 0; a < connections[path].length; i++){
                io.to(connections[path][a].emit("user-joined", socket.id, connections[path]))
            }
        })

        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.Id, message)
        })

        socket.on("chat-message", (data, sender) => {

        })

        socket.on("disconnect", () => {

        })
    })

    return io;
}

