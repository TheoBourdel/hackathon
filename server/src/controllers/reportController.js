import Message from '../models/Message.js';
import ReportRepository from '../repository/reportRepository.js';
import { buildPdf } from '../services/pdfkit.js';
import MEssageRepository from '../repository/messageRepository.js';
import messageRepository from '../repository/messageRepository.js';
class ReportController {

    async getAllReports(req, res) {
        try {
            const reports = await ReportRepository.getAllReports();
            res.status(200).json(reports);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getReportPdf(req, res) {
        try {
            const report = await ReportRepository.getReportById(req.params.id);
            if(!report) {
                res.status(404).json({ error: `Le rapport est introuvable` });
                return;
            }

            const stream = res.writeHead(200, {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=rapport.pdf`
            });

            buildPdf(report, (data) => {
                stream.write(data);
            }, () => {
                stream.end();
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    async createReport(req, res) {
        try {
            const { userId, title, description, category, status, messages, type } = req.body;
            const newReport = await ReportRepository.createReport({ userId, title, description, category, status, type });
            
            if (messages) {
                await Promise.all(messages.map(async (message) => {
                    return  messageRepository.updateMessage(message.id, {reportId: newReport.id })
                }));
            }

            res.status(201).json(newReport);
        } catch (error) {
          console.error('Error creating report:', error);
          res.status(500).json({ error: error.message });
        }
    }

}

export default new ReportController();