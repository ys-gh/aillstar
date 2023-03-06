const router = require("express").Router();
const db = require('../db');

// 投稿作成
router.post("/", async (req, res) => {
    try {
        const sql = `INSERT INTO posts SET ?`;
        const [result] = await db.promise().query(sql, req.body);
        return res.status(200).send(result);

    } catch (err) {
        return res.status(500).send(err);
    }
    
});

// 投稿更新
router.put("/:id", async (req, res) => {
    try {

        const checkSql = `SELECT * FROM posts WHERE id=${req.params.id}`
        const [checkResult] = await db.promise().query(checkSql);
        const post = checkResult[0];
        // 照会エラー
        if (!post) return res.status(404).send(`Not Found post${req.params.id}`);
        // 権限エラー
        // return res.send(post);
        if (post.user_id !== req.body.user_id) return res.status(400).send("Account Error");

        const updateSql = `UPDATE posts SET ? WHERE id=${req.params.id}`;
        await db.promise().query(updateSql, req.body);
    

        res.status(200).send("Updated Sucess");
    } catch (err) {
        return res.status(500).send(err);
        
    }
})

// 投稿削除
router.delete("/:id", async (req, res) => {
    try {
        const checkSql = `SELECT * FROM posts WHERE id=${req.params.id}`
        const [checkResult] = await db.promise().query(checkSql);
        const post = checkResult[0];
        // return res.send(post)
        // 照会エラー
        if (!post) return res.status(404).send(`Not Found post${req.params.id}`);
        // 権限エラー
        if (post.user_id !== req.body.user_id) return res.status(400).send("Account Error");
        const deleteSql = `DELETE FROM posts WHERE id=${req.params.id}`;
        await db.promise().query(deleteSql);
        return res.status(200).send("Deleted Sucess");
    
    } catch (err) {
        
    }
});

// 投稿取得
router.get("/:id", async (req, res) => {
    try {
        const sql = `SELECT * FROM posts WHERE id=${req.params.id}`;
        const [result] = await db.promise().query(sql);

        const post = result[0];
        // 照会エラー
        if (!post) return res.status(404).send(`Not Found post${req.params.id}`);

        return res.status(200).send(post);

    } catch (err) {
        return res.status(500).send(err);
    }
});

module.exports = router;
