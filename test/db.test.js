const {
  MongoClient
} = require('mongodb');
const mongoURI = "mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true";
const database = "getir-case-study";
var app = require("../routes/index")
describe('fetch', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoURI, {
      useNewUrlParser: true,
    });
    db = await connection.db(database);
  });

  afterAll(async () => {
    await connection.close();
    // await db.close();
  });

  it('should fetch a doc from collection', async () => {
    const users = db.collection('records');

    const record = await await users.findOne();
    expect(record).toHaveProperty("key") // true
    expect(record).toHaveProperty("createdAt") // true
    expect(record).toHaveProperty("counts") // true

  });
});