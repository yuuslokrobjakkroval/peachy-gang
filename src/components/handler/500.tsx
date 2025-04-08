export default function ServerError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          500 - Server Error
        </h1>
        <p className="text-muted-foreground mb-6">
          Something went wrong on our end. Please try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}
