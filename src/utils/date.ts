import { format, utcToZonedTime } from "date-fns-tz";

export const isoToJstString = (iso: string, formatStr: string): string => {
  const jst = utcToZonedTime(iso, "Asia/Tokyo");
  const jstStr = format(jst, formatStr, { timeZone: "Asia/Tokyo" });
  return jstStr;
};
