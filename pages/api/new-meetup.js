// /api/new-meetup
import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { title, image, address, description } = req.body;

    const client = await MongoClient.connect(
      'mongodb+srv://luongdao:huongluong138@cluster0.zoe7i.mongodb.net/post_mern?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne({
      title,
      image,
      address,
      description,
    });

    client.close();

    res.status(201).json({ message: 'insert new meetup successfully!' });
  }
};

export default handler;
