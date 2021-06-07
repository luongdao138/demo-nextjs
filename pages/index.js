import React from 'react';
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';

const HomePage = ({ meetups }) => {
  return (
    <>
      <Head>
        <title>React meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups'
        />
      </Head>
      <MeetupList meetups={meetups}></MeetupList>
    </>
  );
};

export async function getStaticProps() {
  //fetch data from database

  const client = await MongoClient.connect(
    'mongodb+srv://luongdao:huongluong138@cluster0.zoe7i.mongodb.net/post_mern?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();

  return {
    props: {
      meetups: meetups.map((x) => ({
        title: x.title,
        address: x.address,
        image: x.image,
        id: x._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps({ req, res }) {
//   const testPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(mockMeetups);
//     }, 10000);
//   });
//   const meetups = await testPromise;
//   return {
//     props: {
//       meetups,
//     },
//   };
// }

export default HomePage;
