import { axiosService } from "./axios.service";
import { urls } from "../configs/urls";

const authService = {
  login: (user) => axiosService.post(urls.login, user),
};

export { authService };
