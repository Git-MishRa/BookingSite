export const createError=(status,mesaage)=>{
    const err= new Error();
    err.status=status;
    err.message=message;
    return err;
}