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

    async createRaport(data) {
        return await ReportModel.create(data);
      }
    
}

export default new ReportRepository();
