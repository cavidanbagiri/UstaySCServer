
// module.exports = {

//     DATABASE:'ustay',
//     USERNAME:'postgres',
//     PASSWORD:'Initial_123',
//     HOST:'localhost',
//     DIALECT:'postgres',
//     define: {
//         timestamps: false // I don't want timestamp fields by default
//     },
//     // see https://stackoverflow.com/questions/47367893/sequelize-reads-datetime-in-utc-only
//     dialectOptions: {
//         useUTC: false, // for reading from database
//         dateStrings: true,
//         typeCast(field, next) {
//             // for reading from database
//             if (field.type === 'DATETIME') {
//                 return field.string();
//             }
//             return next();
//         }
//     },
//     timezone: '+03:00',
// }

// module.exports = {

//     DATABASE:'ustay',
//     USERNAME:'ustay_user',
//     PASSWORD:'72BaYcPnLngQWjX3uIfEpVhfEg3y3jT7',
//     HOST:'dpg-cii7n459aq012eq9u9cg-a.oregon-postgres.render.com',
//     DIALECT:'postgres',
//     define: {
//         timestamps: false // I don't want timestamp fields by default
//     },
//     // see https://stackoverflow.com/questions/47367893/sequelize-reads-datetime-in-utc-only
//     dialectOptions: {
//         useUTC: false, // for reading from database
//         dateStrings: true,
//         typeCast(field, next) {
//             // for reading from database
//             if (field.type === 'DATETIME') {
//                 return field.string();
//             }
//             return next();
//         }
//     },
//     timezone: '+03:00',
// }

//postgres://ustay_user:72BaYcPnLngQWjX3uIfEpVhfEg3y3jT7@dpg-cii7n459aq012eq9u9cg-a.oregon-postgres.render.com/ustay