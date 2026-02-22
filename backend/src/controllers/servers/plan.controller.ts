import { NextFunction, Request, Response } from 'express';
import { AdminAuthenticatedRequest } from '../../middleware/admin-auth.middleware';
import {
  createPlanForAdmin,
  deletePlanForAdmin,
  getAvailablePlans,
  getPlansForAdmin,
  updatePlanForAdmin
} from '../../services/servers/plan.service';

export const listAvailablePlansController = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const plans = await getAvailablePlans();
    res.status(200).json({ success: true, data: plans });
  } catch (error) {
    next(error);
  }
};

export const listPlansForAdminController = async (
  _req: AdminAuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const plans = await getPlansForAdmin();
    res.status(200).json({ success: true, data: plans });
  } catch (error) {
    next(error);
  }
};

export const createPlanController = async (
  req: AdminAuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await createPlanForAdmin(req.body);
    res.status(201).json({ success: true, message: 'Plan created', data: result });
  } catch (error) {
    next(error);
  }
};

export const updatePlanController = async (
  req: AdminAuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await updatePlanForAdmin(Number(req.params.planId), req.body);
    res.status(200).json({ success: true, message: 'Plan updated', data: result });
  } catch (error) {
    next(error);
  }
};

export const deletePlanController = async (
  req: AdminAuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await deletePlanForAdmin(Number(req.params.planId));
    res.status(200).json({ success: true, message: 'Plan deleted', data: result });
  } catch (error) {
    next(error);
  }
};
