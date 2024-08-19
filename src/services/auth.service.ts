import { bcriptAdapter } from "../libs/bcript.adapter";
import userRepository from "../repository/user.repository";


class AuthService {

    async login(credentials: any): Promise<any> {
        const user = await userRepository.searchUserByEmail(credentials.email, true);
        if (!user) {
            throw { message: "Usuario o contraseña incorrectos", status: 400 };
        }
        const isvalidpass = await bcriptAdapter.compare(credentials.password, user.password);
        if (!isvalidpass) {
            throw { message: "La contraseña ingresada es incorrecta", status: 400 };
        }

        delete user.password;
        return user;
    }

    async register(user: any): Promise<any> {
        const userexists = await userRepository.searchUserByEmail(user.email);
        if (userexists!==undefined) {
            throw {
                message: "Ya se encuentra registrado un usuario con ese correo",
                status: 400
            };
        }
        const encriptedpass = await bcriptAdapter.hash(user.password);
        user.password = encriptedpass;
        const [newuser] = await userRepository.saveUser(user);
        return newuser;
    }
}

export default new AuthService();