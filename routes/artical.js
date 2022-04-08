const express = require('express');

const Artical = require('../models/artical_mod')
const router  = express.Router(); 


router.get('/new',(req,resp)=>{
    resp.render("artical/new",{artical: new Artical()});
})


router.get('/:slug', async(req,resp)=>{
    const artical = await Artical.findOne({slug:req.params.slug});
    if(artical == null) resp.redirect('/');  // redirecting to the home page
    resp.render('artical/show',{artical});
})

// for edit artical
router.get('/edit/:id',async(req,resp)=>{
    const artical = await Artical.findById(req.params.id);
    resp.render('artical/edit',{artical});
})


router.post('/',async (req,resp,next)=>{
   req.artical = new Artical();
    next(); //pass the next function
},saveArticalAndRedirect('new'));


router.put('/:id',async(req,resp,next)=>{
    req.artical = await Artical.findById(req.params.id);
    next();
},saveArticalAndRedirect());


// delete method to use this method_overide come
router.delete('/:id',async(req,resp)=>{
    await Artical.findByIdAndDelete(req.params.id);
    resp.redirect('/'); ///redirect to home page 
})




function saveArticalAndRedirect(path){

return async (req,resp)=>{
        let artical = req.artical;
            artical.title= req.body.title,
            artical.description=req.body.description,
            artical.markdown=req.body.markdown

       try{
           await artical.save();
    
           resp.redirect(`/articals/${artical.slug}`);
       }catch(e){
           console.log(e);
           resp.render(`artical/${path}`,{artical})
       }
}

}

module.exports = router;