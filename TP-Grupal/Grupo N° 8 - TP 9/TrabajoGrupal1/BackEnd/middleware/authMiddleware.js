// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    // 1. Obtener el token del encabezado (header)
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
    }

    const token = authHeader.split(' ')[1]; // El token es la segunda parte (después de 'Bearer')

    try {
        // 2. Verificar el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Agregar los datos decodificados al objeto de la solicitud (req.user)
        // Esto permite que los controladores sepan quién hizo la solicitud
        req.user = decoded; 
        
        // 4. Si es válido, pasar al siguiente middleware o controlador
        next();

    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expirado. Vuelva a iniciar sesión.' });
        }
        return res.status(401).json({ message: 'Token inválido o corrupto.' });
    }
};

export default authMiddleware;