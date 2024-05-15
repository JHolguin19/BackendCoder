import {Router} from 'express'

const router = Router();

router.get('/', (req, res)=> {
    res.render('vista1')
})
router.get('/vista2', (req, res)=> {
    res.render('vista2', {layout: 'main2.handlebars'})
})

router.get('/vista3', (req, res)=> {
    res.render('vista3')
})

export default router