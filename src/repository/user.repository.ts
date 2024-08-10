import { pool } from "../db/connection";

class UserRepository {

    async searchUserByEmail(email: any, full=false): Promise<any> {
        let query = ``;
        if (full) 
            query = `SELECT * FROM user WHERE email=?;`
        else
            query = `SELECT username FROM user WHERE email=?;`;
        const [user] = await pool.query(query, [email]) as any;
        return user[0];
    }

    async saveUser(user: any): Promise<any> {
        const queryinsert = `INSERT INTO user(username, email, password, cellphone) VALUES (?, ?, ?, ?);`;
        await pool.query(queryinsert, [
            user.username,
            user.email,
            user.password,
            user.cellphone
        ]);
        const [lastInserted] = await pool.query('SELECT username, email, cellphone FROM user WHERE id = LAST_INSERT_ID();') as any;
        return lastInserted;
    }
}

export default new UserRepository();