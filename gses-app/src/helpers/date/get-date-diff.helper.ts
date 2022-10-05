const getDateDiff = (startDate: Date, endDate: Date): number => {
  return Math.round(
    (endDate.getTime() - startDate.getTime()) / 1000,
  );
};

export { getDateDiff };
