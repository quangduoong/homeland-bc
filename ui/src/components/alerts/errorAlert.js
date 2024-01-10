import Swal from "sweetalert2";

export default function errorAlert(message) {
  return Swal.fire({
    icon: "error",
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
}
