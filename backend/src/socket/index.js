let users = [];

function mySocket(io) {
    io.on("connection", function (socket) {
        socket.on("join", (user) => {
            let isJoin = userJoin({ user: user, socket_id: socket.id });
            if (isJoin) {
                io.emit("list-user-online", users);
            }
            console.log("number user online: ", users.length);
        });
        socket.on("disconnect", () => {
            let isLeave = userLeave({ socket_id: socket.id });
            if (isLeave) {
                io.emit("list-user-online", users);
            }
            console.log("number user online: ", users.length);
        });
        socket.on("send-message", (d) => {
            const { user, data } = d;
            const userSend = users.filter((item) => item.user.email == user.email);
            if (userSend.length > 0) {
                io.to(userSend[0].socket_id).emit("receive-message", data);
            }
        });
    });
}

function userJoin({ user, socket_id }) {
    const userOld = users.filter((item) => item.user.email == user.email).length > 0;
    if (!userOld) {
        users.push({ user, socket_id });
        return true;
    }
    return false;
}

function userLeave({ socket_id }) {
    const index = users.findIndex((user) => user.socket_id === socket_id);
    if (index !== -1) {
        users.splice(index, 1)[0];
        return true;
    }
    return false;
}

module.exports = mySocket;
