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
}

export default new ReportRepository();
