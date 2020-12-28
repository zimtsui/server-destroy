function enableDestroy(server) {
    const connections = new Set();
    server.on('connection', function (conn) {
        connections.add(conn);
        conn.on('close', function () {
            connections.delete(conn);
        });
    });
    server.destroy = function (cb) {
        server.close(cb);
        for (const conn of connections)
            conn.destroy();
    };
}
export { enableDestroy as default, enableDestroy, };
//# sourceMappingURL=index.js.map