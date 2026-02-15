import { Router } from 'express';
import { loginController } from '../../controllers/auth/login.controller';
import { refreshController } from '../../controllers/auth/refresh.controller';
import { registerController } from '../../controllers/auth/register.controller';
import { loginRateLimit } from '../../middleware/rate-limit.middleware';
import { validateMiddleware } from '../../middleware/validate.middleware';
import { loginSchema, registerSchema } from '../../validations/auth.validation';

const authRouter = Router();

authRouter.post('/register', validateMiddleware(registerSchema), registerController);
authRouter.post('/login', loginRateLimit, validateMiddleware(loginSchema), loginController);
authRouter.post('/refresh', refreshController);

export { authRouter };
