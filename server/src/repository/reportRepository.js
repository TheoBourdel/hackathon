'use strict';

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
            ],
        });
    }

    async getReportById(id) {
        return await ReportModel.findByPk(id);
    }

    async createReport(reportData) {
        return await ReportModel.create(reportData);
    }

}

export default new ReportRepository();
