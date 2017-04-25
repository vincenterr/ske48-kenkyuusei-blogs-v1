const MongoClient = require('mongodb').MongoClient

// insert the document: {writer: <String>, name: <String>, generation: <Number>
//                       posts: [{id: <String>, date: <String>, title: <String>}, ...]}
const insertPostToDB = async (mongodbUri, collection,
                              writer, name, generation, posts) => {
  const db = await MongoClient.connect(mongodbUri)
  await db.collection(collection).update(
    { writer },
    { $set: { name, generation },
      $push: { posts } },
    { upsert: true })
  db.close()
}

module.exports = insertPostToDB
