import alertRepository from "../repository/alert.repository";

class AlertService {

    async getAlertsByUser(iduser: string): Promise<any> {
        const alerts = await alertRepository.getAlertsByUser(iduser);
        return alerts;
    }

    async saveAlert(alert: any): Promise<any> {
        const newalert = await alertRepository.saveAlert(alert);
        return newalert;
    }
}

export default new AlertService();