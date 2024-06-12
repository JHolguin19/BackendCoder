    
    //Aqui definimos el manejo de errores, primero se imprime el esos y luego se manda 
    export const errorHandler = (error, req, res, next)=>{
        
        console.log(`error ${error.message}`);

        const status = error.status || 400;
        
        res.status(status).send(error.message)
    }