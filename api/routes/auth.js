const router = require('express').Router();
const db = require('../db');

// 新規登録
router.post("/register", async (req, res) => {

    try {
        const checkSql = `SELECT * FROM users WHERE email="${req.body.email}"`;
        const [checkResult] = await db.promise().query(checkSql);

        if (checkResult.length !== 0) {
            return res.status(409).send("This email has already been registered");
        }

        const insertSql = `INSERT INTO users (name, email, password) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.password}')`;
        await db.promise().query(insertSql);

        return res.status(200).send("Registered New User");

        } catch (err) {
            return res.status(500).send(err);
    }
})

// ログイン
router.post("/login", async (req, res) => {
    try {

        const sql = `SELECT * FROM users WHERE email="${req.body.email}"`;
        const [result] = await db.promise().query(sql);
        const user = result[0]
        // return res.send(user);
        
        // ユーザ照会
        if (!user || req.body.name != user.name) return res.status(404).send(`Not Found ${req.body.name}`);

        // パスワード確認
        if (req.body.password != user.password) return res.status(400).send("Password False");

        return res.status(200).send(`Logined as ${req.body.name}`);

    } catch (err) {
        return res.status(500).send(err);
    }
})

module.exports = router;