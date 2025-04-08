import { config } from "@/utils/config";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center p-6 md:p-10">
      <div className="w-full max-w-3xl">
        {/* Header Section */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-6">
          Welcome to the World of Peach and Goma!
        </h1>
        <div className="flex justify-center mb-8">
          <Image
            src={config.url}
            alt="Peach and Goma"
            width={300}
            height={300}
            className="rounded-3xl shadow-lg"
          />
        </div>

        {/* About Section */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-pink-500 mb-4 text-center">
            About Peach and Goma: <br /> A Tale of Love, Laughter, and Adorable
            Cats
          </h2>
          <p className="text-muted-foreground mb-4">
            Hello! I’m 晓晓 (Xiao Xiao), better known by my artist name 不绝晓晓
            (Bu Jue Xiao Xiao). I’m a designer, digital artist, and animator
            from China—and the creator of the beloved Peach and Goma ®.
          </p>
        </section>

        {/* Beginnings Section */}
        <section className="flex flex-col md:flex-row items-center mb-8">
          <div className="md:w-1/2 p-4">
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Our Beginnings
            </h3>
            <p className="text-muted-foreground">
              Peach and Goma came to life in 2017 when I designed the first
              "Peach Cat ®" stickers for WeChat. This charming duo—a white cat
              named Peach and her gray cat boyfriend, Goma—was inspired by my
              own relationship and everyday moments with my boyfriend. Living
              together, they share a love that’s sometimes cuddly, sometimes
              playful, and always heartwarming—reflecting the ups and downs of
              love that so many of us experience.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image
              src={config.url}
              alt="Peach and Goma Beginnings"
              width={200}
              height={200}
              className="rounded-full"
            />
          </div>
        </section>

        {/* Global Reach Section */}
        <section className="bg-pink-50 rounded-2xl shadow-md p-6 mb-8">
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            From China to the World
          </h3>
          <p className="text-muted-foreground mb-4">
            What started on Weibo quickly spread beyond borders. Peach and
            Goma’s irresistible charm captured hearts globally, appearing on
            platforms like LINE, WeChat, KakaoTalk, Telegram, and WhatsApp. In
            2021, I launched their official Telegram, Twitter, and YouTube
            channels to bring them closer to fans everywhere. It’s been an
            incredible journey seeing their cuteness connect with people
            worldwide!
          </p>
          <a
            href="https://t.me/PeachLovesGoma" // Replace with actual Telegram link
            className="inline-block bg-pink-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-pink-600 transition"
          >
            Join Our Telegram Community
          </a>
        </section>

        {/* Mission Section */}
        <section className="text-center mb-8">
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            Our Mission
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Peach and Goma are more than just adorable characters—they’re a
            celebration of life’s simple joys, warmth, and love. My goal is to
            spread happiness through their stories while safeguarding their
            uniqueness from unauthorized use. Thank you for being part of this
            mission!
          </p>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h3 className="text-xl font-medium text-pink-500 mb-4 text-center">
            FAQ (Frequently Asked Questions)
          </h3>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-800">
                Who created Peach and Goma?
              </p>
              <p className="text-muted-foreground">
                That would be me, Bu Jue Xiao Xiao!
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">
                Where did they come from?
              </p>
              <p className="text-muted-foreground">
                They were born from my imagination in China in 2017.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">
                Who are Peach and Goma?
              </p>
              <p className="text-muted-foreground">
                A lovable cat couple—Peach (white) and Goma (gray)—madly in
                love!
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">
                How can I get their stickers?
              </p>
              <p className="text-muted-foreground">
                Check out 20+ FREE sticker packs on our{" "}
                <a
                  href="https://t.me/PeachLovesGoma"
                  className="text-pink-500 hover:underline"
                >
                  official Telegram channel
                </a>
                !
              </p>
            </div>
          </div>
        </section>

        {/* Thank You Section */}
        <section className="text-center">
          <h3 className="text-xl font-medium text-pink-500 mb-2">Thank YOU!</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your support fuels this adventure. Let’s keep spreading joy together
            with Peach and Goma!
          </p>
        </section>
      </div>
    </div>
  );
}
