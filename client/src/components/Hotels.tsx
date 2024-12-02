import artotelHotel from "@/assets/artotel.webp";
import thetrans from "@/assets/the_trans_hotel.webp";
import kempinski from "@/assets/kempinski_hotel.webp";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hotels() {
  return (
    <div id="hotel-list" className="p-16 lg:px-44">
      <h2 className="text-xl font-bold">Popular Hotels in Indonesia</h2>
      <p className="text-gray-500 mb-5">Check out these memorable stays and their recent reviews</p>

      <div className="flex flex-col gap-5">
        <Card className="flex items-center justify-between w-full p-0 overflow-hidden">
          <div className="w-full flex items-center gap-2 border-r border-r-gray-200">
            <CardHeader className="w-[150px] aspect-square relative">
              <Image
                quality={60}
                src={artotelHotel}
                alt="hotel"
                layout="fill"
                objectFit="cover"
                className="absolute rounded-lg"
              />
            </CardHeader>
            <CardContent className="p-5">
              <Link href="/rooms/artotel gelora senayan jakarta" className="font-semibold sm:text-base text-xl hover:border-b-2 hover:border-b-grey-300">ARTOTEL Gelora Senayan Jakarta</Link>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <p className="sm:text-xs text-base text-gray-500">Senayan, Kebayoran Baru</p>
              </div>
              <div className="flex items-center">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </CardContent>
          </div>
          <CardFooter className="flex flex-col items-start justify-center gap-2 p-5">
            <div>
              <p className="sm:text-lg text-xl font-semibold text-gray-600">Start From</p>
              <p className="sm:text-base text-lg text-red-500">Rp. 1.200.000</p>
            </div>
            <Link href="/rooms/artotel gelora senayan jakarta">
              <Button>
                See Availability
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="flex items-center justify-between w-full p-0 overflow-hidden">
          <div className="w-full flex items-center gap-2 border-r border-r-gray-200">
            <CardHeader className="w-[150px] aspect-square relative">
              <Image
                quality={60}
                src={kempinski}
                alt="hotel"
                layout="fill"
                objectFit="cover"
                className="absolute rounded-lg"
              />
            </CardHeader>
            <CardContent className="p-5">
              <Link href="/rooms/Hotel Indonesia Kempinski Jakarta" className="font-semibold sm:text-base text-xl hover:border-b-2 hover:border-b-grey-300">Hotel Indonesia Kempinski Jakarta</Link>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <p className="sm:text-xs text-base text-gray-500">Thamrin, Jakarta Pusat</p>
              </div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </CardContent>
          </div>
          <CardFooter className="flex flex-col items-start justify-center gap-2 p-5">
            <div>
              <p className="sm:text-lg text-xl font-semibold text-gray-600">Start From</p>
              <p className="sm:text-base text-lg text-red-500">Rp. 4.000.000</p>
            </div>
            <Link href="/rooms/Hotel Indonesia Kempinski Jakarta">
              <Button>
                See Availability
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="flex items-center justify-between w-full p-0 overflow-hidden">
          <div className="w-full flex items-center gap-2 border-r border-r-gray-200">
            <CardHeader className="w-[150px] aspect-square relative">
              <Image
                quality={60}
                src={thetrans}
                alt="hotel"
                layout="fill"
                objectFit="cover"
                className="absolute rounded-lg"
              />
            </CardHeader>
            <CardContent className="p-5">
              <Link href="/rooms/The Trans Luxury Hotel" className="font-semibold sm:text-base text-xl hover:border-b-2 hover:border-b-grey-300">The Trans Luxury Hotel</Link>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <p className="sm:text-xs text-base text-gray-500">Buahbatu, Bandung</p>
              </div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </CardContent>
          </div>
          <CardFooter className="flex flex-col items-start justify-center gap-2 p-5">
            <div>
              <p className="sm:text-lg text-xl font-semibold text-gray-600">Start From</p>
              <p className="sm:text-base text-lg text-red-500">Rp. 2.000.000</p>
            </div>
            <Link href="/rooms/The Trans Luxury Hotel">
              <Button>
                See Availability
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
