const _ = require('lodash');
const {ObjectId,MongoClient}=require('mongodb')
const express=require('express')
const bodyParser=require('body-parser')

var {mongoose}=require('./db/mongoose.js')
var {User}=require('./model/blogsmodel.js')
//var {authenticate} = require('./middleware/middleware.js');
var app=express()
app.use(bodyParser.json());
app.post('/blogs', (req, res) => {
	var body = _.pick(req.body, ['title', 'tags','body', 'author','creation_date','update_date','status']);
	var user = new User(body);
  
	user.save().then(() => {
	  return user.generateAuthToken();
	}).then((token) => {
	  res.header('x-auth', token).send(user);
	}).catch((e) => {
	  res.status(400).send(e);
	})
  });

  app.get('/blogs/get', (req, res) => {
	var token = req.header('x-auth');

	User.findByToken(token).then((user) => {
	  if (!user) {
		return Promise.reject();
	  }
      res.send(user)
	}).catch((e) => {
	  res.status(401).send();
	});

  });
  app.delete('/blogs/del', (req, res) => {
	var token = req.header('x-auth');

	User.findByToken(token).then((user) => {
	  if (!user) {
		return Promise.reject();
	  }
      res.send(user)
	}).catch((e) => {
	  res.status(401).send();
	});

  });
  app.patch('/blogs/upd', (req, res) => {
	var token = req.header('x-auth');

	User.findByToken(token).then((user) => {
	  if (!user) {
		return Promise.reject();
	  }
      res.send(user)
	}).catch((e) => {
	  res.status(401).send();
	});

  });
app.get('/mons',(req,res)=>{
	mon.find().then((mons)=>{
		res.send({mons})

	},(e)=>{
		res.status(400).send(e)
	})
})
app.get('/mons/:id',(req,res)=>{
	var id=req.params.id
	if(!ObjectId.isValid(id)){
		return res.status(404).send();
    }
   mon.findById(id).then((mons)=>{
        res.send({mons})
     },(err)=>{
		res.status(400).send(err)
	 })
  })

 app.get('/mons1/:title',(req,res)=>{
 	console.log(req.params)
	var title=req.params.title
	
	mon.find({"title":title}).then((mons)=>{
     res.send({mons})
     },(err)=>{
		res.status(400).send(err)
	 })
  })


  app.delete('/mons/:id',(req,res)=>{
  	var id=req.params.id
    if(!ObjectId.isValid(id)){
		return res.status(404).send();
	}
	mon.findByIdAndRemove(id).then((mons)=>{
		 res.send({mons})
    },(err)=>{
		res.status(400).send(err)
	})
})
   app.patch('/mons/:id', (req,res) => {
    var id = req.params.id
    var body = _.pick(req.body, ['name','tags','body','author','creation_date','update_date','status']);
   if (!ObjectId.isValid(id)) {
    return res.status(404).send();
   }
    mon.findByIdAndUpdate(id, {$set: body}, {new: true}).then((mon) => {
    if (!mon) {
      return res.status(404).send();
    }
  res.send({mon});
   }).catch((e) => {
    res.status(400).send();
   })
});





app.listen(3000,()=>{
	console.log('Started on port 3000')
})



