import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CryptoState } from '../../CryptoContex';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Table, Container, TextField, Typography , TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const Dashboard = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState();


    const { currency } = CryptoState();
    const navigate = useNavigate();

    const { data, isFetching } = useGetCryptosQuery();
    console.log('data',data)

    const darkTheme = createTheme({
        palette: {
            primary: {
            main: "#fff",
        },
            type: "dark",
        },
    });

    const handleSearch = () => {
        return coins.filter((coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.sym.toLowerCase().includes(search)
        );
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Container 
                style={{ textAlign: 'center', margin: 15 }}>
                <Typography>
                    Cryptocurrency Prices
                </Typography>
                <TextField 
                    label='Search...' 
                    variant='outlined'
                    style={{ marginBottom: 20, width: '100%' }}
                    onChange={(event)=> setSearch(event.target.value)} />
                    <TableContainer>
                        { loading ? (
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                        ) : (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {['Coin', 'Price', '24h Chande', 'Market Cap'].map((head) => (
                                            <TableCell
                                            style={{
                                            color: "black",
                                            fontWeight: "700",
                                            }}
                                            key={head}
                                            align={head === "Coin" ? "" : "right"}
                                            >
                                            {head}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {handleSearch().map((row) => {
                                        const profit = row.price_change_parcentage_24h > 0;
                                        return (
                                            <TableRow
                                                onClick={() => navigate(`/coins/${row.id}`)}
                                                key={row.name}
                                            >
                                                <TableCell 
                                                    component='th' 
                                                    scope='row'
                                                    style={{
                                                        display: 'flex',
                                                        gap: 15,
                                                    }}
                                                    >
                                                    <img
                                                        src={row?.image}
                                                        alt={row.name}
                                                        height="50"
                                                        style={{ marginBottom: 10 }}
                                                    />
                                                    <div
                                                        style={{ display: "flex", flexDirection: "column" }}>
                                                        <span
                                                        style={{
                                                            textTransform: "uppercase",
                                                            fontSize: 22,
                                                        }}
                                                        >
                                                        {row.symbol}
                                                        </span>
                                                        <span style={{ color: "darkgrey" }}>
                                                        {row.name}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        )}
                    </TableContainer>
            </Container>
        </ThemeProvider>
    );
}

export default Dashboard;