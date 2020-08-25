import { Server } from 'http';

declare interface Callback {
  (err?: Error): void;
}

declare interface DestroyableServer extends Server {
  destroy(cb?: Callback): void;
}

declare function enableDestroy(server: Server): DestroyableServer;

export {
  enableDestroy as default,
  enableDestroy,
  DestroyableServer,
  Callback,
}