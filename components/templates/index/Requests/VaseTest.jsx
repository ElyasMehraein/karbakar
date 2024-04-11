import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ItsAvatar from "@/components/modules/ItsAvatar"
import CloseIcon from '@mui/icons-material/Close';
import Guild from "@/components/modules/Guild"
import { useState } from 'react';
import TextField from "@mui/material/TextField";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function VaseTest({ user, distinctGuilds }) {

  const [expanded, setExpanded] = useState(false);
  const [guildname, setGuildName] = useState("")
  const [snackbarError, setSnackbarError] = useState(false);


  const updateGuildname = (newGuildname) => {
    setGuildName(newGuildname);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <>
      <Typography>salam</Typography>
      {user.businesses.map((business) => (
        user.primeJob === business._id && (
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader

              avatar={
                <Avatar >
                  <ItsAvatar userCodeOrBusinessBrand={business.businessName} />
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <CloseIcon />
                </IconButton>
              }
              title={business.businessBrand}
              subheader={business.businessName}
              sx={{
                p: 0, m: 0,
                '& .MuiCardHeader-title': { fontSize: '12px', fontWeight: "bold" }, // Target title class and set font size
                '& .MuiCardHeader-subheader': { fontSize: '14px', fontWeight: "bold" }, // Target subheader class and set font size
              }}
            />
            {/* <CardMedia
              component="img"
              height="194"
              image="/static/images/cards/paella.jpg"
              alt="Paella dish"
            /> */}
            <CardContent>
              <Typography sx={{ fontSize: '14px', fontWeight: "bold" }} variant="body1" color="text.secondary">
                ایجاد درخواست جدید
              </Typography>
              <Guild updateGuildname={updateGuildname} distinctGuilds={distinctGuilds} snackbarError={snackbarError} />
              <TextField
                id="outlined-multiline-static"
                label="عنوان درخواست"
                // sx={{ maxWidth: 250, }}
                fullWidth
                // onChange={changeHandler}
                // inputProps={{ maxLength: 200 }}

              />
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                  Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                  aside for 10 minutes.
                </Typography>
                <Typography paragraph>
                  Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                  medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                  occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                  large plate and set aside, leaving chicken and chorizo in the pan. Add
                  pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                  stirring often until thickened and fragrant, about 10 minutes. Add
                  saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                </Typography>
                <Typography paragraph>
                  Add rice and stir very gently to distribute. Top with artichokes and
                  peppers, and cook without stirring, until most of the liquid is absorbed,
                  15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                  mussels, tucking them down into the rice, and cook again without
                  stirring, until mussels have opened and rice is just tender, 5 to 7
                  minutes more. (Discard any mussels that don&apos;t open.)
                </Typography>
                <Typography>
                  Set aside off of the heat to let rest for 10 minutes, and then serve.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        )))
      }
    </>
  )



}
