import { adminBoard, moderatorBoard, publicContent, userBoard } from "./data";

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

  getModeratorBoard() {
    return new Promise<ApiResponse>((resolve) => {
      resolve({ data: moderatorBoard });
    });
  }

  getAdminBoard() {
    return new Promise<ApiResponse>((resolve) => {
      resolve({ data: adminBoard });
    });
  }
}

export default new UserService();