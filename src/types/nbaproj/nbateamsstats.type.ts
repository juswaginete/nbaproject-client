export default interface INbaTeamStatsResultData {
  name: string,
  headers: string[],
  rowSet: [], // declared it like this since this array is a combination of strings and numbers
};

export default interface INbaTeamStatsYearByYearData {
  result_sets: INbaTeamStatsResultData[],
};