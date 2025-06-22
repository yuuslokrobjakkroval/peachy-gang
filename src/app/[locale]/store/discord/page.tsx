"use client";

import React, { useState } from "react";
import Container from "@/components/layouts/container";
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
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const maleAvatarData = [{ name: "Zinchenko", number: 35 }];

const femaleAvatarData = [{ name: "Lenglet", number: 34 }];

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
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="nitro">Nitro</TabsTrigger>
              <TabsTrigger value="boost">Server Boosts</TabsTrigger>
              <TabsTrigger value="decoration">Decorations</TabsTrigger>
              <TabsTrigger value="nameplate">Nameplates</TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-4">
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64"
              />
            </div>
          </div>

          {/* All Tab */}
          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mt-3"></div>
          </TabsContent>

          {/* Nitro Tab */}
          <TabsContent value="nitro">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mt-3"></div>
          </TabsContent>

          {/* Server Boost Tab */}
          <TabsContent value="boost">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mt-3">
              {/* {filterAvatars(femaleAvatars).map((avatar) => (
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
              ))} */}
            </div>
          </TabsContent>

          {/* Decoration Tab */}
          <TabsContent value="decoration">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mt-3"></div>
          </TabsContent>

          {/* Nameplate Tab */}
          <TabsContent value="nameplate">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mt-3"></div>
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
