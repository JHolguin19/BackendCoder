import * as service from "../services/product.services.js";


export const getAllProducts = async (req, res, next) => {
  try {
    const response = await service.getAll();
    res.json(response);
  } catch (error) {
    next(error.message);
  }
};

export const getByProductId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prod = await service.getById(id) ;
    if(!prod) res.status(404).json({msg: 'product not found'});
    else res.json(prod);
  } catch (error) {
    next(error.message);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const newProd = await service.create(req.body);
    if(!newProd) res.status(404).json({msg: 'Error creating product'});
    else res.json(newProd);
  } catch (error) {
    next(error.message);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prodUpd = await service.update(id, req.body);
    if(!prodUpd) res.status(404).json({msg: 'Error update product'});
    else res.json(prodUpd);
  } catch (error) {
    next(error.message);
  }
};

export const removeProduct   = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prodDel = await service.delete(id);
    if(!prodDel) res.status(404).json({msg: 'Error remove product'});
    else res.json(prodDel);
  } catch (error) {
    next(error.message);
  }
};