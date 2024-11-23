/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/*相関函式庫*/
var clock=require("../../modules/clock.js");
var httpServer=require("../../modules/httpServer.js");
var database=require("../../modules/database.js"); 
var error=require("../../modules/error.js");
var catchError = error.catchError;
var errorController = error.errorController;
var xss = require("xss");

/*伺服器部分*/
var cnDB=null;
var app=httpServer.app();

/*查詢己爬蟲爬到的資料*/
// GET /crawler/AQI/ALL => 全部測站的資料
app.get("/read/crawler/AQI/ALL",async function(req, res) {
    console.log(`[${clock.consoleTime()}] HTTP GET /read/crawler/AQI/ALL`);

    var statusSQL = `SELECT siteid,sitename,aqi,monitordate FROM AQX_P_434 ORDER BY siteid ASC;`;
    var cnDB = database.cnDB();
    const connection = await cnDB.getConnection(); // 從連接池中獲取一個連接

    try {
        const results = await connection.query(statusSQL, { cache: false }); // 執行 SQL 查詢
        const formattedResults = results[0].map(item => ({
            code: "1",
            ...item,
            monitordate: clock.formatDateToYYYYMMDD(item.monitordate) // 格式化日期
        }));
        var data = JSON.stringify(formattedResults);
        res.send(data);
    } catch (error) {
        console.error(`[${clock.consoleTime()}] Failed to execute query: ${error.message}`);
        const responseMeta = { code: "-1" };
        res.send(responseMeta);
        throw error;
    } finally {
        connection.release(); // 釋放連接
    }
},catchError(errorController));

// GET /read/crawler/AQI/site => 指定特定測站的資料
app.get("/read/crawler/AQI/site", async function(req, res) {
    const {sitename} = req.query;
    console.log(`[${clock.consoleTime()}] HTTP GET /read/crawler/AQI/site`);

    var statusSQL = `SELECT siteid,sitename,aqi,monitordate FROM AQX_P_434 WHERE sitename = ? ORDER BY siteid ASC;`;
    var cnDB = database.cnDB();
    const connection = await cnDB.getConnection(); // 從連接池中獲取一個連接

    try {
        const results = await connection.query(statusSQL,[sitename], { cache: false }); // 執行 SQL 查詢
        const formattedResults = results[0].map(item => ({
            code: "1",
            ...item,
            monitordate: clock.formatDateToYYYYMMDD(item.monitordate) // 格式化日期
        }));
        var data = JSON.stringify(formattedResults);
        res.send(data);
        console.log(`[${clock.consoleTime()}] ${data}`);
    } catch (error) {
        console.error(`[${clock.consoleTime()}] Failed to execute query: ${error.message}`);
        const responseMeta = { code: "-1" };
        res.send(responseMeta);
        throw error;
    } finally {
        connection.release(); // 釋放連接
    }
},catchError(errorController));

// GET /read/crawler/CFoot/ALL => 全部物品的資料
app.get("/read/crawler/CFoot/ALL",async function(req, res) {
    console.log(`[${clock.consoleTime()}] HTTP GET /read/crawler/CFoot/ALL`);

    var statusSQL = `SELECT id,name,coe,unit,departmentname,announcementyear FROM CFP_P_02 ORDER BY id ASC;`;
    var cnDB = database.cnDB();
    const connection = await cnDB.getConnection(); // 從連接池中獲取一個連接

    try {
        const results = await connection.query(statusSQL, { cache: false }); // 執行 SQL 查詢
        const formattedResults = results[0].map(item => ({
            code: "1",
            ...item,
        }));
        var data = JSON.stringify(formattedResults);
        res.send(data);
        console.log(`[${clock.consoleTime()}] ${data}`);
    } catch (error) {
        console.error(`[${clock.consoleTime()}] Failed to execute query: ${error.message}`);
        const responseMeta = { code: "-1" };
        res.send(responseMeta);
        throw error;
    } finally {
        connection.release(); // 釋放連接
    }
},catchError(errorController));

// GET /read/crawler/Cfoot/name => 指定特定物品的資料
app.get("/read/crawler/Cfoot/name", async function(req, res) {
    var {name} = req.query;
    console.log(`[${clock.consoleTime()}] HTTP GET /read/crawler/Cfoot/name`);

    var statusSQL = `SELECT id, name, coe, unit, departmentname, announcementyear FROM CFP_P_02 WHERE name = ? ORDER BY id ASC;`;
    var cnDB = database.cnDB();
    const connection = await cnDB.getConnection(); // 從連接池中獲取一個連接

    try {
        var results = await connection.query(statusSQL,[name],{ cache: false }); // 執行 SQL 查詢
        var formattedResults = results[0].map(item => ({
            code: "1",
            ...item,
        }));
        var data = JSON.stringify(formattedResults);
        res.send(data);
    } catch (error) {
        console.error(`[${clock.consoleTime()}] Failed to execute query: ${error.message}`);
        const responseMeta = { code: "-1" };
        res.send(responseMeta);
        throw error;
    } finally {
        connection.release(); // 釋放連接
    }
},catchError(errorController));


// GET /read/crawler/CFoot/list => 物品名
app.get("/read/crawler/CFoot/list",async function(req, res) {
    console.log(`[${clock.consoleTime()}] HTTP GET /read/crawler/CFoot/list`);

    var statusSQL = `SELECT id,name FROM CFP_P_02 ORDER BY id ASC;`;
    var cnDB = database.cnDB();
    const connection = await cnDB.getConnection(); // 從連接池中獲取一個連接

    try {
        const results = await connection.query(statusSQL, { cache: false }); // 執行 SQL 查詢
        const formattedResults = results[0].map(item => ({
            code: "1",
            ...item,
        }));
        var data = JSON.stringify(formattedResults);
        res.send(data);
    } catch (error) {
        console.error(`[${clock.consoleTime()}] Failed to execute query: ${error.message}`);
        const responseMeta = { code: "-1" };
        res.send(responseMeta);
        throw error;
    } finally {
        connection.release(); // 釋放連接
    }
},catchError(errorController));
