import ReportRepository from '../repository/reportRepository.js';

class ReportController {

    async getAllReports(req, res) {
        try {
            const reports = await ReportRepository.getAllReports();
            res.status(200).json(reports);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

export default new ReportController();