import React from 'react';
import ReactDOM from 'react-dom';
import Complementary from './Complementary';
import {ComplementaryProvider} from "./ComplementaryContext";
import {bounceInDown} from "react-animations";
import styled, {keyframes} from "styled-components";
import {App} from "./App";

export const Bounce = styled.div`animation: 5s ${keyframes`${bounceInDown}`} infinite`;

ReactDOM.render(
    <React.StrictMode>
        <App>
            <ComplementaryProvider>
                <Complementary/>
            </ComplementaryProvider>
        </App>
    </React.StrictMode>,
    document.getElementById('root')
);
