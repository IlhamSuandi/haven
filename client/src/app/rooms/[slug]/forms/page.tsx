"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, InfoIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const bookingFormSchema = z.object({
  customer_name: z.string().min(1, "Name is required"),
  gender: z.enum(["male", "female"]),
  identity_number: z.string().min(16, "Identity number must be 16 digits"),
  room_type: z.string().min(1, "Room type is required"),
  price: z.number().min(1, "Price must be a positive number"),
  booking_date: z.date().refine((val) => !isNaN(val.getTime()), "Invalid date").optional(),
  duration: z.number().min(1, "Duration must be at least 1 day"),
  includes_breakfast: z.boolean(),
  total_price: z.number().min(1, "Total price must be a positive number"),
  discount: z.number(),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

export default function BookingForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      customer_name: "",
      gender: "male",
      identity_number: "",
      room_type: "standard",
      price: 1200000,
      booking_date: undefined,
      duration: 1,
      includes_breakfast: true,
      total_price: 1200000,
      discount: 0,
    },
  });

  const roomTypes = [
    { name: "Standard", description: "1 King Bed", price: 1200000 },
    { name: "Deluxe", description: "1 King Bed & 1 Double Bed", price: 1500000 },
    { name: "Family", description: "1 King Bed & 2 Single Beds", price: 1800000 },
  ];

  const roomType = watch("room_type");
  const duration = watch("duration");
  const breakfast = watch("includes_breakfast");

  const price = roomTypes.find((room) => room.name.toLowerCase() === roomType.toLowerCase())?.price || 0;

  const totalPrice =
    duration >= 3 ? (price * duration * 0.9) + (breakfast ? 80000 : 0) : price * duration + (breakfast ? 80000 : 0);

  const formattedTotalPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalPrice);

  const handleTotalPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, "");
    setValue("total_price", Number(rawValue));
  };

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, "");
    setValue("price", Number(rawValue));
  };

  const onSubmit = (data: BookingFormData) => {
    data.total_price = totalPrice;

    if (data.duration >= 3) {
      data.discount = 0.10;
    }

    if (data.includes_breakfast) {
      data.price = data.price + 80000;
    }

    console.log("Booking submitted:", data);

    fetch(process.env.NEXT_PUBLIC_API_URL + "/booking", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => {
      if (!res.ok) {
        toast({
          title: `HTTP Error Occurred ${res.status}`,
          description: "Please try again later",
          variant: "destructive"
        })
      }
      return res.json();
    }).then((data) => {
      toast({
        title: data.message,
        description: "Booking created successfully",
      })
    }).catch((err) => {
      toast({
        title: `Error creating booking: ${err}`,
        description: "Please try again later",
        variant: "destructive"
      })
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 rounded-lg bg-gray-50">
      <h2 className="text-2xl font-bold text-center mb-6">Booking Form</h2>
      <form
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Name */}
        <div className="flex flex-col">
          <Label htmlFor="name" className="text-lg">
            Name
          </Label>
          <Controller
            name="customer_name"
            control={control}
            render={({ field }) => (
              <Input
                id="name"
                {...field}
                placeholder="Enter your name"
                className="mt-2"
                autoFocus
              />
            )}
          />
          {errors.customer_name && <p className="text-red-500">{errors.customer_name.message}</p>}
        </div>

        {/* Gender */}
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <Label className="text-lg">Gender</Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <div className="flex space-x-4">
                  <RadioGroup defaultValue="male" {...field}>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="gender">male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="gender">female</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              )}
            />
          </div>
        </div>

        {/* Identity Number */}
        <div className="flex flex-col">
          <Label htmlFor="identityNumber" className="text-lg">
            Identity Number
          </Label>
          <Controller
            name="identity_number"
            control={control}
            render={({ field }) => (
              <Input
                type="number"
                id="identityNumber"
                {...field}
                onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter your identity number"
                className="mt-2"
              />
            )}
          />
          {errors.identity_number && <p className="text-red-500">{errors.identity_number.message}</p>}
        </div>

        {/* Room Type */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Label htmlFor="roomType" className="text-lg">
              Room Type
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="w-4 h-4 text-gray-500" />
                </TooltipTrigger>
                <TooltipContent>
                  {roomTypes.map((roomType) => (
                    <p key={roomType.name}>{roomType.name}: {roomType.description}</p>
                  ))}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Controller
            name="room_type"
            control={control}
            defaultValue="standard"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue className="text-gray-500" placeholder="Select a room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="deluxe">Deluxe</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.room_type && <p className="text-red-500">{errors.room_type.message}</p>}
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <Label htmlFor="price" className="text-lg">
            Price
          </Label>
          <Input
            id="price"
            type="text"
            value={formattedPrice}
            onChange={handlePriceChange}
            className="mt-2"
            disabled
          />
        </div>

        {/* Check-in Date */}
        <div className="flex flex-col">
          <Label htmlFor="checkInDate" className="text-lg">
            Check-in Date
          </Label>
          <Controller
            name="booking_date"
            control={control}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal p-0 pl-4",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {field.value ? format(field.value, "MMM dd, yyyy") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start" side="bottom">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => setValue("booking_date", date || undefined)}
                    initialFocus
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.booking_date && <p className="text-red-500">{errors.booking_date.message}</p>}
        </div>

        {/* Stay Duration */}
        <div className="flex flex-col">
          <Label htmlFor="stayDuration" className="text-lg">
            Stay Duration (Days)
          </Label>
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <Input
                id="stayDuration"
                type="number"
                {...field}
                value={field.value?.toString().replace(/^0+/, "") || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  const sanitizedValue = value.startsWith("0") ? value.slice(1) : value;
                  field.onChange(Number(sanitizedValue));
                }}
                className="mt-2"
              />
            )}
          />
          {errors.duration && <p className="text-red-500">{errors.duration.message}</p>}
        </div>

        {/* include breakfast */}
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <Label className="text-lg">Include Breakfast</Label>
            <Controller
              name="includes_breakfast"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>
        </div>

        {/* Total Price */}
        <div className="flex flex-col">
          <Label htmlFor="totalPrice" className="text-lg">
            Total Price
          </Label>
          <Input
            id="totalPrice"
            type="text"
            value={formattedTotalPrice}
            className="mt-2 bg-gray-100"
            onChange={handleTotalPriceChange}
            readOnly
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <Button type="submit" className="text-white">
            Save
          </Button>
          <Button type="button" className="bg-red-500 text-white">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
