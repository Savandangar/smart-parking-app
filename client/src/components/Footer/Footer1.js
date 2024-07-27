import {
  Grid,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import Call from "@mui/icons-material/Call";

const Footer1 = () => {
  const theme = useTheme();
  const styles = {
    footer: {
      position: "center",
      background: "#DA9FF9",
      padding: "2em",
    },
    linkName: {
      color: "black",
      transition: "0.5s",
      "&:hover": {
        color: "#E2F0F9",
        textShadow: "0 0 5px #E2F0F9",
      },
      textDecoration: "none",
    },
  };
  return (
    <Box sx={styles.footer}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h3"
                textTransform="uppercase"
                fontWeight="bold"
              >
                Contact
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <EmailIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Link
                          href="#"
                          target="_blank"
                          color="inherit"
                          sx={styles.linkName}
                          fontSize="16px"
                        >
                          smartparking@gmail.com
                        </Link>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Call />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Link
                          href="#"
                          target="_blank"
                          color="inherit"
                          sx={styles.linkName}
                          fontSize="16px"
                        >
                          +91 1234567890
                        </Link>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <TwitterIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Link
                          href="#"
                          target="_blank"
                          color="inherit"
                          fontSize="16px"
                          sx={styles.linkName}
                        >
                          @parkinngproject
                        </Link>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <FacebookIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Link
                          href="#"
                          target="_blank"
                          color="inherit"
                          fontSize="16px"
                          sx={styles.linkName}
                        >
                          Park Project
                        </Link>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h3"
                textTransform="uppercase"
                fontWeight="bold"
              >
                Company
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" fontWeight="bold" fontSize="16px">
                We provide expert solutions to park your vehicles safely and
                with ease!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText
                      primary={
                        <Typography variant="h5">PARKING PROJECT</Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText
                      primary={
                        <Typography variant="h5">Vadodara, Gujarat</Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Footer1;
