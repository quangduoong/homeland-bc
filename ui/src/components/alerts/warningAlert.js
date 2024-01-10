import Swal from "sweetalert2";

export default function warningAlert(title, text = undefined) {
  return Swal.fire({
    icon: "warning",
    title,
    text: text ?? "",
    showConfirmButton: true,
    confirmButtonColor: "#7F56D9",
    showCancelButton: true,
    cancelButtonColor: "gray",
  });
}
