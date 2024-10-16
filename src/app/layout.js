// app/layout.js
import './globals.css';

export const metadata = {
  title: 'Elo Tracker',
  description: 'An app to track Elo ratings among colleagues.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
