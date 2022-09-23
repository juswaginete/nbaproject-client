import http from '../api-common';
import IMyNbaTeam from '../types/nbaproj/mynbateam.type';
import INbaTeamData from '../types/nbaproj/nbateams.type';
import INbaTeamStatsYearByYearData from '../types/nbaproj/nbateamsstats.type';

const getAllNbaTeams = () => {
  return http.get<Array<INbaTeamData>>("/teams/");
};

const getMyTeams = () => {
  return http.get<Array<string>>("/my-teams/");
};

const createMyTeam = (body: object) => {
  return http.post<Array<IMyNbaTeam>>("/teams/", body);
};

const deleteMyTeam = (teamId: number) => {
  return http.delete<Array<IMyNbaTeam>>(`/delete-team/${teamId}`);
};

const getTeamYearByYearStats = (parameter: object) => {
  return http.get<Array<INbaTeamStatsYearByYearData>>("/teams/", { params: parameter });
};

const NbaProjService = {
  getAllNbaTeams,
  getTeamYearByYearStats,
  createMyTeam,
  getMyTeams,
  deleteMyTeam,
};

export default NbaProjService;