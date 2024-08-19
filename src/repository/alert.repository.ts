import { pool } from "../db/connection";

class AlertRepository {

    async getAlertsByUser(iduser: string): Promise<any> {
        const queryalert = `select * 
                            from alert a
                            left join user u
                            on a.alert_user_id = u.id
                            WHERE u.id = ?
                            ORDER BY date DESC;`;
        const [alert] = await pool.query(queryalert, [iduser]) as any;
        return alert;
    }

    async saveAlert(alert: any): Promise<any> {
        const queryalert = 'INSERT INTO alert (value, date, type, alert_user_id) VALUES (?, ?, ?, ?);';
        await pool.query(queryalert, [alert.value, new Date(), alert.type, alert.alert_user_id]);
        return alert;
    }
}

export default new AlertRepository();