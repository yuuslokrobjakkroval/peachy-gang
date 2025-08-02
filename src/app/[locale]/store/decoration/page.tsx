"use client";

import React, { useCallback, useState } from "react";
import { Search, PhoneCall, X } from "lucide-react";
import { Icons } from "@/components/icons";
import { decorationsDataWithPricing } from "@/data/decorations-with-pricing";
import Image from "@/components/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return <App />;
}

const SearchBar = ({
  placeholder,
  onValueChanged,
}: {
  placeholder: string;
  onValueChanged: (value: string) => void;
}) => {
  return (
    <div className="mb-4 xs:mb-6">
      <div className="relative w-full max-w-sm xs:max-w-md sm:max-w-lg">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-muted-foreground xs:w-5 xs:h-5" />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => onValueChanged(e.target.value)}
          className="w-full py-2 pl-10 pr-10 text-sm transition-colors border rounded-lg outline-none xs:py-3 xs:pl-12 xs:pr-12 xs:text-base focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
        />
      </div>
    </div>
  );
};

const PricingDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-4xl max-h-[90vh] m-3 rounded-2xl bg-card shadow-2xl overflow-hidden border">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-2xl font-bold text-primary">
            🍑 PEACHY SHOP PRICING 🍑
          </h2>
          <button
            onClick={onClose}
            className="p-2 transition-colors rounded-lg hover:text-primary"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid gap-12">
            {/* Left Side - Pricing */}
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { original: "$4.99", sale: "$2.37" },
                  { original: "$5.99", sale: "$2.68" },
                  { original: "$7.99", sale: "$3.09" },
                  { original: "$8.49", sale: "$3.49" },
                  { original: "$8.99", sale: "$3.86" },
                  { original: "$9.99", sale: "$4.21" },
                  { original: "$10.99", sale: "$4.66" },
                  { original: "$11.99", sale: "$5.11" },
                  { original: "$13.99", sale: "$5.73" },
                ].map((price, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center p-4 transition-shadow border rounded-lg hover:shadow-md"
                  >
                    <div className="space-y-1 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm line-through text-muted-foreground">
                          {price.original}
                        </span>
                        <span className="text-lg font-bold">➝</span>
                        <span className="text-lg font-bold text-primary">
                          {price.sale}
                        </span>
                      </div>
                      <div className="space-y-1 text-xs">
                        <p className="font-semibold">
                          Save $
                          {(
                            parseFloat(price.original.slice(1)) -
                            parseFloat(price.sale.slice(1))
                          ).toFixed(2)}
                        </p>
                        <p className="text-muted-foreground">
                          {Math.round(
                            ((parseFloat(price.original.slice(1)) -
                              parseFloat(price.sale.slice(1))) /
                              parseFloat(price.original.slice(1))) *
                              100
                          )}
                          % OFF
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bulk Discount */}
              <div className="p-4 border rounded-lg">
                <div className="space-y-2">
                  <p className="font-semibold text-center">
                    🎁 Special Bulk Discount Deal! 🎁
                  </p>
                  <p className="text-sm text-center">
                    Purchase any 2 Avatar Decorations and get an additional{" "}
                    <strong>$0.50 OFF</strong> your total order!
                  </p>
                  <div className="p-2 text-center rounded bg-card">
                    <p className="text-xs">
                      <strong>Example:</strong> Buy 2 decorations worth $5.00
                      total = Pay only $4.50
                    </p>
                  </div>
                  <p className="mt-3 font-semibold text-center">
                    ទិញ 2 Avatar Decorations មាន Discount **$0.50** 🍑
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-lg font-semibold text-center">
                  📞 Contact Information 📞
                </h3>
                <div className="p-6 border rounded-lg">
                  <p className="mb-4 font-semibold text-center">
                    Ready to get your decorations?
                  </p>
                  <div className="space-y-4 text-center">
                    <p className="text-xl font-bold text-primary">
                      Contact me: 👤 KYUU
                    </p>
                    <a
                      href="https://discord.com/users/966688007493140591"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-[#5865F2] text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
                      </svg>
                      Contact on Discord
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [decoSearch, setDecoSearch] = useState("");
  const [isPricingDialogOpen, setIsPricingDialogOpen] = useState(false);

  return (
    <div className="relative w-full px-2 overflow-hidden rounded-lg sm:px-4 md:px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-bold text-primary sm:text-xl md:text-2xl lg:text-3xl">
          🍑 PEACHY SHOP 🍑
        </h1>
      </div>

      {/* Sticky Pricing Dialog Button */}
      <Button
        onClick={() => setIsPricingDialogOpen(true)}
        className="fixed z-40 inline-flex items-center gap-2 px-4 py-2 font-semibold transition-all duration-200 transform rounded-lg shadow-lg bottom-4 right-4 hover:shadow-xl bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <PhoneCall className="w-5 h-5" />
      </Button>

      {/* Pricing Dialog */}
      <PricingDialog
        isOpen={isPricingDialogOpen}
        onClose={() => setIsPricingDialogOpen(false)}
      />

      {/* SELECT DECORATION */}
      <h3 className="my-4 font-semibold text-sm scale-y-90 [letter-spacing:.05em]">
        AVATAR DECORATION
      </h3>

      <SearchBar
        placeholder={"Search decorations..."}
        onValueChanged={setDecoSearch}
      />

      <DecorationsTabs
        decoData={decorationsDataWithPricing}
        decoSearch={decoSearch}
      />
    </div>
  );
};

const NoSearchResults = ({ thing }: { thing: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-text-muted grow">
      <Icons.search size="140" />
      <p className="text-center">No {thing} found</p>
    </div>
  );
};

interface Category {
  n: string;
  d: string;
  hideTitle?: boolean;
  darkText?: boolean;
  descTopM?: string;
  badge?: string;
  b: {
    i:
      | string
      | Array<{
          url: string;
          height?: string;
          width?: string;
          align: string;
          opacity?: number;
          transform?: string;
        }>;
    bg?: string;
    bgPos?: string;
    t?: string;
    h?: number;
  };
}

const DecorationsCategoryBanner = ({ category }: { category: Category }) => {
  return (
    <div className="relative grid items-center justify-center grid-cols-1 grid-rows-1 mb-4 overflow-hidden bg-black rounded-2xl h-32 xs:h-36 sm:h-40 md:h-48 lg:h-56 xl:h-64 2xl:h-[320px]">
      {typeof category.b.i !== "string" ? (
        <>
          <div
            className="absolute top-0 bottom-0 left-0 right-0"
            style={{
              background: category.b.bg || "#000",
            }}
          />
          {category.b.i.map((e, i) => (
            <Image
              key={e.url}
              className={"object-cover bottom-0 absolute"}
              src={`/banners/${e.url}`}
              alt={""}
              draggable={false}
              height={0}
              width={0}
              style={{
                height: e.height || "auto",
                width: e.width || (e.height ? "auto" : "100%"),
                left: e.align.includes("left") || e.align === "center" ? 0 : "",
                right:
                  e.align.includes("right") || e.align === "center" ? 0 : "",
                top: e.align.includes("top") ? 0 : "",
                bottom: e.align.includes("bottom") ? 0 : "",
                objectPosition: e.align,
                opacity: e.opacity || 1,
                transform: e.transform || "",
              }}
            />
          ))}
        </>
      ) : (
        <Image
          className="object-cover [grid-column:1/1] [grid-row:1/1]"
          src={`/banners/${category.b.i}`}
          alt={""}
          draggable={false}
          height={0}
          width={0}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            objectPosition: category.b.bgPos || "",
          }}
        />
      )}
      <div className="relative flex flex-col justify-center items-center p-4 h-full [grid-column:1/1] [grid-row:1/1]">
        {category.b.t ? (
          category.b.t === "" ? (
            <div className="w-full h-12 xs:h-14 sm:h-16 md:h-20 lg:h-24 xl:h-28 2xl:h-32" />
          ) : (
            <Image
              src={`/bannertext/${category.b.t}`}
              alt={category.n}
              draggable={false}
              height={0}
              width={0}
              className="object-contain w-auto h-12 max-w-full xs:h-14 sm:h-16 md:h-20 lg:h-24 xl:h-28 2xl:h-32"
            />
          )
        ) : (
          <>
            {!category.hideTitle && (
              <p
                className="px-4 text-xl leading-tight text-center xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl ginto"
                style={{
                  color: category.darkText || false ? "#000" : "#fff",
                }}
              >
                {category.n.toLowerCase().includes("nitro") ? (
                  <>
                    <span className="uppercase nitro-font">{category.n}</span>
                  </>
                ) : (
                  category.n
                )}
              </p>
            )}
          </>
        )}
        <p
          className="w-[232px] xs:w-full font-medium text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-center leading-tight max-w-4xl mx-auto"
          style={{
            color: category.darkText || false ? "#000" : "#fff",
            marginTop: category.descTopM || "",
          }}
        >
          {category.d.includes("\n")
            ? category.d.split("\n").map((e, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <br />}
                  {e}
                </React.Fragment>
              ))
            : category.d}
        </p>
        {category.badge && (
          <p className="top-2 right-2 absolute m-0 px-2 py-0 rounded-full font-semibold text-black text-xs [letter-spacing:0]">
            {category.badge}
          </p>
        )}
      </div>
    </div>
  );
};

interface DecorationTabsProps {
  decoData: Array<{
    name: string;
    icon: any;
    data: any[];
  }>;
  decoSearch: string;
}

const DecorationsTabs = ({ decoData, decoSearch }: DecorationTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <div className="flex gap-3 mb-4">
        {decoData.map(({ name, icon }, index) => {
          const Icon = Icons[icon as keyof typeof Icons];
          return activeTab === index ? (
            <Button
              key={name}
              className={`px-4 py-1.5 font-semibold text-sm rounded-lg flex items-center gap-1`}
              onClick={() => setActiveTab(index)}
            >
              <Icon size="16px" />
              {name}
            </Button>
          ) : (
            <Button
              key={name}
              variant="outline"
              className={`px-4 py-1.5 font-semibold text-sm rounded-lg flex items-center gap-1`}
              onClick={() => setActiveTab(index)}
            >
              <Icon size="16px" />
              {name}
            </Button>
          );
        })}
      </div>
      <div className="relative min-h-[500px] w-full">
        {decoData.map(({ name, data }, index) => (
          <DecorationsList
            key={name}
            decoData={data}
            decoSearch={decoSearch}
            style={{
              display: activeTab === index ? "block" : "none",
            }}
            className="w-full"
          />
        ))}
      </div>
    </>
  );
};

interface DecorationsListProps {
  decoData: any[];
  decoSearch: string;
  style?: React.CSSProperties;
  className?: string;
}

const DecorationsList = ({
  decoData,
  decoSearch,
  style,
  className,
}: DecorationsListProps) => {
  const getDecorations = useCallback(() => {
    return decoData
      .map((c) => ({
        ...c,
        i: c.i.filter(
          (e: any) =>
            e.n.toLowerCase().includes(decoSearch.toLowerCase()) ||
            e.d.toLowerCase().includes(decoSearch.toLowerCase()) ||
            c.n.toLowerCase().includes(decoSearch.toLowerCase()) ||
            c.d.toLowerCase().includes(decoSearch.toLowerCase())
        ),
      }))
      .filter((category) => category.i.length > 0);
  }, [decoData, decoSearch]);

  const handleDecorationClick = (
    decor: any,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    // Log decoration info for debugging
    console.log("Selected decoration:", {
      name: decor.n,
      price: decor.price?.formatted,
      premiumPrice: decor.price?.premiumFormatted,
      shopId: decor.shopId,
      description: decor.d,
    });
  };

  return (
    <>
      <div
        className={`py-1 rounded-2xl overflow-auto discord-scrollbar ${className || ""}`}
        style={style}
      >
        {getDecorations().length === 0 ? (
          <NoSearchResults thing="decorations" />
        ) : (
          getDecorations().map((category) => {
            return (
              <div
                key={
                  typeof category.b.i === "string"
                    ? category.b.i
                    : Array.isArray(category.b.i) && category.b.i.length > 0
                      ? category.b.i[0].url
                      : category.n
                }
                className="mb-8 last:mb-0"
              >
                <DecorationsCategoryBanner category={category} />

                <div className="gap-4 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 min-[600px]:grid-cols-4 min-[720px]:grid-cols-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {category.i.map((decor: any) => {
                    return (
                      <div
                        key={decor.n}
                        data-decoration-card
                        className="relative overflow-hidden transition-all duration-300 border decoration-card group border-border/50 rounded-2xl hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/60"
                      >
                        {/* Premium Badge */}
                        {decor.price?.premiumFormatted && (
                          <div className="absolute z-10 px-2 py-1 text-xs font-semibold text-white rounded-full top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500">
                            NITRO
                          </div>
                        )}

                        {/* Status Badge - NEW/HOT */}
                        {(() => {
                          const oneWeekAgo = new Date();
                          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

                          // Mock creation date - you can replace this with actual creation date from your data
                          const itemCreatedDate = new Date();
                          itemCreatedDate.setDate(
                            itemCreatedDate.getDate() -
                              Math.floor(Math.random() * 14)
                          ); // Random date within 2 weeks for demo

                          const isNew = itemCreatedDate > oneWeekAgo;
                          const isHot = !isNew && Math.random() > 0.7; // 30% chance for hot items that aren't new

                          if (isNew) {
                            return (
                              <div className="absolute z-10 px-2 py-1 text-xs font-bold text-white rounded-full top-2 right-2 bg-gradient-to-r from-blue-500 to-cyan-500">
                                NEW
                              </div>
                            );
                          } else if (isHot) {
                            return (
                              <div className="absolute z-10 px-2 py-1 text-xs font-bold text-white rounded-full top-2 right-2 bg-gradient-to-r from-red-500 to-orange-500">
                                HOT
                              </div>
                            );
                          }
                          return null;
                        })()}

                        {/* Image Container */}
                        <button
                          type="button"
                          className="relative flex items-center justify-center w-full p-4 transition-all duration-300 aspect-square bg-gradient-to-br from-muted/30 to-muted/10 decor group-hover:from-muted/40 group-hover:to-muted/20"
                          onClick={(e) => handleDecorationClick(decor, e)}
                        >
                          <div className="relative flex items-center justify-center w-full h-full">
                            <Image
                              src={`/decorations/${decor.f}.png`}
                              className="object-contain max-w-full max-h-full transition-transform duration-300 pointer-events-none"
                              alt={decor.n}
                            />

                            {/* Hover Overlay */}
                            {/* <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-primary/20 to-transparent" /> */}
                          </div>
                        </button>

                        {/* Card Content */}
                        <div className="p-4 space-y-3">
                          <div className="space-y-2">
                            <h3
                              className="text-base font-bold leading-tight transition-colors duration-200 text-foreground group-hover:text-primary line-clamp-2"
                              title={decor.n}
                            >
                              {decor.n}
                            </h3>
                            {/* <p
                              className="text-sm leading-relaxed text-muted-foreground line-clamp-3"
                              title={decor.d}
                            >
                              {decor.d}
                            </p> */}
                          </div>

                          {/* Price Display */}
                          {decor.price && (
                            <div className="flex items-center justify-between pt-3 border-t border-border/30">
                              <div className="flex flex-col items-start">
                                {decor.price.premiumFormatted ? (
                                  <>
                                    <span className="text-sm line-through text-muted-foreground">
                                      {decor.price.formatted}
                                    </span>
                                    <span className="text-lg font-bold text-primary">
                                      {decor.price.premiumFormatted}
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-lg font-bold text-primary">
                                    {decor.price.formatted}
                                  </span>
                                )}
                              </div>

                              {/* Discount Percentage */}
                              {decor.price.premium?.["2"]?.percentage && (
                                <div className="px-3 py-1 text-sm font-bold text-white bg-red-500 rounded-full">
                                  -{decor.price.premium["2"].percentage}%
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};
