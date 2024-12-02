import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface DateInputProps {
  date: Date | undefined
  setDate: Dispatch<SetStateAction<Date | undefined>>
}

export default function DateInput({ date, setDate }: DateInputProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="link"
          className={cn(
            "w-[140px] justify-start text-left font-normal p-0",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "MMM dd, yyyy") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

