import { Button, Grid, Grow, Typography, useTheme } from "@mui/material";
import { Container } from "@mui/system";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import Alert from "../../Utils/Alert";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const theme = useTheme();
  const styles = {
    buttonsCont: {
      width: "auto",
      marginTop: "5em",
    },
    image: {
      height: "300px",
      width: "200px",
      background: "rgb(234,231,220)",
      "@media (max-width : 700px)": {
        height: "250px",
        width: "250px",
      },
    },
    revCont: {
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column-reverse",
        border: "1px solid #BEDCFA",
        padding: "1em",
        borderRadius: "10%",
      },
    },
    revCont2: {
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        border: "1px solid #BEDCFA",
        padding: "1em",
        borderRadius: "10%",
      },
    },
  };
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user._id) {
      navigate("/login");
    } else {
      if (user.role === "user") {
        navigate("/home");
      }
    }
  }, [user]);

  return (
    <Grow in>
      <Container sx={styles.buttonsCont}>
        <Alert />
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyItems="center"
          justifyContent="center"
          sx={{ padding: "15em" }}
        >
          <Grid item xs={12} justifyContent="center">
            <Grid
              container
              sx={styles.revCont}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  component={RouterLink}
                  sx={{ padding: "1em" }}
                  startIcon={<AddBoxIcon />}
                  variant="contained"
                  to="/addParkingLot"
                >
                  <Typography variant="h6">Add Parking Lot</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <hr
            style={{
              borderTop: "6px solid #666",
              borderRadius: "5px",
              width: "48%",
              marginTop: "8em",
              justifyContent: "center",
            }}
          />
          <Grid item xs={12} justifyContent="center">
            <Grid
              container
              sx={styles.revCont2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  component={RouterLink}
                  sx={{ padding: "1em" }}
                  startIcon={<EqualizerIcon />}
                  variant="contained"
                  to="/analysis"
                >
                  <Typography variant="h6">Analyze History</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <br /> <br /> <br /> <br /> <br /> <br />
          <br />
          <br />
          <br />
          <br />
          <br /> <br /> <br /> <br /> <br /> <br />
        </Grid>
      </Container>
    </Grow>
  );
};
export default AdminDashboard;
