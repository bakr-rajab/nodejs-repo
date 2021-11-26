const router =require('express').Router()
const TodoController=require('../Controllers/TodoController')

router.get('/',TodoController.index)

router.get('/:id',TodoController.show)

router.post('/',TodoController.create)

router.post('/:id',TodoController.edit)

router.delete('/:id',TodoController.delete)


module.exports=router