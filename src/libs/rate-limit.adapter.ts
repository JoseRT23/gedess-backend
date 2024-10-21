import { rateLimit } from 'express-rate-limit'

export const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // Tiempo por el cual se recuerdan la solicitudes
	limit: 5, // Limite cada IP a 5 solicitudes por «ventana» cada 1 minuto
	standardHeaders: true, // Información sobre el límite de la tasa de retorno en el `RateLimit-*` headers
	legacyHeaders: false, // Desabilitar `X-RateLimit-*` headers
    message: { status: 429, message: "Solo puedes hacer 5 peticiones por minuto." }
});
