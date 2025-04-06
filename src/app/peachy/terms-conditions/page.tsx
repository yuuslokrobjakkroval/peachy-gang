import Image from "next/image";
import { PEACHY } from "@/utils/config";

export default function TermsConditionsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center p-6 md:p-10">
      <div className="w-full max-w-3xl">
        {/* Header Section */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-6">
          Peach and Goma Terms & Conditions
        </h1>
        <div className="flex justify-center mb-8">
          <Image
            src={PEACHY.url}
            alt="Peach and Goma"
            width={200}
            height={200}
            className="rounded-full shadow-lg"
          />
        </div>

        {/* Introduction Section */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-pink-500 mb-4">
            Introduction
          </h2>
          <p className="text-gray-600 mb-4">
            The Peach and Goma website, located at{" "}
            <a
              href="https://www.peachandgoma.com"
              className="text-pink-500 hover:underline"
            >
              www.peachandgoma.com
            </a>
            , is a copyrighted work belonging to Bujuexiaoxiao. These Terms of
            Use outline the legally binding conditions governing your use of the
            Site.
          </p>
          <p className="text-gray-600">
            By accessing the Site, you agree to these Terms and confirm you are
            at least 18 years old. If you disagree with any provision, do not
            use the Site. Additional guidelines or rules for specific features
            are incorporated into these Terms by reference.
          </p>
        </section>

        {/* Access to the Site Section */}
        <section className="bg-pink-50 rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-pink-500 mb-4">
            Access to the Site
          </h2>
          <p className="text-gray-600 mb-4">
            Bujuexiaoxiao grants you a non-transferable, non-exclusive,
            revocable, limited license to access the Site for personal,
            noncommercial use, subject to these Terms.
          </p>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Restrictions
          </h3>
          <p className="text-gray-600 mb-4">You may not:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              Sell, rent, lease, transfer, or commercially exploit the Site
            </li>
            <li>
              Modify, create derivative works, or reverse engineer any part of
              the Site
            </li>
            <li>Access the Site to build a competing website</li>
            <li>
              Copy, reproduce, distribute, or transmit any part of the Site
              without permission
            </li>
          </ul>
          <p className="text-gray-600 mt-4">
            All copyright and proprietary notices must remain intact.
            Bujuexiaoxiao reserves the right to change, suspend, or terminate
            the Site without notice and is not liable for any resulting impacts.
          </p>
        </section>

        {/* Intellectual Property Section */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-pink-500 mb-4">
            Intellectual Property
          </h2>
          <p className="text-gray-600">
            All intellectual property rights (e.g., copyrights, trademarks) in
            the Site and its content are owned by Bujuexiaoxiao or its
            suppliers. These Terms grant you no rights to these properties
            beyond the limited access described above. No support or maintenance
            is provided for the Site.
          </p>
        </section>

        {/* Third-Party Links & Ads Section */}
        <section className="bg-pink-50 rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-pink-500 mb-4">
            Third-Party Links & Ads
          </h2>
          <p className="text-gray-600 mb-4">
            The Site may include third-party links or advertisements not
            controlled by Bujuexiaoxiao. We provide these for convenience and
            are not responsible for their content or practices. Use them at your
            own risk, as third-party terms and privacy policies apply.
          </p>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Cookies and Web Beacons
          </h3>
          <p className="text-gray-600 mb-4">
            We use cookies to store preferences and optimize user experience.
            Google, a third-party vendor, may use DART cookies for ads. You can
            opt out of DART cookies at{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              className="text-pink-500 hover:underline"
            >
              Google’s Privacy Policy
            </a>
            .
          </p>
        </section>

        {/* User Content Section */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-pink-500 mb-4">
            User Content
          </h2>
          <p className="text-gray-600">
            You are responsible for any content you provide. Bujuexiaoxiao does
            not control or endorse user content and is not liable for any loss
            or damage resulting from it. Disputes between users are your
            responsibility, and we are not obligated to intervene.
          </p>
        </section>

        {/* Disclaimers Section */}
        <section className="bg-pink-50 rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-pink-500 mb-4">
            Disclaimers
          </h2>
          <p className="text-gray-600">
            The Site is provided “as-is” and “as available.” Bujuexiaoxiao and
            its suppliers disclaim all warranties, including merchantability,
            fitness for a particular purpose, or non-infringement. We do not
            guarantee the Site’s availability, accuracy, or safety. Some
            jurisdictions may not allow these exclusions, so they may not apply
            to you.
          </p>
        </section>

        {/* Limitation on Liability Section */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-pink-500 mb-4">
            Limitation on Liability
          </h2>
          <p className="text-gray-600">
            To the maximum extent permitted by law, Bujuexiaoxiao and its
            suppliers are not liable for lost profits, data, or indirect damages
            arising from your use of the Site. Our liability is capped at $50
            USD. Some jurisdictions may not allow these limitations, so they may
            not apply to you.
          </p>
        </section>

        {/* Term and Termination Section */}
        <section className="bg-pink-50 rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-pink-500 mb-4">
            Term and Termination
          </h2>
          <p className="text-gray-600">
            These Terms remain in effect while you use the Site. We may suspend
            or terminate your access at our discretion, including for
            violations. Upon termination, your account and content may be
            deleted, and we are not liable for any resulting impacts.
          </p>
        </section>

        {/* Copyright Policy Section */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-pink-500 mb-4">
            Copyright Policy
          </h2>
          <p className="text-gray-600 mb-4">
            We respect intellectual property rights and may remove infringing
            materials or terminate repeat infringers’ accounts. To report
            copyright infringement, provide a written notification to our
            Copyright Agent at{" "}
            <a
              href="mailto:mail@peachandgoma.com"
              className="text-pink-500 hover:underline"
            >
              mail@peachandgoma.com
            </a>
            , including:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Your signature</li>
            <li>Identification of the copyrighted work</li>
            <li>Identification of the infringing material</li>
            <li>Your contact information</li>
            <li>A statement of good faith belief in unauthorized use</li>
            <li>A statement of accuracy under penalty of perjury</li>
          </ul>
        </section>

        {/* Dispute Resolution Section */}
        <section className="bg-pink-50 rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-pink-500 mb-4">
            Dispute Resolution
          </h2>
          <p className="text-gray-600 mb-4">
            Disputes must be resolved through binding arbitration on an
            individual basis via the American Arbitration Association (AAA).
            Before arbitration, send a written Notice of Dispute to{" "}
            <a
              href="mailto:mail@peachandgoma.com"
              className="text-pink-500 hover:underline"
            >
              mail@peachandgoma.com
            </a>
            . If unresolved within 30 days, arbitration may begin.
          </p>
          <p className="text-gray-600 mb-4">
            Arbitration follows AAA Consumer Arbitration Rules (available at{" "}
            <a
              href="https://www.adr.org"
              className="text-pink-500 hover:underline"
            >
              adr.org
            </a>
            ). Claims under $10,000 may use non-appearance-based arbitration.
            Hearings occur within 100 miles of your residence (or as agreed).
            You waive jury trials and class actions.
          </p>
          <p className="text-gray-600">
            Arbitration is confidential, and awards are final. Claims for
            defamation or intellectual property infringement are exempt.
            Litigation, if permitted, occurs in courts in Netherlands County,
            California.
          </p>
        </section>

        {/* General Section */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-pink-500 mb-4">General</h2>
          <p className="text-gray-600 mb-4">
            We may revise these Terms, notifying you via email or Site posting.
            Changes take effect 30 days after notice or immediately for new
            users. You consent to electronic communications. These Terms are the
            entire agreement, and invalid provisions will be modified to remain
            enforceable.
          </p>
          <p className="text-gray-600">
            The Site may be subject to U.S. export controls. California
            residents can report complaints to the California Department of
            Consumer Affairs at 400 R Street, Sacramento, CA 95814, or (800)
            952-5210.
          </p>
        </section>

        {/* Contact Section */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-pink-500 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Questions about these Terms? Reach out at{" "}
            <a
              href="mailto:mail@peachandgoma.com"
              className="text-pink-500 hover:underline"
            >
              mail@peachandgoma.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
