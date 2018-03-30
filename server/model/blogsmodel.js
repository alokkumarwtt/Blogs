const validator=require('validator')
const mongoose=require('mongoose')
var mon=mongoose.model('BlogsData',{
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
	  }
	});
module.exports={mon}