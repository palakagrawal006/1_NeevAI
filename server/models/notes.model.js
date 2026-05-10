import mongoose from "mongoose" ;

const notesSchema = new mongoose.Schema({
user : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : "UserModel",
    required : true ,
   } ,

   topic : {
    type : String,
    required : true 
   },

   classLevel :String,
   examType :String ,

   revisionMode :{
    type : Boolean , 
    default : false ,
   },

   includeDiagram: { type: Boolean, default: false },
  includeChart: { type: Boolean, default: false },

   content : {
     type: mongoose.Schema.Types.Mixed, //AI Response (string/json)
     required : true,
   }

} , {timestamps :true})
// timestamp = kb create hua kb delete hua uska time note

const Notes = mongoose.model("Notes" , notesSchema)

export default Notes