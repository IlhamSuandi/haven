"use client"

import Image from "next/image";
import heroImage from "@/assets/hotel.webp";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DateInput from "@/components/DateInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HotelIcon, UserIcon } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const [checkin, setCheckin] = useState<Date>()
  const [checkout, setCheckout] = useState<Date>()

  const guestContents = [
    {
      label: "1 Adult",
      value: "1 Adult"
    },
    {
      label: "2 Adult",
      value: "2 Adult"
    },
    {
      label: "2 Adult & 1 Child",
      value: "2 Adult & 1 Child"
    },
    {
      label: "2 Adult & 2 Child",
      value: "2 Adult & 2 Child"
    },
    {
      label: "Custom",
      value: "Custom"
    },
  ]

  const roomContents = [
    {
      label: "1 Room",
      value: "1 Room"
    },
    {
      label: "2 Room",
      value: "2 Room"
    },
    {
      label: "3 Room",
      value: "3 Room"
    },
    {
      label: "4 Room",
      value: "4 Room"
    },
  ]


  return (
    <div className="mb-14">
      <div className="relative w-full h-[400px]">
        <Image
          quality={60}
          src={heroImage}
          alt="hero"
          layout="fill"
          objectFit="cover"
          className="absolute"
        />

        <div className="absolute bottom-[60%] transform translate-y-1/2 left-[5%] lg:left-44 text-white">
          <h2 className="mix-blend-screen text-2xl font-bold shadow-lg">
            Feel Like Home in our Hotels
          </h2>
          <div className="sm:max-w-64 md:max-w-none mb-8">
            <p className="mix-blend-overlay shadow-lg">Unlock your enchanting journey, explore the best hotels in Indonesia</p>
          </div>
          <Button className="bg-white font-bold text-gray-700 hover:text-white">
            <Link href={`#hotel-list`}>Explore Rooms</Link>
          </Button>
        </div>

        <div className="absolute -bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 bg-white rounded-lg opacity-95 shadow-xl">
          <div className="w-full flex flex-row items-center justify-center gap-12 p-6 text-left">
            <div>
              <h2>Check - In</h2>
              <DateInput date={checkin} setDate={setCheckin} />
            </div>
            <div>
              <h2>Check - Out</h2>
              <DateInput date={checkout} setDate={setCheckout} />
            </div>
            <div>
              <h2>Guests</h2>
              <Select>
                <SelectTrigger className="w-[140px] p-0 justify-start gap-2 border shadow-none border-none">
                  <UserIcon className="w-4" />
                  <SelectValue placeholder="Guests" />
                </SelectTrigger>
                <SelectContent className="border-none shadow-none">
                  {guestContents.map((item) => (
                    <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <h2>Rooms</h2>
              <Select>
                <SelectTrigger className="w-[140px] p-0 justify-start gap-2 border shadow-none border-none">
                  <HotelIcon className="w-4" />
                  <SelectValue placeholder="Rooms" />
                </SelectTrigger>
                <SelectContent className="border-none shadow-none">
                  {roomContents.map((item) => (
                    <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Button className="p-8">
                <Link href={`#hotel-list`}>Find Room</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


