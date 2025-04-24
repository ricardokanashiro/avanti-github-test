import { toast } from 'react-toastify';

const notify = (state = 'success', message) => {
   
   switch(state) {
      case 'success':
         toast.success(message)
         break
      case 'error':
         toast.error(message)
         break
   }
}

export { notify }