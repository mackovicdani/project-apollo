import moment from "moment";
import { useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

interface CustomDate {
  date: moment.Moment;
  data: any[];
}

interface CalendarMonthProps {
  data: any[];
}

export default function CalendarMonth({ data }: CalendarMonthProps) {
  const [month, setMonth] = useState(0);

  let days: CustomDate[] = [];
  let today = moment();
  let startDate = moment(moment().add(month, "month").startOf("month")).weekday(
    0
  );

  for (let i = 0; i < 42; i++) {
    const tempDate: CustomDate = {
      date: startDate.clone(),
      data: data?.filter(
        (item: any) =>
          moment(item.date).format("YYYY-MM-DD") ===
          startDate.clone().format("YYYY-MM-DD")
      ),
    };
    days.push(tempDate);
    startDate.add(1, "days");
  }

  return (
    <div className="p-3 text-text">
      <div className="grid h-full w-auto grid-cols-7 grid-rows-[8] gap-1 p-1">
        <button
          onClick={() => setMonth(month - 1)}
          type="button"
          className="flex h-full w-full items-center justify-center border border-border bg-secondary"
        >
          <IoArrowBack></IoArrowBack>
        </button>
        <div className="col-span-5 flex aspect-[6/1] max-h-20 w-full items-center justify-center border border-border bg-card font-bold">
          <h2>{moment().add(month, "months").format("MMMM").toUpperCase()}</h2>
        </div>
        <button
          type="button"
          onClick={() => setMonth(month + 1)}
          className="flex h-full w-full items-center justify-center border border-border bg-secondary"
        >
          <IoArrowForward></IoArrowForward>
        </button>
        {days &&
          days.map((day) => (
            <div
              className="flex h-full w-full justify-center"
              key={day.date.toString()}
            >
              <div
                className={`${
                  today.format("YYYY-MM-DD") === day.date.format("YYYY-MM-DD")
                    ? "bg-primary-main"
                    : "bg-main"
                } ${
                  moment().add(month, "month").month() === day.date.month()
                    ? "opacity-100"
                    : "opacity-50"
                } relative flex aspect-video w-full items-center justify-center rounded border border-border hover:cursor-pointer`}
              >
                <h3 className="p-2 text-xs font-bold text-text">
                  {day.date.format("DD")}
                </h3>
                <div className="absolute bottom-1 flex w-full justify-center gap-[3px]">
                  {day.data?.length < 3 ? (
                    day.data?.map((item: any) => (
                      <div
                        key={item._id}
                        className="aspect-square w-1 rounded-full border border-border bg-secondary"
                      ></div>
                    ))
                  ) : (
                    <div className="h-[5px] w-4 rounded-full border border-border bg-secondary"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
