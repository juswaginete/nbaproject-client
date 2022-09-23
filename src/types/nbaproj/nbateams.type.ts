export default interface INbaTeamData {
  id?: any | null,
  full_name: string,
  abbreviation: string,
  nickname: string,
  city: string,
  state: string,
  year_founded: number,
};

export default interface INbaTeamsData {
  teams: INbaTeamData[],
};
