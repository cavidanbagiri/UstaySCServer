

module.exports = createWhereQuery = (start_keyword, filtered_object) => {

    /*
      start_keyword if filtered data for user will be add 'and' after where user id
    */
    let where_query = `${start_keyword} `;

    for (let [key, value] of Object.entries(filtered_object)) {
      if (filtered_object[key] !== "") {

        // If Key name is material name or material type, like query will work will start wil entering value
        if(key === 'material_name' ){
          where_query += `${key} LIKE '${filtered_object[key]}%' `
        }
        else if(key === 'stf_num'){
          where_query += `${key} LIKE '%${filtered_object[key]}' `
        }
        else if(key === 'created_at' ){
          where_query += `stfs.${key}::date = '${filtered_object[key]}' `
        }
        else{
          where_query += `${key} = '${filtered_object[key]}' `
        }

        where_query += 'and ';
      }
    }

      if(where_query.trim().length === start_keyword.length){
        where_query = where_query.slice(0, -(start_keyword.length+1));
      }
      where_query = where_query.slice(0, -4);


    return where_query;

}
