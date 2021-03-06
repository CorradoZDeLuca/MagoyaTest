import React, { useState } from 'react';
import {TextField,Typography,MenuItem ,Select,FormControl ,Popper, Button,IconButton, Paper, InputLabel,Grid} from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation} from '@apollo/react-hooks';
import InfoIcon from '@material-ui/icons/Info';
import ErrorIcon from '@material-ui/icons/Error';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

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
    const [alert,setShowAlert] = useState({isOpen:false,message:""})
    const onChangeData = (event) =>{
        setVariables({...variables,[event.currentTarget.id]:event.currentTarget.value })
    }             
    const onCreate = () => {
        if(variables.cardType  && variables.date && (props.accountBalance - variables.cost >= 0)){
            setShowAlert({isOpen:true,message:"You Have Create a new transaction! Reload The table",variant:"success"})
            setTimeout(function(){setShowAlert({isOpen:false})}, 2000)
            createTransaction({variables:variables})
        }else{
            setShowAlert({isOpen:true,message:"Remeber that all inputs are require! and balance must be positve",variant:"error"})
            setTimeout(function(){setShowAlert({isOpen:false})}, 2000)
        }


    }
    return (
        <div style={{textAlign:"left",width:"40%",positon:"absolute"}}>

        <Grid container spacing={20} style={{marginLeft:"4%",float:"left",marginTop:"10%",border:"solid"}}>
            <Grid xs={12}>
                <IconButton onMouseOver={event => setAnchorEl(event.currentTarget)} onMouseLeave={()=>setAnchorEl(null)}>
                    <InfoIcon />
                </IconButton>
                <Typography style={{textAlign:"center"}} variant="h4">Create Transaction</Typography>
            </Grid>
            <Grid xs={6}>
                <TextField style={{margin:"5%"}} id="date" variant="outlined" type="date" onChange={onChangeData}/>
            </Grid>
            <Grid xs={6}>
                <FormControl variant="outlined" style={{width:200,margin:"5%"}}>
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
    {alert.isOpen ?   <Paper style={{position:"absolute",padding:"1%",color:alert.variant == "success" ? "green" : "red"}} >{alert.variant == "error" ? <ErrorIcon style={{margin:"1%"}}/> : <DoneOutlineIcon style={{margin:"1%"}} />}{alert.message}</Paper> : null}
                <Button color="primary" variant="contained" style={{float:"right",margin:"2%"}} onClick={()=>{onCreate()}}>Create</Button>
            </div>
        </Grid>
        <Popper anchorEl={anchorEl} open={Boolean(anchorEl)} placement="top">
            <Paper style={{pading:"2%"}}>
                <Typography>Remember to add an account balance, also the transaction cost must be above zero</Typography>
            </Paper>
        </Popper>
        </div>
    )
}