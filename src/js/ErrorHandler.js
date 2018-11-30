
class ErrorHandler {
    constructor(){
        this.errorMap = {
            1: {
                msg: 'Not logged in',
                defaultAction: () => {
                    window.location.href = `/pages/login.php`;
                }
            }
        }
    }

    getError(code){
        let error = this.errorMap[code];
        if(typeof error === "undefined")
            throw `Error with ${code} is not defined`;
        return error;
    }
}

export const errorHandler = new ErrorHandler();
