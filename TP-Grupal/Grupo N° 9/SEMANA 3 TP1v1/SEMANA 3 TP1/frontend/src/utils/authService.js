export function fakeLogin({ email, password }) {
    // validación muy básica: si email contiene "@" lo aceptamos
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (email.includes("@")) {
          res({
            user: { name: "Usuario Demo", email },
            token: "fake-jwt-token"
          });
        } else {
          rej(new Error("Credenciales inválidas"));
        }
      }, 500);
    });
  }
  
  export function logout() {
    localStorage.removeItem("auth");
  }
  
