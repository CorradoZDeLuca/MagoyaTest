import React, { useState } from 'react';
import {TextField,Typography,MenuItem ,Select,FormControl ,Popper,ClickAwayListener, Button,IconButton, Paper, InputLabel,Grid} from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation} from '@apollo/react-hooks';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CreditCardIcon from '@material-ui/icons/CreditCard';

const CREATE_TRANSACTION = gql`
  mutation CreateTransaction(   $date: Date,
                                $comment:String,
                                $cost:Float,
                                $cardType:String,) {
    createTransaction(
        date:$date,
        comment:$comment,
        cost:$cost,
        cardType:$cardType) {
      transaction{
          id
      }
    }
  }
`;

export default function CreateTransaction(props){
    const [createTransaction, { data }] = useMutation(CREATE_TRANSACTION);
    const [variables,setVariables] = useState(
                                            {
                                                cardType:"",
                                                comment:null,
                                                date:null,
                                                cost:null,

                                            }
                                        )

    const [anchorEl,setAnchorEl] = useState(null)
    const cardTypes = {"credit":"Credit Card","debit":"Debit Card"}                                      
    function refreshPage() {
        window.location.reload(false);
    }
    const onChangeData = (event) =>{
        setVariables({...variables,[event.currentTarget.id]:event.currentTarget.value })
    }             
    return (
        <div style={{float:"left"}}>
        <Grid container spacing={20} style={{width:"50%",marginLeft:"4%",float:"left",marginTop:"10%",border:"solid"}}>
            <Grid xs={12}>
                <Typography style={{textAlign:"center"}} variant="h4">Create Transaction</Typography>
            </Grid>
            <Grid xs={6}>
                <TextField style={{margin:"5%"}} id="date" variant="outlined" type="date" onChange={onChangeData}/>
            </Grid>
            <Grid xs={6}>
                <FormControl variant="outlined" style={{width:"50%",margin:"5%"}}>
                    <InputLabel>Card Type</InputLabel>
                    <Select onChange={(event)=>setVariables({...variables,cardType:event.target.value})}>
                    <MenuItem value={"credit"}>Credit Card</MenuItem>
                    <MenuItem value={"debit"}>Debit Card</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid xs={6}>
             <TextField style={{margin:"5%"}} id="cost" variant="outlined" label="Cost" onChange={onChangeData}/>
            </Grid>
            <Grid xs={6}>
                <TextField style={{margin:"5%"}} id="comment" variant="outlined" label="Comment" onChange={onChangeData}/>
            </Grid>
            <div style={{width:"100%"}}>
                <Button color="primary" variant="contained" style={{float:"right",margin:"2%"}} onClick={()=>{createTransaction({variables:variables});refreshPage()}}>Create</Button>
            </div>
        </Grid>
        </div>
    )
}