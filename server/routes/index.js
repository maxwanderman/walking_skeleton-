var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/basic_walking_skeleton');

var Dog = mongoose.model('Dog', {name:String});

router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.post('/add', function(request, response, next){
   var puppy = new Dog({name: request.body.name});
   puppy.save(function(err){
       if(err) console.log('woof %s', err);
       response.send(puppy.toJSON());
       next();

   });
});

router.get('/dogs', function(request, response, next){
   return Dog.find({}).exec(function(err, dogs){
       if(err) throw new Error(err);
       response.send(JSON.stringify(dogs));
       next();
   });
});

module.exports = router;
