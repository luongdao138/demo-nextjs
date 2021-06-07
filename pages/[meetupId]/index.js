import React from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';

const MeetUpDetailPage = ({
  meetupData: { image, title, description, address },
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={`${description}`} />
      </Head>
      <MeetupDetail
        image={image}
        address={address}
        title={title}
        description={description}
      />
    </>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://luongdao:huongluong138@cluster0.zoe7i.mongodb.net/post_mern?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((x) => ({
      params: {
        meetupId: x._id.toString(),
      },
    })),
  };
};

export const getStaticProps = async (context) => {
  const { meetupId } = context.params;
  const client = await MongoClient.connect(
    'mongodb+srv://luongdao:huongluong138@cluster0.zoe7i.mongodb.net/post_mern?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
  client.close();
  console.log(meetupId, meetup);
  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
      },
    },
  };
};

export default MeetUpDetailPage;
