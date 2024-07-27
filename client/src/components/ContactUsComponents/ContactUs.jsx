import { Button, Link, TextField, useTheme } from "@mui/material";
import {
  Container,
  Grid,
  Grow,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import feedbackImg from "../../images/feedback_parking.svg";
import { asyncpostFeedback } from "../../state";
import Alert from "../../Utils/Alert";

const initialState = {
  firstName: "",
  lastName: "",
  country: "",
  feedback: "",
};

const ContactUs = () => {
  const theme = useTheme();
  const styles = {
    mainCont: {
      marginTop: "5em",
      width: "auto",
      marginBottom: "5em",
      padding: "2em",
    },
    paper: {
      padding: "2em",
      background: theme.palette.primary.dark,
      color: "white",
    },
    listItemText: {
      padding: "3px",
    },
    formContainer: {
      marginTop: "1rem",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "70%",
      margin: "auto",
      "@media (max-width : 500px)": {
        width: "100%",
      },
    },
  };
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.auth.alert);

  useEffect(() => {
    if (alert.msg) {
      if (alert.msg === "Feedback submit successfully") {
        setFormData(initialState);
      }
    }
  }, [alert]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    dispatch(asyncpostFeedback(formData));
  };
  return (
    <Grow in>
      <Container sx={styles.mainCont}>
        <Alert />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* <Paper sx={styles.paper}  > */}
            <Typography variant="h2">Contact Us</Typography>
            <Typography variant="p">
              Thank you for showing interest in our services. Feel free to reach
              out to us on various social media platforms:
            </Typography>
            <List>
              <ListItem>
                <Typography variant="h5" sx={styles.listItemText}>
                  Email ID:{" "}
                </Typography>
                <Link
                  href="mailto:smartparking@gmail.com"
                  target="_blank"
                  color="#012dfe"
                >
                  smartparking@gmail.com
                </Link>
              </ListItem>
              <ListItem>
                <Typography variant="h5" sx={styles.listItemText}>
                  Phone Number:
                </Typography>
                <Link href="#" target="_blank" color="#012dfe">
                  +91 1234567890
                </Link>
              </ListItem>
              <ListItem>
                <Typography variant="h5" sx={styles.listItemText}>
                  Twitter Handle:
                </Typography>
                <Link
                  href="https://www.twitter.com/"
                  target="_blank"
                  color="#012dfe"
                >
                  @parkingproject
                </Link>
              </ListItem>
              <ListItem>
                <Typography variant="h5" sx={styles.listItemText}>
                  Facebook ID:
                </Typography>
                <Typography variant="a" component="a">
                  {" "}
                </Typography>
                <Link
                  href="https://www.facebook.com/"
                  target="_blank"
                  color="#012dfe"
                >
                  Park Project
                </Link>
              </ListItem>
            </List>
            {/* </Paper> */}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default ContactUs;
