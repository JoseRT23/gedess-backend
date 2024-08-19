import { pool } from "../db/connection";

class ParameterRepository {

    async getParametersByUser(iduser: number): Promise<any> {
        const queryparameters = `SELECT p.id, username, p.min_alert_value, p.max_alert_value, p.min_chart_value, p.max_chart_value, p.parameter_user_id
                                    FROM user u
                                    LEFT JOIN parameter p
                                    ON p.parameter_user_id = u.id
                                    WHERE u.id =?`;
        const [parameters] = await pool.query(queryparameters, [iduser]) as any;
        return parameters;
    }

    async saveParameter(parameter: any): Promise<any> {
        const queryinsert = `INSERT INTO parameter(min_alert_value, max_alert_value, min_chart_value, max_chart_value, parameter_user_id) 
                             VALUES ( ? , ? , ? , ? , ?);`;
        //Save parameters
        await pool.query(queryinsert, [
            parameter.min_alert_value,
            parameter.max_alert_value,
            parameter.min_chart_value,
            parameter.max_chart_value,
            parameter.parameter_user_id,
        ]); 
        const [lastInserted] = await pool.query('SELECT * FROM parameter WHERE id = LAST_INSERT_ID();') as any;
        return lastInserted;
    }

    async updateParameter(idparameter: any, parameter: any): Promise<any> {
        const queryupdate = `UPDATE parameter SET min_alert_value=?, max_alert_value=?, min_chart_value=?, max_chart_value=? WHERE ?;`;
        //Update parameter
        await pool.query(queryupdate, [
            parameter.min_alert_value,
            parameter.max_alert_value,
            parameter.min_chart_value,
            parameter.max_chart_value,
            idparameter,
        ]) as any;
        parameter.id = idparameter;
        return parameter;
    }
}

export default new ParameterRepository();