const supertest = require("supertest");
const server = require("./server");
const jwt = require("jsonwebtoken");
const secrets = require("./secrets/index")
const db=require("../data/dbConfig")


// testleri buraya yazın

it("[0] sanity check", () => {
  expect(true).not.toBe(false);
});

it("[1] env ayarları doğru mu?", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});
describe("[POST] api/auth/login", () => {
  it("[2] login oluyor mu?", async () => {
    const response = await supertest(server)
      .post("/api/auth/login")
      .send({ username: "bob", password: "1234" });
    expect(response.status).toBe(200);
  });

  it("[3] hatalı bilgilerle login olmuyor", async () => {
    const response = await supertest(server)
      .post("/api/auth/login")
      .send({ username: "boba", password: "12346" });
    expect(response.status).toBe(401);
  }, 1000);

  it("[4] doğru token var mı?", async () => {
    const res = await supertest(server)
      .post("/api/auth/login")
      .send({ username: "bob", password: "1234" });

    const token = res.body.token;
    let tokenUsername;

    const jwtDecoded = await jwt.verify(
      token,
      secrets.JWT_SECRET,
      (err, decodedToken) => {
        tokenUsername = decodedToken.req.user.username;
      }
    );
    expect(tokenUsername).toBe("bob");
  }, 1000);
  
});
describe("[POST] auth/register", () => {
  it("[5] yeni kullanıcı adı istenilenlere uygun dönüyor", async () => {
    await supertest(server).post("/api/auth/register")
    .send({
      username: "bob",
      password: "1234",
   
    });
    const newUser = await db("users").where("username", "bob").first();
    expect(newUser.username).toBe("bob");
  }, 1000);


})

