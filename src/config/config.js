
module.exports = {

    DATABASE:'ustay',
    USERNAME:'postgres',
    PASSWORD:'Initial_123',
    HOST:'localhost',
    DIALECT:'postgres',
    define: {
        timestamps: false // I don't want timestamp fields by default
    },
    // see https://stackoverflow.com/questions/47367893/sequelize-reads-datetime-in-utc-only
    dialectOptions: {
        useUTC: false, // for reading from database
        dateStrings: true,
        typeCast(field, next) {
            // for reading from database
            if (field.type === 'DATETIME') {
                return field.string();
            }
            return next();
        }
    },
    timezone: '+03:00',
}
