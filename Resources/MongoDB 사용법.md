# MongoDB 사용법

검색옵션

```java
db.scores.find(
  {},
  {
    '_id': 0
  }
)
```

Default Sample

```js
// 있으면 수정, 없으면 추가
db.users.save(
  {
    'name': 'Johnny',
    'languages': ['ruby', 'c']
  }  
);
db.users.save(
  {
    'name': 'Sue',
    'languages': ['scala', 'lisp']
  }  
);
db.users.save(
  {
    'name': 'Hong',
    'languages': ['korean']
  }  
);

// 수정
db.users.update(
  {
    'name': 'Johnny'
  },
  {
    'name': 'Cash',
    'languages': ['English']
  }
);

// key-value 추가
db.users.update(
  {
    'name': 'Cash'
  },
  {
    '$set': {
      'age': 50
    }
  }
);

// key-value 제거
db.users.update(
  {
    'name': 'Cash'
  },
  {
    '$unset': {
      'age': 50
    }
  }
);

// 배열 형에서 value값 제거
db.users.update(
  {
    'name': 'Sue'
  },
  {
    '$pull': {
      'languages': 'scala'
    }
  }
);

// 배열 형태에서 value값 추가
db.users.update(
  {
    'name': 'Sue'
  },
  {
    '$push': {
      'languages': 'ruby'
    }
  }
);

// 삭제
db.users.remove(
  {
    'name': 'Hong'
  }
);

// 모두 삭제
db.users.remove({});

// 콜렉션 확인
show collections;

// 콜렉션 삭제
db.users.drop();

// DB 안전 종료
use admin;
db.shutdownServer();
```