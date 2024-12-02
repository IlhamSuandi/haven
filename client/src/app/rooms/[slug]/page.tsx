import artotelHotel from "@/assets/artotel_hotel.webp";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { BedDoubleIcon, Check, MailIcon, MapPin, PhoneIcon, Star } from "lucide-react";
import Image from "next/image";
import artotelRoom from "@/assets/artotel_room.webp";
import artotelRoom2 from "@/assets/artotle_room2.webp";
import artotelRoom3 from "@/assets/artotle_room3.webp";
import Link from "next/link";


export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = encodeURIComponent((await params).slug).replace(/%2520/g, ' ');
  return (
    <div className="w-full p-16 bg-gray-50 lg:px-44">
      <div className="mb-5 rounded-lg overflow-hidden bg-white shadow-sm">
        <div className="relative w-full max-h-[500px] aspect-video">
          <Image
            priority
            quality={80}
            src={artotelHotel}
            alt="hero"
            layout="fill"
            objectFit="cover"
            className="absolute object-bottom"
          />
        </div>
        <div className="p-5 border rounded-lg shadow-xl">
          <div className="w-full flex justify-between items-start">
            <div className="w-full">
              <h1>{slug}</h1>
              <div className="flex items-center">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <p className="sm:text-xs text-base text-gray-500">Senayan, Kebayoran Baru</p>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 text-gray-500" />
                  <p className="sm:text-xs text-base text-gray-500">08712129149</p>
                </div>
                <div className="flex items-center gap-2">
                  <MailIcon className="w-4 h-4 text-gray-500" />
                  <p className="sm:text-xs text-base text-gray-500">hotel@artotel.com</p>
                </div>
              </div>
              <p>Artotel Jakarta offers a modern, stylish stay in the heart of the city, blending contemporary design with comfort. Located in a vibrant area, it provides easy access to key attractions, shopping, and dining spots, making it the perfect choice for both business and leisure travelers.</p>
            </div>
            <div className="w-full flex items-end justify-end gap-2">
              <div className="text-right">
                <p className="text-xs">Price/room/night starts from</p>
                <p className="font-bold">Rp. 1.200.000</p>
              </div>
              <Button className="bg-red-500 p-6">
                <Link href={`/rooms/${slug}#room-list`}>Select Room</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div id="room-list" className="flex flex-col gap-5">
        <Card className="flex items-center justify-between w-full p-0 overflow-hidden">
          <div className="w-full flex items-center gap-2 border-r border-r-gray-200">
            <CardHeader className="w-[150px] aspect-square relative">
              <Image
                quality={60}
                src={artotelRoom}
                alt="hotel"
                layout="fill"
                objectFit="cover"
                className="absolute rounded-lg"
              />
            </CardHeader>
            <CardContent className="p-5 gap-2">
              <p className="sm:text-xs text-base text-gray-500">Deluxe Double Or Twin Room, City View</p>
              <p className="sm:text-lg text-xl font-bold">Non Refundable</p>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gray-500" />
                <p className="sm:text-xs text-base text-gray-500">Standard</p>
              </div>

              <div className="flex items-center gap-2">
                <BedDoubleIcon className="w-4 h-4 text-gray-500" />
                <p className="sm:text-xs text-base text-gray-500">1 King Bed</p>
              </div>
            </CardContent>
          </div>
          <CardFooter className="w-[500px] flex flex-col items-start justify-center gap-2 p-5">
            <div>
              <p className="sm:text-lg text-xl font-semibold text-gray-600">Price</p>
              <p className="sm:text-base text-lg text-red-500">Rp. 1.200.000</p>
            </div>
            <Button>
              <Link href={`/rooms/${slug}/forms`}>Choose</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex items-center justify-between w-full p-0 overflow-hidden">
          <div className="w-full flex items-center gap-2 border-r border-r-gray-200">
            <CardHeader className="w-[150px] aspect-square relative">
              <Image
                quality={60}
                src={artotelRoom2}
                alt="hotel"
                layout="fill"
                objectFit="cover"
                className="absolute rounded-lg"
              />
            </CardHeader>
            <CardContent className="p-5 gap-2">
              <p className="sm:text-xs text-base text-gray-500">Deluxe Double Or Twin Room, City View</p>
              <p className="sm:text-lg text-xl font-bold">Non Refundable</p>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gray-500" />
                <p className="sm:text-xs text-base text-gray-500">Deluxe</p>
              </div>

              <div className="flex items-center gap-2">
                <BedDoubleIcon className="w-4 h-4 text-gray-500" />
                <p className="sm:text-xs text-base text-gray-500">1 King Bed & 1 Double Bed</p>
              </div>
            </CardContent>
          </div>
          <CardFooter className="w-[500px] flex flex-col items-start justify-center gap-2 p-5">
            <div>
              <p className="sm:text-lg text-xl font-semibold text-gray-600">Price</p>
              <p className="sm:text-base text-lg text-red-500">Rp. 1.500.000</p>
            </div>
            <Button>
              <Link href={`/rooms/${slug}/forms`}>Choose</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex items-center justify-between w-full p-0 overflow-hidden">
          <div className="w-full flex items-center gap-2 border-r border-r-gray-200">
            <CardHeader className="w-[150px] aspect-square relative">
              <Image
                quality={60}
                src={artotelRoom3}
                alt="hotel"
                layout="fill"
                objectFit="cover"
                className="absolute rounded-lg"
              />
            </CardHeader>
            <CardContent className="p-5 gap-2">
              <p className="sm:text-xs text-base text-gray-500">Deluxe Double Or Twin Room, City View</p>
              <p className="sm:text-lg text-xl font-bold">Refundable</p>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gray-500" />
                <p className="sm:text-xs text-base text-gray-500">Family</p>
              </div>

              <div className="flex items-center gap-2">
                <BedDoubleIcon className="w-4 h-4 text-gray-500" />
                <p className="sm:text-xs text-base text-gray-500">1 King Bed & 2 Single Beds</p>
              </div>
            </CardContent>
          </div>
          <CardFooter className="w-[500px] flex flex-col items-start justify-center gap-2 p-5">
            <div>
              <p className="sm:text-lg text-xl font-semibold text-gray-600">Price</p>
              <p className="sm:text-base text-lg text-red-500">Rp. 1.800.000</p>
            </div>
            <Button>
              <Link href={`/rooms/${slug}/forms`}>Choose</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
