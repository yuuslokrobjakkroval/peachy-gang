"use client";

import React, { useState } from "react";
import { Container } from "@/components/layouts/container";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MaskedImage } from "@/components/ui/masked-image";

const backgroundData = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `Background ${index + 1}`,
  path: `/background/w${(index + 1).toString().padStart(2, "0")}.jpg`,
}));

export default function BackgroundPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBackground, setSelectedBackground] = useState<
    (typeof backgroundData)[0] | null
  >(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filterBackgrounds = (backgrounds: typeof backgroundData) => {
    return backgrounds.filter((bg) =>
      bg.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleBuyClick = (bg: (typeof backgroundData)[0]) => {
    setSelectedBackground(bg);
    setIsDialogOpen(true);
  };

  const handleConfirmBuy = () => {
    console.log(`Purchased ${selectedBackground?.name} for 5,000 credits`);
    setIsDialogOpen(false);
  };

  const handleCancelBuy = () => {
    setIsDialogOpen(false);
    setSelectedBackground(null);
  };

  return (
    <Container>
      <div className="w-full flex flex-col justify-center items-center p-4 sm:p-6">
        <div className="w-full max-w-6xl">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg font-semibold mb-4 sm:mb-0">
              Backgrounds ({backgroundData.length})
            </h2>

            <div className="flex items-center space-x-4">
              <Input
                placeholder="Search backgrounds..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mt-3">
            {filterBackgrounds(backgroundData).map((bg) => (
              <div key={bg.id} className="flex flex-col items-center">
                <Card
                  className="bg-card w-full p-4 flex flex-col items-center hover:bg-primary/10 cursor-pointer"
                  onClick={() => handleBuyClick(bg)}
                >
                  <CardContent className="p-0 flex flex-col items-center">
                    <MaskedImage
                      src={bg.path}
                      alt={bg.name}
                      width={192}
                      height={192}
                      className="w-32 h-32"
                      variant="shape1"
                    />
                    <p className="text-sm mt-2 text-center">{bg.name}</p>
                    <p className="text-sm font-semibold">5,000</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Purchase</DialogTitle>
            </DialogHeader>
            {selectedBackground && (
              <div className="flex flex-col items-center">
                <MaskedImage
                  src={selectedBackground.path}
                  alt={selectedBackground.name}
                  width={192}
                  height={192}
                  className="w-32 h-32 mb-4"
                  variant="shape1"
                />
                <p className="text-lg mb-2">Buy {selectedBackground.name}?</p>
                <p className="text-sm mb-4">Cost: 5,000 credits</p>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={handleCancelBuy}>
                Cancel
              </Button>
              <Button onClick={handleConfirmBuy}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Container>
  );
}
