import { pool } from "../db/connection";

class DataRepository {

    async searchData(startdate: string, enddate: string): Promise<any> {
        startdate+=' 00:00:00';
        enddate+=' 23:59:59';
        const [data] = await pool.query(`SELECT * FROM weather WHERE date BETWEEN ? AND ?;`, [startdate, enddate]) as any;
        return data;
    }

    async getData(): Promise<any> {
        const [data] = await pool.query(`select * 
                                      from (select *
                                                from weather
                                              order by date desc
                                              limit 10) t
                                      order by date ASC;`) as any;
        return data;
    }

    async saveData(data: any): Promise<any> {
        const query = `INSERT INTO weather (temperature, date) values(?, ?);`
        await pool.query(query, [data, new Date()]); 
        const [lastInserted] = await pool.query('SELECT * FROM weather WHERE id = LAST_INSERT_ID();') as any;
        return lastInserted;
    }
}

export default new DataRepository();