export const bodyValidator = (req, res, next) =>{
    if(!req.body.title) res.status(404).json({msg:'nombre no escrito'})
    if(!req.body.description) res.status(404).json({msg:'Precio no digitado'})
    if(!req.body.code) res.status(404).json({msg:'code no digitado'})
    if(!req.body.price) res.status(404).json({msg:'price no digitado'})
    if(!req.body.stock) res.status(404).json({msg:'stock no digitado'})
    if(!req.body.categoria) res.status(404).json({msg:'categoria no digitado'})
    if(!req.body.thumbnail) res.status(404).json({msg:'thumbnail no digitado'})
    next()
}