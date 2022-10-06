import React from 'react';
import { AppBar, Container, Toolbar, Typography ,Box, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import { CryptoState } from '../../CryptoContex';

const darkTheme = createTheme({
    palette: {
        primary: {
        main: "#fff",
    },
        type: "dark",
    },
});

const Header = () => {
    const navigate = useNavigate();
    const { currency, setCurrency } = CryptoState();

    return (
    <ThemeProvider theme={darkTheme}>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Container>
                    <Toolbar>
                        <Typography 
                            onClick={() => navigate(`/`)}
                            style={titleStyle}>
                            Crypto App
                        </Typography>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={currency}
                            style={{ width: 100, marginLeft: 15 }}
                            onChange={(event) => setCurrency(event.target.value)}
                            >
                                <MenuItem value={"USD"}>USD</MenuItem>
                                <MenuItem value={"EUR"}>EUR</MenuItem>
                            </Select>
                        </FormControl>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    </ThemeProvider>
    );
}

const titleStyle = {
    flex: '1',
    color: 'rgb(225, 174, 6)',
    fontSize: '7vh',
    fontWeight: 'bold',
}

export default Header;