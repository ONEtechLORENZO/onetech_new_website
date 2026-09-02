import AwsPractice from "@/components/aws-practice";
import Hero from "@/components/hero";
import Interviews from "@/components/interviews";
import Products from "@/components/products";
import SiteHeader from "@/components/site-header";
import Story from "@/components/story";

export default function Home() {
  return (
    <main className="flex-1">
      <SiteHeader />
      <Hero />
      <Story />
      <Products />
      <AwsPractice />
      <Interviews />
    </main>
  );
}
