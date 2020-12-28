const DB_USER = "sajith";
const DB_PASSWORD = "root";
const DB_NAME = "keralatourism";
const CLUSTER_HOST = "apidemo.yxdcz.mongodb.net";

exports.DB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
