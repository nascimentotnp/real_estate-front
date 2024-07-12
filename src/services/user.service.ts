import { adminBoard, publicContent, userBoard } from "./data";

interface ApiResponse {
  data: string;
}
class UserService {
  getPublicContent() {
    return new Promise<ApiResponse>((resolve) => {
      resolve({ data: publicContent });
    });
  }

  getUserBoard() {
    return new Promise<ApiResponse>((resolve) => {
      resolve({ data: userBoard });
    });
  }

  

  getAdminBoard() {
    return new Promise<ApiResponse>((resolve) => {
      resolve({ data: adminBoard });
    });
  }
}

export default new UserService();