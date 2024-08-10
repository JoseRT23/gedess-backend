import { pool } from "../db/connection";

class ParameterRepository {

    async getParametersByUser(iduser: number): Promise<any> {
        const queryparameters = `SELECT username, p.min_alert_value, p.max_alert_value, p.min_chart_value, p.max_chart_value
                                    FROM user u
                                    LEFT JOIN parameter p
                                    ON p.iduser = u.id
                                    WHERE u.id =?`;
        const [parameters] = await pool.query(queryparameters, [iduser]) as any;
        return parameters;
    }

    async saveParameter(parameter: any): Promise<any> {
        const queryinsert = `INSERT INTO parameter(min_value, max_value, minchart, maxchart) VALUES ( ? , ? , ? , ?);`;
        //Save parameters
        await pool.query(queryinsert, [
            parameter.min_value,
            parameter.max_value,
            parameter.minchart,
            parameter.maxchart,
        ]); 
        const [lastInserted] = await pool.query('SELECT * FROM parameter WHERE id = LAST_INSERT_ID();') as any;
        return lastInserted;
    }

    async updateParameter(idparameter: any, parameter: any): Promise<any> {
        const queryupdate = `UPDATE parameter SET min_value=?, max_value=?, minchart=?, maxchart=? WHERE ?;`;
        //Update parameter
        await pool.query(queryupdate, [
            parameter.min_value,
            parameter.max_value,
            parameter.minchart,
            parameter.maxchart,
            idparameter,
        ]) as any;
        return parameter;
    }
}

export default new ParameterRepository();