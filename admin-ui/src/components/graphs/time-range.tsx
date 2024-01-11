import { format, subMonths } from "date-fns";
import { CalendarTooltipProps, ResponsiveTimeRange } from "@nivo/calendar";

interface ITimeRange {
  value: number;
  day: string;
}

interface ITimeRangeProps {
  data: ITimeRange[];
  months: number;
}

/**
 *
 * @param data it expects an array of data in type Record<value:number, day:string>
 * @param months number of months to be shown in time range, eg if you select
 * 5, it would show data from today to 5 months ago
 * @returns a Github contribution graph like component
 */
const TimeRange = ({ data, months }: ITimeRangeProps) => {
  return (
    <ResponsiveTimeRange
      data={data}
      from={format(subMonths(new Date(), months), "yyyy-MM-dd")}
      to={format(new Date(), "yyyy-MM-dd")}
      emptyColor="lightgrey"
      colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
      margin={{ top: 40, right: 40, bottom: 100, left: 40 }}
      dayBorderWidth={2}
      dayBorderColor="grey"
      tooltip={Tooltip}
      legends={[
        {
          anchor: "bottom-right",
          direction: "row",
          justify: false,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: "right-to-left",
          translateX: -60,
          translateY: -60,
          symbolSize: 20,
        },
      ]}
    />
  );
};

const Tooltip: React.FC<CalendarTooltipProps> = (props) => {
  return (
    <div className="rounded-md bg-background py-2 px-4 flex space-x-2 border">
      <span>{props.day}</span>&nbsp;<span>:</span>&nbsp;
      <span>{props.value}</span>
    </div>
  );
};

export default TimeRange;
