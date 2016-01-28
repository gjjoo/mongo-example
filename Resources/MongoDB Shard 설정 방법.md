# MongoDB Shard 설정 방법

```js
// ls
drwxr-xr-x   7 root  wheel   238B 11  5 10:01 .
drwxr-xr-x  33 root  wheel   1.2K 11  5 08:50 ..
drwxr-xr-x  10 root  wheel   340B 11  5 10:09 config1
drwxr-xr-x  15 root  wheel   510B 11  4 16:43 db
drwxr-xr-x   8 root  wheel   272B 11  5 10:06 shard1
drwxr-xr-x   8 root  wheel   272B 11  5 10:06 shard2
drwxr-xr-x   8 root  wheel   272B 11  5 10:06 shard3

// Shard서버 생성
mongod -shardsvr -dbpath /data/shard1 -port 40001
mongod -shardsvr -dbpath /data/shard2 -port 40002
mongod -shardsvr -dbpath /data/shard3 -port 40003

// Config서버 생성
mongod --configsvr -dbpath /data/config1 -port 50001

// Mongos 생성
mongos -configdb localhost:50001 -port 50000 -chunkSize 1
// config서버 3개일 경우(폴더도 생성필요함)
// mongos -configdb localhost:50001,localhost:50002,localhost:50003 -port 50000 -chunkSize 1

// Mongo Shell 실행
mongo localhost:50000

// DB확인
show dbs;
show collections;

use admin;

// Shard 추가
db.runCommand({addshard:'localhost:40001'});
db.runCommand({addshard:'localhost:40002'});
db.runCommand({addshard:'localhost:40003'});

// 추가된 Shard 확인
db.runCommand({listShards:1});

// 
db.runCommand({enablesharding:'person'});
db.runCommand({shardcollection:'person.users',key:{_id:1}});

// 사용자 전환
use person;

show collections;

// 대략 5분정도 걸림(TEST)
for (i=0; i<100000; i++) { db.users.save({name: 'name'+i}); }

// Sharding 상황 확인
db.printShardingStatus();
sh.status();

// 샤드 제거
use admin;
db.runCommand({removeshard:'localhost:40001'});
db.runCommand({movePrimary:'person', to:'shard0001'}); // 제거하는 샤드가 primary일 경우 다른 서버로 이전
db.runCommand({removeshard:'localhost:40001'});

```