import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test1', (req: Request, res: Response) => {
  return res.json({ msg: 'API test, works' });
});

export default router;
