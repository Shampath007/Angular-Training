import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datecompare',
  pure:false
})
export class DatecomparePipe implements PipeTransform {
  // transform(inputDate:Date|string):any{
  //   let inputDateFormat=new Date(inputDate);
  //   let todayDateFormat=new Date();
  //   if(inputDateFormat>todayDateFormat){
  //     return 'Your Date is Greater than Current Date';
  //   }
  //   const millisecond=todayDateFormat.getTime()-inputDateFormat.getTime();
  //   if(millisecond<1000){
  //   return millisecond == 1 ? millisecond + ' millisecond ago' : millisecond + ' milliseconds ago';
  //   }
  //   const seconds=Math.floor(millisecond/1000);
  //   if(seconds<60){
  //   return seconds==1?seconds+' second ago':seconds+' seconds ago';
  //   }
  //   const minutes=Math.floor(seconds/60);
  //   if (minutes < 60){
  //     return minutes == 1 ? minutes + ' minute ago' : minutes + ' minutes ago';
  //   }
  //   const hours=Math.floor(minutes/60);
  //   if (hours < 24){
  //   return hours == 1 ? hours + ' hour ago' : hours + ' hours ago';
  //   }
  //   const days=Math.floor(hours/24);
  //   if(days<30&&days!=7&&days!=14&&days!=21&&days!=28){
  //   return days == 1 ? days + ' day ago' : days + ' days ago';
  //   }
  //   const week=Math.floor(days/7);
  //   if(week<4){
  //     return week == 1 ? week + ' week ago' : week + ' weeks ago';
  //   }
  //   const month=Math.floor(days/30);
  //   if (month < 12){
  //     return month == 1 ? month + ' month ago' : month + ' months ago';
  //   }
  //   const year=Math.floor(month/12);
  //   if(year>0){
  //     return year == 1 ? year + ' year ago' : year + ' years ago';
  //   }
  // }
  transform(value: Date | string | number): any {
    if (!value) return "N/A";

    const date = new Date(value);
    const now = new Date();
    const millisec = now.getTime() - date.getTime();

    if (isNaN(date.getTime()) || date > now) {
      return "Invalid date format";
    }

    const units = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    const seconds = Math.floor(millisec / 1000);

    for (const unit of units) {
      const interval = Math.floor(seconds / unit.seconds);
      if (interval >= 1) {
        return `${interval} ${unit.label}${interval > 1 ? "s" : ""} ago`;
      }
    }

  }
}
