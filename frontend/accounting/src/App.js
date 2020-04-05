import React,{useState,useEffect,useRef} from 'react';
import {Paper,Typography,Popper,ClickAwayListener,Button,MenuItem,Table,TableBody,TableContainer,TableCell,TableHead,TableRow} from '@material-ui/core';
import gql from 'graphql-tag'
import { useQuery  } from '@apollo/react-hooks';
import TransactonsHistory from "./history"
import AccountBalance from "./AccountBalance"
import CreateTransaction from "./createTransaction"
export default function AppContainer(){
    return(
        <>
        <AccountBalance />
        <TransactonsHistory style={{width:"50%",float:"right"}} />
        <CreateTransaction />
        </>
    )
}