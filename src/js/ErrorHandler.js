
class ErrorHandler {
    constructor() {
        this.defaultError = {
            msg: 'Unknown Error',
            defaultAction: () => {
                
            }
        }
        this.errorMap = {
            1: {
                msg: 'Not logged in',
                defaultAction: () => {
                    window.location.href = `/pages/login.php`;
                }
            },

            2: {
                msg: 'Channel name can only contain lowercase letters and numbers',
                defaultAction: () => {
                }
            }
        }
    }

    getError(code) {
        let error = this.errorMap[code];
        if (typeof error === "undefined")
            return this.defaultError
        return error;
    }
}

export const errorHandler = new ErrorHandler();
