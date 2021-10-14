import { useCurrentDate } from "./useCurrentDate";
import s from "./Clock.module.css";

export const Clock = () => {
  const date = useCurrentDate();

  const formatDate = (date) => date.toLocaleDateString(undefined,
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }
  );

  return (
    <div className={s.clockBlock}>
      Сегодня {formatDate(date)}
    </div>
  );
};