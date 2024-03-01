import Category from '../category/category.model.js'

export const add = async (req, res)=>{
    try{
        let data = req.body
        let existingCategory = await Category.findOne({name: data.name});
        if(existingCategory){
            return res.status(400).send({message: 'Category with this name already exist'});
        }
        let category = new Category(data)
        await category.save()
        return res.send({message: 'a new category was created'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'saving erro'})
    }
}