import alertRepository from "../repository/alert.repository";

class AlertService {

    async getAlerts(): Promise<any> {
        const alerts = await alertRepository.getAlerts();
        return alerts;
    }

    async saveAlert(alert: any): Promise<any> {
        const alerts = await alertRepository.saveAlert(alert);
        return alerts;
    }
}

export default new AlertService();