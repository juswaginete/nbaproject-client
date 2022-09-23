import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';

import ActionAreaCard from '../../components/Card/Card';
import ActionModal from '../../components/Modal/Modal';

import INbaTeamData from '../../types/nbaproj/nbateams.type';
import IMyNbaTeam from '../../types/nbaproj/mynbateam.type';
import NbaProjService from '../../services/nbaproj.service';

export const HomeStyles = makeStyles({
  boxElement: {
    margin: "50px",
    padding: "50px",
  },
});

const Home = () => {
  const classes = HomeStyles();
  const history = useHistory();

  const [teams, setTeams] = useState<Array<INbaTeamData>>([]);
  const [myTeams, setMyTeams] = useState<Array<IMyNbaTeam>>([]);

  useEffect(() => {
    fetchNBATeams();
    fetchMyTeams();
  }, []);

  const fetchNBATeams = () => {
    NbaProjService.getAllNbaTeams()
      .then((response: any) => {
        setTeams(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const fetchMyTeams = () => {
    NbaProjService.getMyTeams()
      .then((response: any) => {
        setMyTeams(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteMyTeam = (teamId: number) => {
    NbaProjService.deleteMyTeam(teamId)
      .then((response: any) => {
        toast.success('Team Deleted Successfully!', {
          position: toast.POSITION.TOP_RIGHT
        });

        fetchMyTeams();
      })
      .catch((e: Error) => {
        toast.error('Error While Deleting Your Team!', {
          position: toast.POSITION.TOP_RIGHT
        });
        console.log(e);
      });
  };

  const handleTeamClick = (teamId: number) => {
    if (teamId) {
      history.push(`/team/${teamId}`);
    }
  };

  const handleDeleteMyTeam = (teamId: number) => {
    if (teamId) {
      deleteMyTeam(teamId);
    }
  };

  const handleAddMyTeams = (data: any) => {
    setMyTeams(data);
    fetchMyTeams();
  };

  return (
    <Box className={classes.boxElement} sx={{ flexGrow: 1 }}>
      <ActionModal myTeams={myTeams} onCreateMyTeam={handleAddMyTeams} />
      <h1>My Teams</h1>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ marginBottom: "20px" }}>
        {myTeams && myTeams.map((myTeam, index) => (
          <Grid xs={2} sm={4} md={4} key={index}>
            <ActionAreaCard
              handleClick={() => handleDeleteMyTeam(myTeam.teamId)}
              teamName={myTeam.teamName}
              isMyTeam={true}
            />
          </Grid>
        ))}
      </Grid>
      <hr />
      <h1>Current NBA Teams</h1>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {teams && teams.map((team, index) => (
          <Grid xs={2} sm={4} md={4} key={index}>
            <ActionAreaCard
              handleClick={() => handleTeamClick(team.id)}
              teamName={team.full_name}
              abbreviation={team.abbreviation}
              city={team.city}
              state={team.state}
              yearFounded={team.year_founded}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Home;
