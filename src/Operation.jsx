import PropTypes from 'prop-types';
import {Grid, TextField, Typography} from "@material-ui/core";
import React, {useContext, useEffect, useState} from "react";
import {ComplementaryContext} from "./ComplementaryContext";


const Operation = (props) => {
    const [result, setResult] = useState("");
    const [color, setColor] = useState("textPrimary");
    const [valid, setValid] = useState(true);

    const {showResult} = useContext(ComplementaryContext);

    const handleChange = (event) => {
        setResult(event.target.value)
    }

    const handleFocus = (event) => {
        event.target.select()
    }

    const verify = () => {
        let total;
        if (result === "") {
            setColor("textPrimary");
            return
        }
        switch (props.operation) {
            case "+":
                total = props.op1 + props.op2;
                break;
            case "-":
                total = props.op1 - props.op2;
                break;
            default:
        }
        let isValid = total === parseInt(result);
        setValid(isValid)
        props.notifyResult(props.id, isValid)
    }

    useEffect(() => {
        if (showResult) {
            setColor(valid ? 'textPrimary' : 'error')
        }
    }, [showResult, valid])

    return (
        <>
            <Grid container spacing={1} style={{ padding: 1 }}>
                <Grid item>
                    <Typography variant={"h3"} color={color} gutterBottom={true}>
                        {props.op1} {props.operation} {props.op2} {'='}
                    </Typography>
                </Grid>
                <Grid item>
                    <TextField
                        variant={"outlined"}
                        value={result}
                        onBlur={verify}
                        onChange={handleChange}
                        onFocus={handleFocus} size={"medium"} style={{ width: 50 }}/>
                </Grid>
            </Grid>
        </>
    )
}

Operation.propTypes = {
    id: PropTypes.string,
    op1: PropTypes.number,
    op2: PropTypes.number,
    operation: PropTypes.oneOf(['+', '-']),
    notifyResult: PropTypes.func
}

export default Operation;