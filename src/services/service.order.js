const db = require("../models");

const MTFModel = db.MTFModel;

class OrderService {
  // Create a MTF form
  static async createMtf(data) {
    let mtf_num = 0;
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].type !== "" &&
        data[i].name !== "" &&
        data[i].count !== 0 &&
        data[i].count !== ""
      ) {
        if (i === 0) {
          const creating_data = await MTFModel.create(data[i]);
          if (creating_data.id) {
            let counting = creating_data.id + 1000;
            mtf_num = `SRU.RS21.${counting}`;
            let string_query = db.sequelize.query(
              `update mtfs set mtf_num = '${mtf_num}' where id=${creating_data.id}`
            );
            continue;
          }
        }
        data[i].mtf_num = mtf_num;
        const temp = await MTFModel.create(data[i]);
      }
    }

    return "OK";
  }

  // Get Last ID from database
  static async getLastId() {
    const query = "";
  }
}

module.exports = OrderService;
