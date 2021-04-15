import Moment from "moment-timezone";
import "moment/locale/fr";

export const format = (value, format, locale, tz) => {
  if(tz) {
    return Moment(value).tz(tz).locale(locale).format(format);
  } else {
    return Moment(value).locale(locale).format(format);
  }
};
