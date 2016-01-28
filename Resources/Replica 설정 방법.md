# Replica 설정 방법

```js
// ls
drwxr-xr-x   8 root  wheel   272B 11  5 11:16 .
drwxr-xr-x  33 root  wheel   1.2K 11  5 08:50 ..
drwxr-xr-x  10 root  wheel   340B 11  5 10:09 config1
drwxr-xr-x  17 root  wheel   578B 11  5 11:19 db
drwxr-xr-x  16 root  wheel   544B 11  5 11:19 db2
drwxr-xr-x  11 root  wheel   374B 11  5 10:20 shard1
drwxr-xr-x  11 root  wheel   374B 11  5 10:20 shard2
drwxr-xr-x  11 root  wheel   374B 11  5 10:20 shard3

// Master
mongod -dbpath /data/db -port 10000 -master

// Slave
mongod -dbpath /data/db2 -port 10001 -slave -source localhost:10000

mongo localhost:10000
mongo localhost:10001
```