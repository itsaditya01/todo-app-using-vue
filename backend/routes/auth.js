const express = require("express");
const pool = require("../db");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secret = process.env.JWT_SECRET;
const tokenLife = process.env.TOKEN_LIFE;

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    pool.query(
      `SELECT * FROM todo_users WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          res.status(404).json({
            success: false,
            message: "Error occured at server side"
          });
        }

        if (results.rows.length > 0) {
          const user = results.rows[0];
          const data = {
            user: user.id,
            is_admin: user.is_admin
          };

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              res.status(404).json({
                success: false,
                message: "Error occured at password matching"
              });
            }
            // checking if password is matching or not

            if (isMatch) {
              jwt.sign(data, secret, { expiresIn: tokenLife }, (err, token) => {
                if (err) {
                  res
                    .status(404)
                    .json({ success: false, message: err.message });
                } else {
                  res.status(200).json({
                    success: true,
                    token: `Bearer ${token}`,
                    user: {
                      name: user.name
                    },
                    message: "Login Successful."
                  });
                }
              });
            } else {
              //password is incorrect
              res
                .status(200)
                .send({ success: false, message: "Password incorrect" });
            }
          });
        } else {
          res.status(400).send({
            success: false,
            message: "No user exist with this email id"
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    let { name, email, password, password2, is_admin } = req.body;

    //to check password is matching or not
    if (password !== password2) {
      res.status(200).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    //to check email is already exist or not
    pool.query(
      `SELECT * FROM todo_users WHERE email = $1`,
      [email],
      async (err, results) => {
        if (err) {
          res.status(404).json({
            success: false,
            message: "Server error: " + err.message
          });
        }

        if (results.rows.length > 0) {
          res.status(200).json({
            success: false,
            message: "User with this email id already exists"
          });
        } else {
          //Create Hashing of password
          const salt = await bcrypt.genSalt(10);
          const secPass = await bcrypt.hash(password, salt);

          pool.query(
            `insert into todo_users (name, email, password, is_admin) values ($1, $2, $3, $4)`,
            [name, email, secPass, is_admin],
            async (err, result) => {
              if (err) {
                res.status(404).json({
                  success: false,
                  message: "Server error: " + err.message
                });
              } else {
                const query_result = await pool.query(
                  `select * from todo_users where email = $1`,
                  [email]
                );
                const user = query_result.rows[0];
                const data = {
                  user: user.id,
                  is_admin: user.is_admin
                };
                //create a auth-token
                const token = jwt.sign(data, secret, { expiresIn: tokenLife });
                res.status(200).json({
                  success: true,
                  token: `Bearer ${token}`,
                  user: {
                    name: name
                  },
                  is_admin: is_admin,
                  message: "User created successfully"
                });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/createadmin", async (req, res) => {
  try {
    let { name, email, password, is_admin } = req.body;

    //to check email is already exist or not
    pool.query(
      `SELECT * FROM todo_users WHERE email = $1 and is_admin = true;`,
      [email],
      async (err, results) => {
        if (err) {
          res.status(404).json({
            success: false,
            message: "Server error: " + err.message
          });
        }

        if (results.rows.length > 0) {
          res.status(200).json({
            success: false,
            message: "Admin with this email id already exists"
          });
        } else {
          pool.query(
            `SELECT * FROM todo_users WHERE email = $1 and is_admin = false;`,
            [email],
            async (err, results) => {
              if (err) {
                res.status(404).json({
                  success: false,
                  message: "Server error: " + err.message
                });
              }

              if (results.rows.length > 0) {
                res.status(200).json({
                  success: false,
                  message: "User with this email id already exists"
                });
              } else {
                //Create Hashing of password
                const salt = await bcrypt.genSalt(10);
                const secPass = await bcrypt.hash(password, salt);

                pool.query(
                  `insert into todo_users (name, email, password, is_admin) values ($1, $2, $3, $4)`,
                  [name, email, secPass, is_admin],
                  async (err, result) => {
                    if (err) {
                      res.status(404).json({
                        success: false,
                        message: "Server error: " + err.message
                      });
                    } else {
                      res.status(200).json({
                        success: true,
                        message: "Admin created successfully"
                      });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
