const UserModel = require("../users/users-model");

async function usernameBostami(req, res, next) {
    try {
      const present = await UserModel.goreBul({ username: req.body.username }); 
      if (present.length > 0) {
        next({ status: 422, message: "Username kullaniliyor" });
      } else {
        next();
      }
    } catch (err) {
      next(err);
    }
  }
  

  async function usernamevePasswordVarmi(req, res, next) {
    try {
        const{username,password}=req.body;
      const present = await UserModel.goreBul({
        username:username,
       
    });
    
      if (!present) {
        next({ status: 401, message: "geçersiz kriterler" });
      } 
      else {
        req.user = present[0];
        next();
      }
    
    } catch (err) {
      next(err);
    }
  }
  

  function sifreGecerlimi(req, res, next) {
    try {
      const { password } = req.body;
      if (!password || password.length <= 3) {
        next({ status: 422, message: "Şifre yok veya 3 karakterden az" });
      } else {
        next();
      }
    } catch (err) {
      next(err);
    }
  }
  

  module.exports = { usernameBostami, usernamevePasswordVarmi, sifreGecerlimi };
  