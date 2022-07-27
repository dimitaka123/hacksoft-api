import mariadb from 'mariadb';
let local = false;
var pool = local ? mariadb.createPool({
    host       : "127.0.0.1",
    user       : "root",
    password   : "telerik",
    port       : "3306",
    database   : 'hacksoft',
    max_user_connections: 1,
    connectionLimit: 1
  }) :
  mariadb.createPool({
    host       : "bvmbpolpfhovrg8w49tg-mysql.services.clever-cloud.com",
    user       : "utlqfiush2vv9l6o",
    password   : "P6aUxmxDfDC9lUgklTTi",
    port       : "3306",
    database   : 'bvmbpolpfhovrg8w49tg',
    max_user_connections: 1,
    connectionLimit: 1
  })

export default pool;