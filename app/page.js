'use client';
import dynamic from 'next/dynamic';

const MusicMeetup = dynamic(() => import('./components/MusicMeetup'), {
  ssr: false
});

export default function Page() {
  return <MusicMeetup />;
}
