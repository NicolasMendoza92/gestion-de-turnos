import Layout from "@/components/Layout";
import MainBanner from "@/components/MainBanner";
import ReserveBanner from "@/components/ReserveBanner";
import Services from "@/components/Services";


export default function Home() {
  return (
    <Layout>
      <MainBanner/>
      <Services/>
      <ReserveBanner/>
    </Layout>
  );
}
