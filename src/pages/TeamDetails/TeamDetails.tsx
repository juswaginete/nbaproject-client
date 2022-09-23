import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';

import TeamTable from '../../components/Table/Table';
import NbaProjService from '../../services/nbaproj.service';

const TeamDetails = () => {
  const { teamId } = useParams<{ teamId?: string }>();

  const [teamTableHeader, setTeamTableHeader] = useState([]);
  const [teamTableRows, setTeamTableRows] = useState([]);

  useEffect(() => {
    fetchNBATeamYearByYearStats();
  }, []);

  const fetchNBATeamYearByYearStats = () => {
    const parameter = {
      team_id: teamId,
    };

    NbaProjService.getTeamYearByYearStats(parameter)
      .then((response: any) => {
        setTeamTableHeader(response.data?.resultSets[0].headers);
        setTeamTableRows(response.data?.resultSets[0].rowSet);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <TeamTable tableHeader={teamTableHeader} tableRow={teamTableRows} />
  );
}

export default TeamDetails;
