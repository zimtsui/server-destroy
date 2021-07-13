"use strict";
/*
    source: https://github.com/isaacs/server-destroy
*/
Object.defineProperty(exports, "__esModule", { value: true });
const net = require("net");
const __1 = require("../..");
const server = net.createServer(function (conn) {
    var i = setInterval(function () {
        conn.read();
        conn.write('hi\n');
    }, 100);
    i.unref();
});
server.listen(1337);
__1.enableDestroy(server);
let connected = 0;
for (let i = 0; i < 10; i++) {
    const client = net.connect(1337);
    client.on('connect', function () {
        connected++;
        if (connected === 10)
            setImmediate(destroy);
    });
    // just ignore the resets
    client.on('error', function () { });
}
function destroy() {
    server.destroy(null, function () {
        console.log('ok');
    });
}
//# sourceMappingURL=index.js.map