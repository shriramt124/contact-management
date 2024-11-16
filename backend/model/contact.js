import mongoose from "mongoose";
import validator from "validator";

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true,"firstName is Required"]
    },
    lastName: {
        type: String,
        required: [true,"lastName is Required"]
    },
    email: {
        type: String,
        required: true,
        validator:[validator.isEmail,"invalid formate of email"]
    },
    phone: {
        type: String,
        required:true
    },
    company: {
        type: String,
         
    },
    jobTitle: {
        type: String,
       
    }
}, {
    timestamps: true
})

const Contact =   mongoose.model('Contact', contactSchema)

export default Contact;