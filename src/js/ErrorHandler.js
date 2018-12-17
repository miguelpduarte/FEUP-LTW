class ErrorHandler {
	constructor() {
		this.defaultError = {
			msg: "Unknown Error",
			defaultAction: () => {
                
			}
		};
        
		this.errorMap = {
			1: {
				msg: "Not logged in",
				defaultAction: () => {
					window.location.href = "../pages/login.php";
				}
			},

			10: {
				msg: "Username already taken",
				defaultAction: () => {
				}
			},

			2: {
				msg: "Channel name can only contain lowercase letters and numbers",
				defaultAction: () => {
				}
			},
			
			17: {
				msg: "Channel does not exist",
				defaultAction: () => {
				}
			},


			18: {
				msg: "User not found",
				defaultAction: () => {
				}
			}
		};
	}

	getError(code) {
		const error = this.errorMap[code];
		if (!error) {
			return this.defaultError;
		}
		return error;
	}
}

export const errorHandler = new ErrorHandler();
