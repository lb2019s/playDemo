const http = require('http')

http.createServer(callback).listen(80, function () {
    var env = process.env,
        uid = parseInt(env['SUDO_UID'] || process.getuid(), 10),
        gid = parseInt(env['SUDO_GID'] || process.getgid(), 10);

    process.setgid(gid);
    process.setuid(uid);
});
/**
 * 
 *  上例中有几点需要注意：

    如果是通过sudo获取root权限的，运行程序的用户的UID和GID保存在环境变量SUDO_UID和SUDO_GID里边。如果是通过chmod +s方式获取root权限的，运行程序的用户的UID和GID可直接通过process.getuid和process.getgid方法获取。

    process.setuid和process.setgid方法只接受number类型的参数。

    降权时必须先降GID再降UID，否则顺序反过来的话就没权限更改程序的GID了。
 */