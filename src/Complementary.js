import {Button, Container, Grid, makeStyles, MenuItem, Paper, Select, Snackbar, Typography} from "@material-ui/core";
import React, {useContext, useEffect, useState} from 'react';
import {creeOperations} from "./utils";
import {OperationList} from "./OperationList";
import {ComplementaryContext} from "./ComplementaryContext";
import MuiAlert from '@material-ui/lab/Alert';
import {Bravo} from "./Bravo";

const tables = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const operationsResults = new Map();

const Complementary = () => {
    const [table, setTable] = useState('');
    const [operations, setOperations] = useState([]);
    const [result, setResult] = useState(0);
    const [msgResult, setMsgResult] = useState('');
    const [showResultError, setShowResultError] = useState(false);

    const {showResult, setShowResult} = useContext(ComplementaryContext);

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            minWidth: 450
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));

    const classes = useStyles();

    const handleChangeComplementary = (event) => {
        setTable(event.target.value);
    }

    const handleInit = () => {
        setTable('');
        setOperations([]);
        setShowResult(false);
        operationsResults.clear()
    }

    const handleShowResult = () => {
        if (operations.length === operationsResults.size) {
            setShowResult(true)
        } else {
            setShowResultError(true)
        }
    }

    const updateOperationsResults = (key, result) => {
        operationsResults.set(key, result);
        setResult(Math.trunc(Array.from(operationsResults.values()).filter(r => r).length / operations.length * 100));
    }

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const closeResultError = () => {
        setShowResultError(false)
    }

    useEffect(() => {
        if (table === '') {
            handleInit();
        } else {
            setOperations(creeOperations(table))
        }
    }, [table])

    useEffect(() => {
        if (result === 100) {
            setMsgResult('Bravo !!!');
        } else if (result < 90) {
            setMsgResult('Essaye encore !');
        } else if (result >= 90) {
            setMsgResult('Bravo ! - Essaye encore !');
        }
    }, [result])

    return (
        <Container className={classes.root}>
            {
                showResult &&
                <Bravo style={{zIndex: '100'}}>
                    <Typography variant={"h4"} color={"error"}>
                        Voici ton résultat {result}%
                    </Typography>
                    <Typography variant={"h4"} color={"error"}>
                        {msgResult}
                    </Typography>
                </Bravo>
            }
            <Snackbar open={showResultError} autoHideDuration={6000} onClose={closeResultError}>
                <Alert onClose={closeResultError} severity="error">
                    Il faut donner toutes les réponses
                </Alert>
            </Snackbar>

            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid item>
                        <Typography variant={"h4"}>Complémentaires</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={"h4"}>entre 0 et </Typography>
                    </Grid>
                    <Grid item>
                        <Select onChange={handleChangeComplementary} value={table}>
                            <MenuItem>
                                <Typography variant={"h5"}/>
                            </MenuItem>
                            {tables.filter(t => t >= 0).map(table =>
                                <MenuItem key={table} value={table}>
                                    <Typography variant={"h5"}>{table}</Typography>
                                </MenuItem>
                            )}
                        </Select>
                    </Grid>
                </Grid>
            </Paper>
            {
                operations.length > 0 &&
                <Paper className={classes.paper}>
                    <OperationList operations={operations} notifyResult={updateOperationsResults}/>
                </Paper>
            }
            {
                operations.length > 0 &&
                <Paper style={{padding: 10}}>
                    <Grid container wrap="nowrap" spacing={5}>
                        <Grid item>
                            <Button variant="outlined" onClick={handleShowResult}>
                                résultat
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" onClick={handleInit}>
                                recommencer
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            }
        </Container>
    );
}

export default Complementary;
