import { Schema, model} from "mongoose";


const contactShema = new Schema({
    name :{
        type: String,
        required: true,
    } ,
    phoneNumber:{
        type: String,
        required: true,
    } ,
    email:{
        type: String,
        required: true,
    } ,
    isFavourite:{
        type: Boolean,
        default: false,
        required: true,
    } ,
    contactType:{
        type: String,
        enum:["home","personal", "work"],
        default: "personal",
        required: true,
    } ,
    createdAt:{
        type: Date,
        required: true,
    } ,
    datedAt:{
        type: Date,
        required: true,
    }

});

 const ContactCollection = model("contact", contactShema);

 export default ContactCollection;
