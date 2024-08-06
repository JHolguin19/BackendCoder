const HttpStatus ={
    OK: 200,
    NOT_FOUND:404,
    UNAUTHORIZED:401,
    FORBIDDEN:403,
    INTERNAL_SERVER_ERROR:500
}


export class HttpResponse{
    Ok(res, data){
        return res.status(HttpResponse.OK).json({
        status: HttpStatus.OK,
        message: 'Succes',
        data
        })
    }
    NotFound(res, data){
        return res.status(HttpResponse.OK).json({
            status: HttpStatus.NOT_FOUND,
            message: 'Not Found',
            error: data
            })
    }
    Unauthorized(res, data){
        return res.status(HttpResponse.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            message: 'Unauthorized',
            error:data
            })
    }
    Forbidden(res, data){
        return res.status(HttpResponse.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            message: 'Forbidden',
            error:data
            })
    }
    ServerError(res, data){
        return res.status(HttpResponse.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            error:data
            })
    }
}