export default class productDTO{
    constructor(prod){
        this.nombre = prod.name;
        this.descripcion = prod.description ;
        this.precio= prod.price ;
        this.stock = prod.stock;
    }
}