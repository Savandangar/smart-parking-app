import React, { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, } from '@mui/material'
import Navbar from './components/Navbar/Navbar';
import AboutUs from './components/AboutUsComponents/About';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme/theme';
import RegisterPage from './components/LoginPageComponents/RegisterPage';
import LoginPage from './components/LoginPageComponents/LoginPage';
import LandingPage from './components/LandingPageComponents/LandingPage';
import AdminDashboard from './components/AdminDashboardComponents/AdminDashboard';
import HomePage from './components/HomePageComponents/HomePage';
import ProfilePage from './components/ProfilePageComponents/ProfilePage';
import AddParkingLot from './components/AdminDashboardComponents/AddParkingLot';
import ContactUs from './components/ContactUsComponents/ContactUs';
import AnalyzeHistory from './components/AdminDashboardComponents/AnalyzeHistory';
import Footer1 from './components/Footer/Footer1';
import ResetPassword from './components/LoginPageComponents/ResetPassword';



const App = () => {
    const theme = useMemo(() => createTheme(themeSettings()));
    const styles = {
        root: {
            padding: 0,
            position: "relative"
        }
    }
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container className={styles.root} maxWidth="1300px">
                    <Navbar />
                    <Routes>
                        <Route exact path="/" element={<LandingPage />} />
                        <Route exact path="/register" element={<RegisterPage />} />
                        <Route exact path="/login" element={<LoginPage />} />
                        <Route exact path="/aboutus" element={<AboutUs />} />

                        <Route exact path="/admindb" element={<AdminDashboard />} />


                        <Route exact path="/profile" element={<ProfilePage />} />


                        <Route exact path="/home" element={<HomePage />} />


                        <Route exact path="/addparkingLot" element={<AddParkingLot />} />

                        <Route exact path="/contactus" element={<ContactUs />} />

                        <Route exact path="/analysis" element={<AnalyzeHistory />} />


                        

                        <Route exact path="/resetPassword/:code" element={<ResetPassword />} />
                    </Routes>

                </Container>
                <Footer1 />
            </ThemeProvider>
        </Router>

    )
}

export default App;  