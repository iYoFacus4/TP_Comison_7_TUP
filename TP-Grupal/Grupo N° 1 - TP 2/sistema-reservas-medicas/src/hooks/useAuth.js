// Hook simplificado que ahora solo exporta el contexto
// La lógica se movió a AuthContext para compartir estado globalmente
import { useAuthContext } from "../context/AuthContext";

export const useAuth = () => {
  return useAuthContext();
};

export default useAuth;
