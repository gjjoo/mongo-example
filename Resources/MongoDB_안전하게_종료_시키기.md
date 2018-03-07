# MongoDB 안전하게 종료 시키기

```js
// 필수!!!
// 강제 종료시 오류를 범할 수 있음!
use admin;
db.shutdownServer();
```