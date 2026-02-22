import { Router } from 'express';
import { listAvailablePlansController } from '../../controllers/servers/plan.controller';

const planRouter = Router();

planRouter.get('/', listAvailablePlansController);

export { planRouter };
