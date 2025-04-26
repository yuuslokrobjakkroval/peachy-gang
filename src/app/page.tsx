import {Navbar} from "@/components/home/Navbar";
import {Container} from "@/components/home/Container";
import {Hero} from "@/components/home/Hero";
import {SectionTitle} from "@/components/home/SectionTitle";
import {Benefits} from "@/components/home/Benefits";
import {Video} from "@/components/home/Video";
// import {Faq} from "@/components/home/Faq";
import {Cta} from "@/components/home/Cta";
import {Footer} from "@/components/home/Footer";

import {benefitOne, benefitTwo} from "@/components/home/data";

export default function Home() {
    return (
        <Container>
            <Navbar />
            <Hero/>
            <SectionTitle
                preTitle="Nextly Benefits"
                title=" Why should you use this landing page"
            >
                Nextly is a free landing page & marketing website template for startups
                and indie projects. Its built with Next.js & TailwindCSS. And its
                completely open-source.
            </SectionTitle>

            <Benefits data={benefitOne}/>
            <Benefits imgPos="right" data={benefitTwo}/>

            <SectionTitle
                preTitle="Watch a video"
                title="Learn how to fullfil your needs"
            >
                This section is to highlight a promo or demo video of your product.
                Analysts says a landing page with video has 3% more conversion rate. So,
                don&apos;t forget to add one. Just like this.
            </SectionTitle>

            <Video videoId="fZ0D0cnR88E"/>

            <Cta/>
            <Footer />
        </Container>
    );
}
