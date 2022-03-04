interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  getDateNow(): Date;
  addTimeToCurrentDate(time: number): Date;
}

export { IDateProvider };
