# Replica set 설정 방법

```js
// ls
drwxr-xr-x  10 root  wheel   340B 11  5 11:40 .
drwxr-xr-x  33 root  wheel   1.2K 11  5 08:50 ..
drwxr-xr-x  10 root  wheel   340B 11  5 10:09 config1
drwxr-xr-x  17 root  wheel   578B 11  5 11:19 db
drwxr-xr-x  16 root  wheel   544B 11  5 11:19 db2
drwxr-xr-x   2 root  wheel    68B 11  5 11:40 db3
drwxr-xr-x   2 root  wheel    68B 11  5 11:40 db4
drwxr-xr-x  11 root  wheel   374B 11  5 10:20 shard1
drwxr-xr-x  11 root  wheel   374B 11  5 10:20 shard2
drwxr-xr-x  11 root  wheel   374B 11  5 10:20 shard3

mongod --replSet downSet -dbpath /data/db -port 10000
mongod --replSet downSet -dbpath /data/db3 -port 10001
mongod --replSet downSet -dbpath /data/db4 -port 10002

mongo localhost:10000

var config = {_id:'downSet',members:[{_id:0, host:'localhost:10000'}, {_id:1, host:'localhost:10001'}, {_id:2, host:'localhost:10002'}]};
rs.initiate(config);

mongo localhost:10000 // primary
mongo localhost:10001 // secondary
mongo localhost:10002 // secondary

// 확인방법
// primary 서버를 중단시키고, secondary 서버 확인
mongo localhost:10000
use admin;
db.shutdownServer();
```