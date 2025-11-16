// src/styles/theme.js
// 🎨 Tema global de colores y estilos base para styled-components

const theme = {
  colors: {
    primary: "#2563eb",      // Azul principal
    secondary: "#475569",    // Gris oscuro
    success: "#16a34a",      // Verde éxito
    danger: "#dc2626",       // Rojo error
    warning: "#facc15",      // Amarillo advertencia
    background: "#f5f7fa",   // Fondo general claro
    text: "#1e293b",         // Texto principal
  },
  fonts: {
    main: "'Poppins', sans-serif",
  },
  spacing: (factor) => `${factor * 8}px`, // Ejemplo: spacing(2) => "16px"
};

export default theme;
