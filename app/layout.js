export const metadata = {
  title: 'MusicMeetup',
  description: 'Find musicians near you',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
