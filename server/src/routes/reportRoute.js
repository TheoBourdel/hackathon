import express from 'express';
import ReportController from '../controllers/reportController.js';

const router = express.Router();

router.get('/reports', ReportController.getAllReports);
router.get('/report/:id/pdf', ReportController.getReportPdf);

export default router;