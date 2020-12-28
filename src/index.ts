import { Socket, Server } from 'net';

interface Callback {
    (err?: Error): void;
}

declare module "net" {
    interface Server {
        destroy(cb: Callback): void;
    }
}

function enableDestroy(server: Server): void {
    const connections = new Set<Socket>();

    server.on('connection', function (conn) {
        connections.add(conn);
        conn.on('close', function () {
            connections.delete(conn);
        });
    });

    server.destroy = function (cb: Callback) {
        server.close(cb);
        for (const conn of connections)
            conn.destroy();
    };
}

export {
    enableDestroy as default,
    enableDestroy,
    Callback,
}
