const mongoose = require('mongoose');
const marked  = require('marked'); // for make mardowon editor

const slugify = require('slugify');
const creatDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = creatDomPurify(new JSDOM().window);

const articaSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    markdown:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    sanitizedHtml:{
        type:String,
    }
})

articaSchema.pre('validate',function(next){
    if(this.title){
        this.slug = slugify(this.title ,{lower:true,strict:true}); //stric if title have : this
    }

    if(this.markdown){
        this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown)); // sanitized markdwon so people don't add malicouis code
    }

    next();
})


module.exports = mongoose.model("Artical",articaSchema);