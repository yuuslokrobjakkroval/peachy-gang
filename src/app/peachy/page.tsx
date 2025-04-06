"use client";

export default function PeachyPage() {
  const botName = "Peachy";
  const botDescription =
    "A versatile Discord bot with 93 commands across categories like economy, fun, games, and more, designed to enhance your server experience.";
  const commandCategories = [
    "Actions",
    "Animals",
    "Bank",
    "Economy",
    "Emotes",
    "Fun",
    "Gambling",
    "Games",
    "Giveaways",
    "Information",
    "Inventory",
    "Profile",
    "Rank",
    "Socials",
    "Relationship",
    "Utility",
    "Work",
  ];

  return (
    <div
      className="flex min-h-svh w-full items-center justify-center p-6 md:p-10"
      // style={{
      //   backgroundColor: "#f5e9d6", // Parchment-like beige color
      //   backgroundImage:
      //     "url('https://www.transparenttextures.com/patterns/paper-fibers.png')", // Subtle paper texture
      //   backgroundSize: "cover",
      // }}
    >
      <div className="w-full max-w-lg p-8 space-y-6">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-pink-500 tracking-wide">
            {botName}
          </h1>
          <p className="text-gray-700 mt-4 text-lg leading-relaxed">
            {botDescription}
          </p>
        </div>

        {/* Command Categories Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
            Command Categories
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {commandCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-70 border border-pink-200 rounded-md p-3 text-center text-sm font-medium text-gray-700"
              >
                {category}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            Total Commands:{" "}
            <span className="font-semibold text-pink-500">93</span>
          </p>
        </div>
      </div>
    </div>
  );
}
