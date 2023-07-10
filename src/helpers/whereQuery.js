

module.exports = createWhereQuery = (filtered_object) => {

    let where_query = '';

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

    // After Adding Each Filtered Key, Functions add and operator and at the end, and operations will be removed 
    where_query = where_query.slice(0,-4);
    console.log('where  : ',where_query);
    return where_query;

}
