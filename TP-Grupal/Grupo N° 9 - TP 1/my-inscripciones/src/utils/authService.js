// ✅ Simula login con usuario válido (admin@academy.com / admin123)

export async function fakeLogin({ email, password }) {
  // Usuario válido
  const validUser = {
    email: "admin@academy.com",
    password: "admin123",
    role: "admin",
    name: "Administrador Academy",
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === validUser.email && password === validUser.password) {
        console.log("✅ Sesión iniciada como:", validUser.email); // para debug
        resolve({
          user: {
            name: validUser.name,
            email: validUser.email,
            role: validUser.role,
          },
          token: "fake-jwt-token",
        });
      } else {
        console.warn("❌ Intento de login inválido:", email);
        reject(new Error("Credenciales inválidas ❌"));
      }
    }, 600);
  });
}

export function logout() {
  localStorage.removeItem("auth");
}
