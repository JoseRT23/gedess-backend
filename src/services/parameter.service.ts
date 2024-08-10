import parameterRepository from "../repository/parameter.repository";

class ParameterService {

    async getParametersByUser(iduser: number): Promise<any> {
        const parameters = await parameterRepository.getParametersByUser(iduser);
        return parameters;
    }

    async saveParameter(parameter: any): Promise<any> {
        const newparameter = await parameterRepository.saveParameter(parameter);
        return newparameter;
    }

    async updateParameter(idparameter: any, parameter: any): Promise<any> {
        const updatedparameter = await parameterRepository.updateParameter(idparameter, parameter);
        return updatedparameter;
    }
}

export default new ParameterService();