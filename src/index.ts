import server from "./config/server";

server.listen(process.env.PORT || 3333, () => console.log("Server on"));
