import Router from 'koa-router';
import { getHealthMiddleware } from './getHealth';
import { postReadingMiddlewares } from './postReading';

const router = new Router();
// router.use(handleErrorMiddleware);

router.get('/health', getHealthMiddleware);

router.post('/reading', ...postReadingMiddlewares);

export default router;
