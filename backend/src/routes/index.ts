import { Router } from 'express';

import categoryRouter from './category.routes';
import productRouter from './product.routes';

const router = Router();
router.use(productRouter);
router.use(categoryRouter);
export default router;
