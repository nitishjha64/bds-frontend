import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";

const autoClose = 2000

export const showToastMessage = (type, message, _cb) => {
    try {
        console.log('showtoastmessage', type, message)
        switch(type){
            case 'success':
            toast.success(message, { autoClose, onClose: () => _cb()});
            break;
            case 'error':
            toast.error(message, { autoClose, onClose: () => _cb()});
            break;
        }
    } catch (error) {
        console.log(error)
    }
  };