'use strict';

import Message from '../models/Message.js';
import ReportModel from '../models/reportModel.js';
import User from '../models/user.js';

class ReportRepository {
    async getAllReports() {
        return await ReportModel.findAll({
            include: [
                {
                    model: User,
                    as: 'User',
                },
                {
                    model: Message,
                    as: 'messages',
                }
            ],
        });
    }

    async getReportById(id) {
        // return await ReportModel.findByPk(id);
        return await ReportModel.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'User',
                },
                {
                    model: Message,
                    as: 'messages',
                }
            ],
        });
    
    }

    async createReport(reportData) {
        return await ReportModel.create(reportData);
    }

}

export default new ReportRepository();
