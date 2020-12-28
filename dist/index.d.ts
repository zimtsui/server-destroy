import { Server } from 'net';
interface Callback {
    (err?: Error): void;
}
declare module "net" {
    interface Server {
        destroy(cb?: Callback): void;
    }
}
declare function enableDestroy(server: Server): void;
export { enableDestroy as default, enableDestroy, Callback, };
