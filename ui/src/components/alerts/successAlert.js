import Swal from "sweetalert2";

function successAlert(message) {
  return Swal.fire({
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
}

export default successAlert;
