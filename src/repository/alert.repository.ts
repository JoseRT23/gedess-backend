import { pool } from "../db/connection";

class AlertRepository {

    async getAlerts(): Promise<any> {
        const queryalert = 'SELECT id, value, date, type FROM alert ORDER BY date DESC;';
        const [alert] = await pool.query(queryalert) as any;
        return alert;
    }

    async saveAlert(alert: any): Promise<any> {
        const queryalert = 'INSERT INTO alert (value, date, type) VALUES (?, ?, ?);';
        await pool.query(queryalert, [alert.value, new Date(), alert.type]); 
    }
}

export default new AlertRepository();