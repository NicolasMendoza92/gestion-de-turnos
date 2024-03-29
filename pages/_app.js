import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function App({
  Component, pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps}/>
    </SessionProvider>
  )
}
