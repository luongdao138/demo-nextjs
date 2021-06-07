import React from 'react';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';
import Head from 'next/head';
const NewMeetupPage = () => {
  const router = useRouter();

  const addMeetupHanler = async (meetupData) => {
    const res = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Add a new meetup</title>
        <meta
          name='description'
          content='Add your own meetup and create amazing networking opportunities'
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHanler} />
    </>
  );
};

export default NewMeetupPage;
