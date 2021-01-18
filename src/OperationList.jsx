import {GridList, GridListTile} from "@material-ui/core";
import Operation from "./Operation";
import React from "react";
import PropTypes from "prop-types";

export const OperationList = (props) => {
    return (
        <GridList cols={0} spacing={35} cellHeight={90}>
            {props.operations.map(op => (
                <GridListTile key={op.key} >
                    <Operation id={op.key}
                               op1={op.op1}
                               op2={op.op2}
                               operation={op.operation}
                               notifyResult={props.notifyResult} />
                </GridListTile>
            ))}
        </GridList>
    )
}

OperationList.propTypes = {
    operations: PropTypes.array,
    notifyResult: PropTypes.func,
}