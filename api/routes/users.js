const router = require('express').Router();
const db = require('../db');

// 全ユーザ取得
router.get('/', async (req, res) => {
    try {
        const sql = 'SELECT * FROM users';
        const result = await db.promise().query(sql);
        user = result[0]

        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send(err)
    }
});

// ユーザ取得
router.get('/:id', async (req, res) => {
    try {

        const sql = `SELECT * FROM users WHERE id=${req.params.id}`;
        const result = await db.promise().query(sql);
        user = result[0]

        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send(err)
    }
});

// ユーザ削除
router.delete("/:id", async (req, res) => {
    try {
        const sql = `DELETE FROM users WHERE id=${req.params.id}`;
        const [result] = await db.promise().query(sql);
        user = result[0];
        // 権限エラー
        if (req.body.userId !== req.params.id) return res.status(403).send("Account Error");
        // 照会エラー
        if (result.affectedRows === 0) return res.status(404).send(`Not Found ${req.body.userId}`);
        
        return res.status(200).send(`Deleted ${req.body.userId}`);

        
    } catch (err) {
        return res.status(500).send(err);
    }

});

// ユーザ更新
router.put('/:id', async (req, res) => {
    try {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        const sql = `UPDATE users SET ? WHERE id=${req.params.id}`;
        const [result] = await db.promise().query(sql, newUserData);

        // 権限エラー
        if (req.body.userId !== req.params.id) return res.status(403).send("Account Error");
        // 照会エラー
        if (result.affectedRows === 0) return res.status(404).send(`Not Found ${req.params.id}`);
        return res.status(200).send(`Updated ${req.body.userId}`);


    } catch (err) {
        return res.status(500).send(err);
    }
});




module.exports = router;