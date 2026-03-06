import {Router} from 'express'
const router = Router()
router.get('/', (req,res)=>{
    res.json('Hola desde Get en puerto 4000')
})
router.post('/', (req,res)=>{
    res.json('Hola desde Post en puerto 4000')
})
router.put('/', (req,res)=>{
    res.json('Hola desde Put en puerto 4000')
})
router.patch('/', (req,res)=>{
    res.json('Hola desde Patch en puerto 4000')
})
router.delete('/', (req,res)=>{
    res.json('Hola desde Delete en puerto 4000')
})
export default router