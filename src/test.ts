import net from 'net';
import enableDestroy from './index';

const server = net.createServer(function (conn) {
    var i = setInterval(function () {
        conn.read();
        conn.write('hi\n');
    }, 100);
    i.unref();
});
server.listen(1337);
enableDestroy(server);

let connected = 0;
for (let i = 0; i < 10; i++) {
    const client = net.connect(1337);
    client.on('connect', function () {
        connected++;
        if (connected === 10) setImmediate(destroy);
    });

    // just ignore the resets
    client.on('error', function () { });
}

function destroy() {
    server.destroy(function () {
        console.log('ok');
    });
}
