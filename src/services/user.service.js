import { axiosService } from "./axios.service";
import { urls } from "../configs/urls";

const userService = {
  getAllUsers: (limit = 10, offset = 0) =>
    axiosService.get(urls.user, { params: { limit, offset } }),
  createUser: (user) => axiosService.post(urls.user, user),
  updateUserById: (id, user) => axiosService.put(`${urls.user}${id}/`, user),
  deleteUserById: (id) => axiosService.delete(`${urls.user}${id}/`),
};

export { userService };
