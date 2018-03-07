# MongoDB MapReduce

```js
// 영화별로 배우 뽑기
db.actors.save(
  {
    actor: 'Richard Gere',
    movies: ['Pretty Woman', 'Runaway Brid', 'Chicago']
  }
);
db.actors.save(
  {
    actor: 'Julia Roberts',
    movies: ['Pretty Woman', 'Runaway Brid', 'Erin Brockovich']
  }
);
db.actors.find();

map = function () {
  for (var i in this.movies) {
    key = {movie: this.movies[i]};
    value = {actors: [this.actor]};
    emit(key, value);
  }
}

reduce = function (key, values) {
  actor_list = {actors: []};
  for (var i in values) {
    actor_list.actors = values[i].actors.concat(actor_list.actors);
  }
  return actor_list;
}

db.actors.mapReduce(map, reduce, 'movies');
db.movies.find();



// 저장된 문장의 단어 갯 수 확인하기
db.words.save({txt: 'read a book'});
db.words.save({txt: 'write a book'});

map2 = function () {
  var arg = this.txt.split(" ");
  for (var i in arg) {
      key = {word: arg[i]};
      value = {count: 1};
      emit(key, value);
  }
}

reduce2 = function (key, values) {
  var sum = 0;
  for (var i in values) {
    sum += values[i].count;
  }
  return {count: sum};
}

db.words.mapReduce(map2, reduce2, 'wordcounts');
db.wordcounts.find();

```