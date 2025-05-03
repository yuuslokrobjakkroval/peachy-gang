"use client";

import React, { useState } from "react";
import { Container } from "@/components/layouts/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MaskedImage } from "@/components/ui/masked-image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const maleAvatarData = [
  { name: "Zinchenko", number: 35 },
  { name: "Xhaka", number: 34 },
  { name: "White", number: 4 },
  { name: "Trossard", number: 19 },
  { name: "Saliba", number: 12 },
  { name: "Saka", number: 7 },
  { name: "Odegaard", number: 8 },
  { name: "Nketiah", number: 14 },
  { name: "Martinelli", number: 11 },
  { name: "Jorginho", number: 20 },
  { name: "Jesus", number: 9 },
  { name: "Gabriel", number: 6 },
  { name: "Elneny", number: 25 },
  { name: "Van Dijk", number: 4 },
  { name: "Robertson", number: 26 },
];

const femaleAvatarData = [
  { name: "Lenglet", number: 34 },
  { name: "Kane", number: 10 },
  { name: "Ziyech", number: 22 },
  { name: "T. Silva", number: 6 },
  { name: "Sterling", number: 17 },
  { name: "Pulisic", number: 10 },
  { name: "Mudryk", number: 15 },
  { name: "Mead", number: 7 },
  { name: "Russo", number: 23 },
  { name: "Hemp", number: 11 },
  { name: "Bronze", number: 2 },
  { name: "Walsh", number: 4 },
  { name: "Stanway", number: 8 },
  { name: "Toone", number: 9 },
  { name: "Earps", number: 1 },
];

const maleAvatars = Array.from({ length: 14 }, (_, index) => {
  const dataIndex = index % maleAvatarData.length;
  return {
    id: index + 1,
    name: maleAvatarData[dataIndex].name,
    number: maleAvatarData[dataIndex].number,
    path: `/avatar/male/${index + 1}.jpg`,
  };
});

const femaleAvatars = Array.from({ length: 15 }, (_, index) => {
  const dataIndex = index % femaleAvatarData.length;
  return {
    id: index + 15,
    name: femaleAvatarData[dataIndex].name,
    number: femaleAvatarData[dataIndex].number,
    path: `/avatar/female/${index + 1}.jpg`,
  };
});

const allAvatars = [...maleAvatars, ...femaleAvatars];

export default function ProfileBadgePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showOwnedOnly, setShowOwnedOnly] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<
    (typeof allAvatars)[0] | null
  >(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filterAvatars = (avatars: typeof allAvatars) => {
    return avatars.filter((avatar) => {
      const matchesSearch = avatar.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  };

  const handleBuyClick = (avatar: (typeof allAvatars)[0]) => {
    setSelectedAvatar(avatar);
    setIsDialogOpen(true);
  };

  const handleConfirmBuy = () => {
    // Add your purchase logic here (e.g., deduct credits, update state, etc.)
    console.log(`Purchased ${selectedAvatar?.name} for 1,000 credits`);
    setIsDialogOpen(false);
  };

  const handleCancelBuy = () => {
    setIsDialogOpen(false);
    setSelectedAvatar(null);
  };

  return (
    <Container>
      <div className="w-full flex flex-col justify-center items-center p-4 sm:p-6">
        <Tabs defaultValue="all" className="w-full max-w-6xl">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
            <TabsList className="mb-4 sm:mb-0">
              <TabsTrigger value="all">All ({allAvatars.length})</TabsTrigger>
              <TabsTrigger value="male">
                Male ({maleAvatars.length})
              </TabsTrigger>
              <TabsTrigger value="female">
                Female ({femaleAvatars.length})
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-4">
              <Input
                placeholder="Search avatars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64"
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="owned"
                  checked={showOwnedOnly}
                  onCheckedChange={(checked) =>
                    setShowOwnedOnly(checked as boolean)
                  }
                  disabled
                />
                <Label htmlFor="owned">Owned</Label>
              </div>
            </div>
          </div>

          {/* All Tab */}
          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mt-3">
              {filterAvatars(allAvatars).map((avatar) => (
                <div key={avatar.id} className="flex flex-col items-center">
                  <Card
                    className="bg-card w-full p-4 flex flex-col items-center hover:bg-primary/10 cursor-pointer"
                    onClick={() => handleBuyClick(avatar)}
                  >
                    <CardContent className="p-0 flex flex-col items-center">
                      <MaskedImage
                        src={avatar.path}
                        alt={avatar.name}
                        width={192}
                        height={192}
                        className="w-24 h-24"
                        variant="shape6"
                      />
                      <p className="text-sm mt-2 text-center">{avatar.name}</p>
                      <p className="text-sm font-semibold">1,000</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Male Tab */}
          <TabsContent value="male">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mt-3">
              {filterAvatars(maleAvatars).map((avatar) => (
                <div key={avatar.id} className="flex flex-col items-center">
                  <Card
                    className="bg-card w-full p-4 flex flex-col items-center hover:bg-primary/10 cursor-pointer"
                    onClick={() => handleBuyClick(avatar)}
                  >
                    <CardContent className="p-0 flex flex-col items-center">
                      <MaskedImage
                        src={avatar.path}
                        alt={avatar.name}
                        width={192}
                        height={192}
                        className="w-24 h-24"
                        variant="shape6"
                      />
                      <p className="text-sm mt-2 text-center">{avatar.name}</p>
                      <p className="text-sm font-semibold">1,000</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Female Tab */}
          <TabsContent value="female">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mt-3">
              {filterAvatars(femaleAvatars).map((avatar) => (
                <div key={avatar.id} className="flex flex-col items-center">
                  <Card
                    className="bg-card w-full p-4 flex flex-col items-center hover:bg-primary/10 cursor-pointer"
                    onClick={() => handleBuyClick(avatar)}
                  >
                    <CardContent className="p-0 flex flex-col items-center">
                      <MaskedImage
                        src={avatar.path}
                        alt={avatar.name}
                        width={192}
                        height={192}
                        className="w-24 h-24"
                        variant="shape6"
                      />
                      <p className="text-sm mt-2 text-center">{avatar.name}</p>
                      <p className="text-sm font-semibold">1,000</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Dialog for Buy Confirmation */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Purchase</DialogTitle>
            </DialogHeader>
            {selectedAvatar && (
              <div className="flex flex-col items-center">
                <MaskedImage
                  src={selectedAvatar.path}
                  alt={selectedAvatar.name}
                  width={192}
                  height={192}
                  className="w-24 h-24 mb-4"
                  variant="shape1"
                />
                <p className="text-lg mb-2">Buy {selectedAvatar.name}?</p>
                <p className="text-sm mb-4">Cost: 1,000 credits</p>
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
