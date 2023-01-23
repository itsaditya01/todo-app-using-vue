const express = require("express");
const pool = require("../db");
const router = express.Router();
const verifytoken = require("../middleware/verifytoken");

router.get("/todo", verifytoken, async (req, res) => {
  try {
    const id = req.user;
    const is_admin = req.is_admin;
    if (is_admin) {
      pool.query(
        "select t.id, t.value, t.date, t.userid, u.name from todo t inner join todo_users u on t.userid = u.id order by t.id DESC;",
        (err, results) => {
          if (err) {
            res.status(404).json({ error: "Not Found" });
          }

          res.status(200).json({ data: results.rows, is_admin: true });
        }
      );
    } else {
      console.log(id);
      pool.query(
        `select * from todo where userid=${id} order by id DESC;`,
        (err, results) => {
          if (err) {
            res.status(404).json({ error: "Not Found" });
          }

          res.status(200).json({ data: results.rows, is_admin: false });
        }
      );
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/todo", verifytoken, async (req, res) => {
  try {
    let date = new Date();
    let day = date.getDate();

    let month = date.getMonth() + 1;

    let year = date.getFullYear();

    let datestr = year + "-" + month + "-" + day;
    const val = req.body.value;
    const id = req.user;
    pool.query(
      `insert into todo (value, date, userid) values ('${val}', '${datestr}', '${id}');`,
      (err, result) => {
        if (err) {
          res.status(404).json({ error: "Not inserted" });
        } else {
          res.status(200).json({ success: "todo added successfully" });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/todo/:id", verifytoken, async (req, res) => {
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
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/todo/:id", async (req, res) => {
  try {
    const updatedTodo = req.body.updatedTodo;
    console.log(updatedTodo);
    pool.query(
      `update todo set value = '${updatedTodo}' where id = ${req.params.id}`,
      (err, result) => {
        if (err) {
          res.status(404).json({ error: "Not updated" });
        } else {
          res.status(200).json({ success: "todo updated successfully" });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getuser", verifytoken, async (req, res) => {
  try {
    const id = req.user;
    const is_admin = req.is_admin;

    res.status(200).json({
      id: id,
      is_admin: is_admin
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
