const db = require("../../data/dbConfig")

function bul() {
    return db("users").select("id", "username");
 
  }
  
  function goreBul(filtre) {  // dizi döner

    return db("users").where(filtre);
  }
  
  function idyeGoreBul(id) {

    return db("users").where("id", id).first()

  }

  async function ekle(user) {
    const [id] = await db("users").insert(user);
    const newUser = await idyeGoreBul(id);
    return {
      id: newUser.id,
      username: newUser.username,
      password:newUser.password
    
    };
  }


  module.exports={
    bul,
    goreBul,
    idyeGoreBul,
    ekle

  }