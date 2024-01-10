export default function errorCatch(error) {
  if (error.response?.data) return error.response.data;
  else return { success: false, message: error.message };
}
