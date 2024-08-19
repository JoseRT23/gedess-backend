import dataRepository from "../repository/data.repository";
import SocketService from "./socketio.service";
import * as ExcelJS from 'exceljs';

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

    async generateExcel(startdate: string, enddate: string): Promise<any> {
        const weatherdata = await this.searchData(startdate, enddate);

        // Crear un nuevo libro de Excel
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Datos');

        // Añadir cabeceras a las columnas
        worksheet.columns = [
            { header: 'Temperatura', key: 'temperature', width: 30 },
            { header: 'Fecha', key: 'date', width: 20 },
        ];

        // Añadir algunas filas de ejemplo
        for (const data of weatherdata) {
            worksheet.addRow({ temperature: data.temperature, date: data.date });            
        }

        return workbook;
    }
}

export default new DataService();