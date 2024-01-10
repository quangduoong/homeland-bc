import axios from "axios";
import { apiUrl } from "../../assets/utils/constants";

export default async function getApis(method, path, data = null) {
  return await axios({
    method,
    url: apiUrl + path,
    data: data ? data : undefined,
    validateStatus: function (status) {
      return status > 199 && status < 500; // Reject only if the status code is greater than or equal to 500
    },
  })
    .then((res) => res)
    .catch((err) => err);
}
