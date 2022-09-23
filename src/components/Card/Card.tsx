import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardActionArea } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";

import NBA from "../../assets/images/nba.png";

export const ActionAreaCardStyles = makeStyles({
  cardElement: {
    margin: "auto",
  },
});

interface ActionAreaCardProps {
  handleClick?: () => void;
  teamName: string;
  abbreviation?: string;
  city?: string;
  state?: string;
  yearFounded?: number;
  isMyTeam?: boolean;
}

const ActionAreaCard = ({
  handleClick,
  teamName,
  abbreviation,
  city,
  state,
  yearFounded,
  isMyTeam
}: ActionAreaCardProps) => {
  const classes = ActionAreaCardStyles();

  return (
    <Card className={classes.cardElement} sx={{ maxWidth: 345 }} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={NBA}
          alt="nba-image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {teamName}
          </Typography>
          {isMyTeam ? (
            <Button onClick={handleClick} variant="outlined" color="error">Delete Team</Button>
          ) : ""}
          <Typography variant="body2" color="text.secondary">
            {abbreviation}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {city}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {state}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ActionAreaCard;
