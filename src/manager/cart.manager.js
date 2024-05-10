import fs from 'fs'
import ProductManager from "./product.manager.js"
import { v4 as uuidv4} from 'uuid'
import { __dirname } from '../path.js'
const productManager = new ProductManager(`${__dirname}/db/products.json`) 

export default class CartManager{
    constructor(path) {
    this.path = path 
}

async getAllCarts(){
    try {
        if(fs.existsSync(this.path)){
            const carts = await fs.promises.readFile(this.path, 'utf-8');
            const cartJson = JSON.parse(carts)
            return cartJson
        }else{ return []}
    } catch (error) {
        throw new Error(error)
    }
}

async createCart(){
    try {
        const cart = {
            id: uuidv4(),
            products:[]

        }
        const cartsFile = await this.getAllCarts()
        cartsFile.push(cart)
        await fs.promises.writeFile(this.path, JSON.stringify(cartsFile))
        return cart 
    } catch (error) {
        throw new Error(error)
    }
}

async getCartById(id){
    try {
        const carts = await this.getAllCarts();
        const cartsById = carts.find((x)=>x.id === id)
        if(!cartsById) return 'No existe ningun carrito con este id'
        return cartsById
    } catch (error) {
        throw new Error(error)
    }
}

async saveProductToCart(idCart, idProduct){
    try {

        const productoExiste = await productManager.getProductbyId(idProduct)
        if(!productoExiste) return 'producto no existe'
        const cartExiste = await this.getCartById(idCart);
        if(!cartExiste) return 'carrito no existe'
        const cartCompleto = await this.getAllCarts();
        const prodInCart = cartExiste.find((producto)=>producto.id ===idProduct);
        if(!prodInCart){
            const cart ={
                id: idProduct,
                quantity:1
            }
            cartExiste.products.push(cart)
        }
        this.cartExiste.productoExiste.quantity ++
        const updateCart =  cartCompleto.map((cart)=>{
            if(cart.id === idCart) return cartExiste
            return cart
        }) 
        await fs.promises.writeFile(this.path, JSON.stringify(updateCart))
        return cartExiste   
    } catch (error) {
        
    }
}

}