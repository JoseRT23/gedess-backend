import dataRepository from "../repository/data.repository";
import SocketService from "./socketio.service";

class DataService {

    async searchData(startdate: string, enddate: string): Promise<any> {
        const data = await dataRepository.searchData(startdate, enddate);
        return data;
    }

    async getData(): Promise<any> {
        const data = await dataRepository.getData();
        return data;
    }

    async saveData(data: any): Promise<any> {
        try {
            const [newdata] = await dataRepository.saveData(data);
            if (!newdata) {
                throw {
                    message: "Ha ocurrido un error guardando la información",
                    status: 400
                }
            }
            const io = SocketService.getInstance();
            io.emit('newData', newdata); 
            return newdata;            
        } catch (error) {
            throw error;
        }
    }

}

export default new DataService();