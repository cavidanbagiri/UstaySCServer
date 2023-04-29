
const ServiceClass = require('../services/service.warehouse'); 

class WarehouseController {

    // Fetch Materials
    static async fetchMaterials(){

        ServiceClass.fetchMaterials();

    }



}
