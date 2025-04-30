import Image from "next/image";
import { config } from "@/utils/config";

export default function PrivacyPolicyPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center p-6 md:p-10 bg-background">
      {/* Texture Background */}
      <div className="texture" />

      <div className="w-full max-w-3xl z-10">
        {/* Header Section */}
        <h1 className="text-3xl md:text-4xl font-ghibi-bold text-center text-primary mb-6 animate-twinkle">
          Peach and Goma Privacy Policy
        </h1>
        <div className="flex justify-center mb-8">
          <Image
            src={config.url}
            alt="Peach and Goma"
            width={200}
            height={200}
            className="rounded-full shadow-lg border border-border"
          />
        </div>

        {/* Introduction Section */}
        <section className="bg-card rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-ghibi-bold text-primary mb-4">
            Introduction
          </h2>
          <p className="text-muted-foreground mb-4 font-ghibi">
            At Peach and Goma, accessible from{" "}
            <a
              href="https://www.peachandgoma.com"
              className="text-primary hover:underline"
            >
              www.peachandgoma.com
            </a>
            , one of our main priorities is the privacy of our visitors. This
            Privacy Policy outlines the types of information we collect, how we
            use it, and how we protect it.
          </p>
          <p className="text-muted-foreground font-ghibi">
            If you have questions or need more information about our Privacy
            Policy, please{" "}
            <a
              href="mailto:contact@peachandgoma.com"
              className="text-primary hover:underline"
            >
              contact us
            </a>
            .
          </p>
        </section>

        {/* Scope Section */}
        <section className="bg-secondary rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-ghibi-bold text-primary mb-4">
            Scope of This Policy
          </h2>
          <p className="text-muted-foreground font-ghibi">
            This Privacy Policy applies only to our online activities and is
            valid for visitors to our website with regard to the information
            they share and/or we collect. It does not apply to information
            collected offline or via channels other than this website.
          </p>
        </section>

        {/* Consent Section */}
        <section className="bg-card rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-ghibi-bold text-primary mb-4">
            Consent
          </h2>
          <p className="text-muted-foreground font-ghibi">
            By using our website, you consent to our Privacy Policy and agree to
            its terms.
          </p>
        </section>

        {/* Information We Collect Section */}
        <section className="bg-secondary rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-ghibi-bold text-primary mb-4">
            Information We Collect
          </h2>
          <p className="text-muted-foreground mb-4 font-ghibi">
            We collect personal information you provide, such as when you
            contact us or register for an account. This may include your name,
            email address, phone number, company name, address, or the contents
            of messages and attachments you send us.
          </p>
          <p className="text-muted-foreground font-ghibi">
            The reasons for collecting this information will be made clear at
            the point we ask you to provide it.
          </p>
        </section>

        {/* How We Use Information Section */}
        <section className="bg-card rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-ghibi-bold text-primary mb-4">
            How We Use Your Information
          </h2>
          <p className="text-muted-foreground mb-4 font-ghibi">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 font-ghibi">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>
              Communicate with you for customer service, updates, and marketing
              purposes
            </li>
            <li>Send you emails</li>
            <li>Find and prevent fraud</li>
          </ul>
        </section>

        {/* Log Files Section */}
        <section className="bg-secondary rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-ghibi-bold text-primary mb-4">
            Log Files
          </h2>
          <p className="text-muted-foreground font-ghibi">
            Peach and Goma uses log files to track visitor activity, including
            IP addresses, browser type, Internet Service Provider (ISP), date
            and time stamps, referring/exit pages, and click counts. This data
            is not linked to personally identifiable information and is used for
            analyzing trends, administering the site, and gathering demographic
            information.
          </p>
        </section>

        {/* Cookies Section */}
        <section className="bg-card rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-ghibi-bold text-primary mb-4">
            Cookies and Web Beacons
          </h2>
          <p className="text-muted-foreground mb-4 font-ghibi">
            We use cookies to store visitor preferences and track accessed pages
            to optimize user experience. Third-party vendors, like Google, may
            use DART cookies to serve ads based on your visits to our site and
            others.
          </p>
          <p className="text-muted-foreground font-ghibi">
            You can opt out of DART cookies by visiting Google’s Privacy Policy
            at{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              className="text-primary hover:underline"
            >
              https://policies.google.com/technologies/ads
            </a>
            .
          </p>
        </section>

        {/* Third-Party Policies Section */}
        <section className="bg-secondary rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-ghibi-bold text-primary mb-4">
            Third-Party Privacy Policies
          </h2>
          <p className="text-muted-foreground mb-4 font-ghibi">
            Our Privacy Policy does not apply to third-party advertisers or
            websites. Third-party ad servers may use cookies, JavaScript, or Web
            Beacons to measure ad effectiveness or personalize content. We have
            no control over these cookies.
          </p>
          <p className="text-muted-foreground font-ghibi">
            You can disable cookies through your browser settings. Check your
            browser’s help section for instructions.
          </p>
        </section>

        {/* CCPA Rights Section */}
        <section className="bg-card rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-ghibi-bold text-primary mb-4">
            CCPA Privacy Rights
          </h2>
          <p className="text-muted-foreground mb-4 font-ghibi">
            Under the California Consumer Privacy Act (CCPA), California
            residents have the right to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 font-ghibi">
            <li>Request disclosure of the personal data we collect</li>
            <li>Request deletion of their personal data</li>
            <li>Opt out of the sale of their personal data</li>
          </ul>
          <p className="text-muted-foreground mt-4 font-ghibi">
            To exercise these rights, please{" "}
            <a
              href="mailto:contact@peachandgoma.com"
              className="text-primary hover:underline"
            >
              contact us
            </a>
            . We will respond within one month.
          </p>
        </section>

        {/* GDPR Rights Section */}
        <section className="bg-secondary rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-ghibi-bold text-primary mb-4">
            GDPR Data Protection Rights
          </h2>
          <p className="text-muted-foreground mb-4 font-ghibi">
            Every user is entitled to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 font-ghibi">
            <li>Access their personal data (small fee may apply)</li>
            <li>Rectify inaccurate or incomplete data</li>
            <li>Erase their data under certain conditions</li>
            <li>
              Restrict or object to data processing under certain conditions
            </li>
            <li>Transfer their data to another organization</li>
          </ul>
          <p className="text-muted-foreground mt-4 font-ghibi">
            To exercise these rights, please{" "}
            <a
              href="mailto:contact@peachandgoma.com"
              className="text-primary hover:underline"
            >
              contact us
            </a>
            . We will respond within one month.
          </p>
        </section>

        {/* Children's Information Section */}
        <section className="bg-card rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-ghibi-bold text-primary mb-4">
            Children’s Information
          </h2>
          <p className="text-muted-foreground font-ghibi">
            We prioritize protecting children online and do not knowingly
            collect personal information from children under 13. If you believe
            your child has provided such information, please{" "}
            <a
              href="mailto:contact@peachandgoma.com"
              className="text-primary hover:underline"
            >
              contact us
            </a>{" "}
            immediately, and we will promptly remove it.
          </p>
        </section>

        {/* Contact Section */}
        <section className="text-center">
          <h2 className="text-2xl font-ghibi-bold text-primary mb-4">
            Questions?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-ghibi">
            If you have any questions about our Privacy Policy, feel free to
            reach out at{" "}
            <a
              href="mailto:contact@peachandgoma.com"
              className="text-primary hover:underline"
            >
              contact@peachandgoma.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
