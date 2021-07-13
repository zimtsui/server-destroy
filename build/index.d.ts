import { Server } from 'net';
interface Callback {
    (err?: Error): void;
}
declare module "net" {
    interface Server {
        destroy(err?: Error | null, cb?: Callback): void;
    }
}
declare function enableDestroy(server: Server): Server;
export { enableDestroy, Callback, };
