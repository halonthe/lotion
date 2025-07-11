import Heading from './_components/heading'
import Heroes from "./_components/hero";
import Footer from "./_components/footer";

export default function LandingPage() {
  return (
    <div className="min-h-full flex flex-col font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
          <Heading/>
          <Heroes/>
      </div>
        <Footer/>
    </div>
  );
}
