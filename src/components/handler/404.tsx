import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-muted-foreground mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link href="/">
          <a className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Go Back Home
          </a>
        </Link>
      </div>
    </div>
  );
}
