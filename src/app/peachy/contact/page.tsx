import Image from "next/image";
import { config } from "@/utils/config";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardContainer } from "@/components/ui/3d-card";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center p-6 md:p-10">
      <div className="w-full max-w-3xl">
        {/* Header Section */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-6">
          Get in Touch with Peach and Goma!
        </h1>
        <div className="flex justify-center mb-8">
          <Image
            src={config.url}
            alt="Peach and Goma"
            width={200}
            height={200}
            className="rounded-full shadow-lg"
          />
        </div>

        {/* Introduction Section */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8 text-center">
          <h2 className="text-2xl font-semibold text-pink-500 mb-4">
            We’d Love to Hear from You!
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you have questions about Peach and Goma, want to share your
            love for their adventures, or have ideas for new stickers, reach out
            to us! Fill out the form below or connect with us on social media.
          </p>
        </section>

        {/* Contact Form Section */}
        <section className="rounded-2xl mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      // className={
                      //   formik.touched.usernameOrEmail &&
                      //   formik.errors.usernameOrEmail
                      //     ? "border-red-500"
                      //     : ""
                      // }
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      // value={formik.values.usernameOrEmail}
                      // onChange={formik.handleChange}
                      // onBlur={formik.handleBlur}
                    />
                    {/* {formik.touched.usernameOrEmail &&
                  formik.errors.usernameOrEmail && (
                    <p className="text-sm text-red-500">
                      {formik.errors.usernameOrEmail}
                    </p>
                  )} */}
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      // className={
                      //   formik.touched.usernameOrEmail &&
                      //   formik.errors.usernameOrEmail
                      //     ? "border-red-500"
                      //     : ""
                      // }
                      id="email"
                      name="email"
                      type="text"
                      placeholder="Enter your email"
                      // value={formik.values.usernameOrEmail}
                      // onChange={formik.handleChange}
                      // onBlur={formik.handleBlur}
                    />
                    {/* {formik.touched.usernameOrEmail &&
                  formik.errors.usernameOrEmail && (
                    <p className="text-sm text-red-500">
                      {formik.errors.usernameOrEmail}
                    </p>
                  )} */}
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      // className={
                      //   formik.touched.password && formik.errors.password
                      //     ? "border-red-500"
                      //     : ""
                      // }
                      id="message"
                      name="message"
                      placeholder="What’s on your mind?"
                      // value={formik.values.password}
                      // onChange={formik.handleChange}
                      // onBlur={formik.handleBlur}
                    />
                    {/* {formik.touched.password && formik.errors.password && (
                  <p className="text-sm text-red-500">
                    {formik.errors.password}
                  </p>
                )} */}
                    {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Contact Information Section */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-pink-500 mb-4 text-center">
            Other Ways to Connect
          </h2>
          <div className="text-muted-foreground space-y-4">
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:mail@peachandgoma.com"
                className="text-pink-500 hover:underline"
              >
                mail@peachandgoma.com
              </a>
            </p>
            <p>
              <strong>Telegram:</strong>{" "}
              <a
                href="https://t.me/peachandgoma"
                className="text-pink-500 hover:underline"
              >
                Join our Telegram Community
              </a>
            </p>
            <p>
              <strong>Social Media:</strong> Follow us for the latest Peach and
              Goma updates!
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://twitter.com/peachandgoma"
                className="text-pink-500 hover:text-pink-600"
              >
                {/* Placeholder for Twitter/X icon */}
                <span className="text-2xl">𝕏</span>
              </a>
              <a
                href="https://www.youtube.com/@peachandgoma"
                className="text-pink-500 hover:text-pink-600"
              >
                {/* Placeholder for YouTube icon */}
                <span className="text-2xl">📺</span>
              </a>
            </div>
          </div>
        </section>

        {/* Closing Section */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-pink-500 mb-4">
            Thank You for Reaching Out!
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We’ll get back to you as soon as possible. In the meantime, keep
            spreading the love with Peach and Goma! 🐾
          </p>
        </section>
      </div>
    </div>
  );
}
