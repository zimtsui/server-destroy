"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableDestroy = void 0;
function enableDestroy(server) {
    const connections = new Set();
    server.on('connection', connection => {
        connections.add(connection);
        connection.on('close', () => {
            connections.delete(connection);
        });
    });
    server.destroy = function (err, cb) {
        server.close(cb);
        for (const conn of connections)
            conn.destroy(err || undefined);
    };
    return server;
}
exports.enableDestroy = enableDestroy;
//# sourceMappingURL=index.js.map