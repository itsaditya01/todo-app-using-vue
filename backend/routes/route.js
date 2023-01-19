const express = require("express");
const pool = require("../db");
const router = express.Router();

router.get("/todo", async (req, res) => {
  try {
    pool.query("select * from todo;", (err, results) => {
      if (err) {
        res.status(404).json({ error: "Not Found" });
      }

      res.status(200).json(results.rows);
    });
  } catch (error) {}
});

router.post("/todo", async (req, res) => {
  try {
    let date = new Date();
    let day = date.getDate();

    let month = date.getMonth() + 1;

    let year = date.getFullYear();

    let datestr = year + "-" + month + "-" + day;
    const val = req.body.body;
    pool.query(
      `insert into todo (value, data) values ('${val}', '${datestr}');`,
      (err, result) => {
        if (err) {
          res.status(404).json({ error: "Not inserted" });
        } else {
          res.status(200).json({ success: "todo added successfully" });
        }
      }
    );
  } catch (error) {}
});

router.delete("/todo/:id", async (req, res) => {
  try {
    pool.query(
      `delete from todo where id = ${req.params.id}`,
      (err, result) => {
        if (err) {
          res.status(404).json({ error: "Not deleted" });
        } else {
          res.status(200).json({ success: "todo deleted successfully" });
        }
      }
    );
  } catch (error) {}
});

module.exports = router;
