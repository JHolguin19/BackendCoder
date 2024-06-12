import * as service from '../services/cart.services.js'

export const getAll = async (req, res, next) => {
    try {
      const response = await service.getAll();
      res.status(200).json(response);
    } catch (error) {
       next(error.message);
    }
  };
  
  export const getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await service.getById(id);
      if (!response) res.status(404).json({ msg: "Carro no encontrado" });
      else res.status(200).json(response);
    } catch (error) {
       next(error.message);
      
    }
  };
  
  export const create = async (req, res, next) => {
    try {
      const newCart = await service.create();
      if (!newCart) res.status(404).json({ msg: "Hay algun error al eliminar el carrito" });
      else res.status(200).json(newCart);
    } catch (error) {
       next(error.message);
    }
  };
  
  export const update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const cartUpd = await service.update(id, req.body);
      if (!cartUpd) res.status(404).json({ msg: "Error al actualizar el carrito" });
      else res.status(200).json(cartUpd);
    } catch (error) {
       next(error.message);
    }
  };
  
  export const remove = async (req, res, next) => {
    try {
      const { id } = req.params;
      const cartDel = await service.remove(id);
      if (!cartDel) res.status(404).json({ msg: "Error al eliminar el carro" });
      else res.status(200).json({ msg: `Id del carrito: ${id} eliminado` });
    } catch (error) {
       next(error.message);
    }
  };

export const addProdToCart = async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const { prodId } = req.params;
      const newProdToUserCart = await service.addProdToCart(
        cartId,
        prodId,
      );
      if (!newProdToUserCart) res.json({ msg: "Producto o Carro no existe" });
      else res.json(newProdToUserCart);
    } catch (error) {
       next(error.message);
    }
  };

  export const removeProdToCart = async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const { prodId } = req.params;
      const delProdToUserCart = await service.removeProdToCart(
        cartId,
        prodId,
      );
      if (!delProdToUserCart) res.json({ msg: "Producto o carrito no existe" });
      else res.json({msg: `Producto: ${prodId} eliminado del carrito`});
    } catch (error) {
       next(error.message);
    }
  };

  export const updateProdQuantityToCart = async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const { prodId } = req.params;
      const { quantity } = req.body;
      const  updateProdQuantity = await service.updateProdQuantityToCart(
        cartId,
        prodId,
        quantity
      );
      if (!updateProdQuantity) res.json({ msg: "Error al actualizar la cantidad del producto" });
      else res.json(updateProdQuantity);
    } catch (error) {
       next(error.message);
    }
  };

  export const clearCart = async (req, res, next) => {
    try {
      const { cartId } = req.params;
      const clearCart = await service.clearCart(
        cartId,
      );
      if (!clearCart) res.json({ msg: "Error al eliminar el carrito" });
      else res.json(clearCart);
    } catch (error) {
       next(error.message);
    }
  };

  
  