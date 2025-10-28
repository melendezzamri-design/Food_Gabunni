import ContactSection from "@/components/sections/contact-section";
import Hero from "@/components/sections/hero";
import MenuSection from "@/components/sections/menu-section";

export default function Home() {
  return (
    <>
      <Hero />
      <section id="menu" className="py-16 md:py-24">
        <MenuSection />
      </section>
      <section id="contact" className="py-16 md:py-24">
        <ContactSection />
      </section>
    </>
  );
}
