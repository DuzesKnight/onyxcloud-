import {
  createPlan,
  deactivatePlan,
  findPlanById,
  listActivePlans,
  listPlansForAdmin,
  updatePlan
} from '../../repositories/servers/plan.repository';
import { AppError } from '../../utils/errors';

export const getAvailablePlans = async () => listActivePlans();

export const getPlansForAdmin = async () => listPlansForAdmin();

export const createPlanForAdmin = async (input: {
  name: string;
  price: number;
  ram: number;
  cpu: number;
  disk: number;
  eggId: number;
  dockerImage: string;
}) => {
  const planId = await createPlan(input);
  return { planId };
};

export const updatePlanForAdmin = async (
  planId: number,
  input: {
    name: string;
    price: number;
    ram: number;
    cpu: number;
    disk: number;
    eggId: number;
    dockerImage: string;
    isActive: boolean;
  }
) => {
  const existing = await findPlanById(planId);
  if (!existing) {
    throw new AppError('Plan not found', 404);
  }

  await updatePlan(planId, input);
  return { planId };
};

export const deletePlanForAdmin = async (planId: number) => {
  const existing = await findPlanById(planId);
  if (!existing) {
    throw new AppError('Plan not found', 404);
  }

  await deactivatePlan(planId);
  return { planId, status: 'deleted' as const };
};
