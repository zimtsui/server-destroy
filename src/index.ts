import { Socket, Server } from 'net';

interface Callback {
    (err?: Error): void;
}

declare module "net" {
    interface Server {
        destroy(err?: Error | null, cb?: Callback): void;
    }
}

function enableDestroy(server: Server): Server {
    const connections = new Set<Socket>();

    server.on('connection', connection => {
        connections.add(connection);
        connection.on('close', () => {
            connections.delete(connection);
        });
    });

    server.destroy = function (err?: Error | null, cb?: Callback) {
        server.close(cb);
        for (const conn of connections) conn.destroy(err || undefined);
    };

    return server;
}

export {
    enableDestroy,
    Callback,
}
