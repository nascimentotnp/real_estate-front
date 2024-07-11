import { users } from "./data";


class AuthService {
  login(username: string, password: string) {
    const user = users.find((user: { username: string; password: string; }) => user.username === username && user.password === password);

    if (user) {
      const response = {
        data: {
          accessToken: "mockAccessToken",
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
          }
        }
      };

      localStorage.setItem("user", JSON.stringify(response.data.user));
      return Promise.resolve(response.data);
    } else {
      return Promise.reject("Usuário ou senha incorretos");
    }
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string, role:string) {
    const newUser = {
      id: users.length + 1, 
      username,
      email,
      password,
      role
    };

    users.push(newUser); 
    return Promise.resolve(newUser); 
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
