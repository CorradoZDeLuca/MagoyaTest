import React, { useState } from 'react';
import {TextField,Button,Typography,Divider, IconButton} from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation} from '@apollo/react-hooks';
import {Link} from "react-router-dom"
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

const EDIT_ACCOUNT = gql`
  mutation EditAccount(   $value: Float) {
    editAccount(
        value:$value) {
      account{
          value
      }
    }
  }
`;

export default function EditAccount(props){
    const [editAccount, { data }] = useMutation(EDIT_ACCOUNT);
    const [variables,setVariables] = useState(
                                            {
                                                value:null,
                                            }
                                        )


  function refreshPage() {
    window.location.reload(false);
  }
    const onChangeData = (event) =>{
        setVariables({...variables,[event.currentTarget.id]:event.currentTarget.value })
    }             
    return (
        <div style={{padding:"4%"}}>
            <div style={{float:"right",marginLeft:"5%"}}>
                    <CancelIcon style={{color:"red"}} onClick={()=>props.onClose()} />
         
                    <CheckCircleIcon  style={{color:"green"}} onClick={()=>{editAccount({variables:variables});refreshPage()}} />
            </div>
            <TextField id="value" variant="outlined" label="Value" onChange={onChangeData}/>
        </div>
    )
}