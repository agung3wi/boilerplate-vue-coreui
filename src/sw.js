import swal from 'sweetalert2';
const Alert = {
    success: function (message = '') {
        swal.fire({
            title: 'Success !',
            text: message,
            icon: 'success',
            toast: false,
            position: 'center',
            timer: 5000,
        });
    },
    successLong: function (message = '') {
        swal.fire({
            title: 'Success !',
            text: message,
            type: 'success',
            toast: false,
            position: 'center',
            timer: 30000,
        });
    },
    error: function (message = '') {
        swal.fire({
            title: 'Error !',
            text: message,
            icon: 'error',
            toast: false,
            position: 'center',
            timer: 5000,
            confirmButtonText: 'Confirm'
        });
    },
    confirm: function (message = '') {
        let msg = message == '' ? 'Change this status ?' : message;
        return swal.fire({
            title: msg,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            return result.value;
        })
    },
    toastSuccess: function (message = '') {
        swal.fire({
            position: 'bottom-end',
            title: message,
            showConfirmButton: false,
            toast: true,
            timer: 5000,
            icon: 'success',
            // background: '#7aa93c',
            // customClass: {
            //   icon:'text-white',
            //   title:'text-white'
            // }
        });
    },
    toastError: function (message = '') {
        swal.fire({
            position: 'bottom-end',
            title: message,
            showConfirmButton: false,
            toast: true,
            timer: 5000,
            icon: 'error',

        });
    },
};
export default Alert;
