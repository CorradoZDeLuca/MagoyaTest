import React,{useState,useEffect,useRef} from 'react';
import {Paper,Typography,Popper,ClickAwayListener,IconButton,MenuItem,Table,TableBody,TableContainer,TableCell,TableHead,TableRow} from '@material-ui/core';
import gql from 'graphql-tag'
import { useQuery  } from '@apollo/react-hooks';
import EditIcon from '@material-ui/icons/Edit';
import EditAccount from "./editAccountValue"

const ACCOUNT = gql`{
    account{
      value
    }  
}
`
export default function AccountBalance (props){
    const {data,loading,error} = useQuery(ACCOUNT)
    const [anchorEl,setAnchorEl] = useState(null)
    if(error){return error}
    if(loading){return "...Loading"}
    const handleOpenEditor = (event) => {
        setAnchorEl(event.currentTarget)
    }
    return(
        <>
        <Paper style={{width:"30%",float:"left",marginLeft:"10%",backgroundColor:"rgba(63,199,9,0.49)",color:"white"}}>
            <Typography variant="h5" style={{textAlign:"center",marginTop:"2%"}}>Account Balance</Typography>
            <Typography variant="h6" style={{textAlign:"center"}}>
                ${data.account.value} <IconButton onClick={handleOpenEditor} style={{float:"right"}}><EditIcon /></IconButton>
            </Typography>
        </Paper>
        <Popper open={Boolean(anchorEl)} anchorEl={anchorEl}>
            <ClickAwayListener onClickAway={()=>setAnchorEl(null)}>
                <Paper>
                    <EditAccount onClose={()=>{setAnchorEl(null)}}/>
                </Paper>
            </ClickAwayListener>
        </Popper>
        </>
    )
}