const validator=require('validator')
const mongoose=require('mongoose')
const jwt = require('jsonwebtoken');
const _ = require('lodash');
var BlogSchema = new mongoose.Schema({
		title:{
			type:String,
			required:true,
			trim:true
			},
		  tags:{
			type:String,
			default:null,
			multi:true
	
		  },
		  body:{
			type:String,
			default:null
		  },
		  author:{
			type:String,
			default:null
		  },
		  creation_date:{
			  type: String, 
			  //default: Date.now,
		  },
		  update_date:{
			type:String,
			//default:null
		  },
		  status:{
			type:String,
			default:null
		  },
		 tokens: [{
		access: {
		  type: String,
		  required: true
		},
		token: {
		  type: String,
		  required: true
		}
	  }]
	});
	BlogSchema.methods.toJSON = function () {
		var user = this;
		var userObject = user.toObject();
	    return _.pick(userObject, ['_id', 'title','tags', 'author','body','status', 'creation_date','update_date']);
	  };
	  
	 BlogSchema.methods.generateAuthToken = function () {
		var user = this;
		var access = 'auth';
		var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
	    user.tokens.push({access, token});
	    return user.save().then(() => {
		   return token;
		});
	  };
	   BlogSchema.statics.findByToken = function (token) {
		var user = this;
		var decoded;
	  
		try {
		  decoded = jwt.verify(token, 'abc123');
		} catch (e) {
		  return Promise.reject();
		}
	  
		return User.findOne({
		  '_id': decoded._id,
		  'tokens.token': token,
		  'tokens.access': 'auth'
		});
	  };
	  BlogSchema.statics.findByToken = function (token) {
		var user = this;
		var decoded;
	  
		try {
		  decoded = jwt.verify(token, 'abc123');
		} catch (e) {
		  return Promise.reject();
		}
	  
		return User.findOneAndRemove({
		  '_id': decoded._id,
		  'tokens.token': token,
		  'tokens.access': 'auth'
		});
	  };
	  BlogSchema.statics.findByToken = function (token) {
		var user = this;
		var decoded;
	  
		try {
		  decoded = jwt.verify(token, 'abc123');
		} catch (e) {
		  return Promise.reject();
		}
	  
		return User.find({
		  '_id': decoded._id,
		  'tokens.token': token,
		  'tokens.access': 'auth'
		});
	  };
	  

var User=mongoose.model('Data',BlogSchema);
module.exports={User}