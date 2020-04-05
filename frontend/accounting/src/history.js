import React from 'react';
import {Paper,IconButton,Table,TableBody,TableContainer,TableCell,TableHead,TableRow} from '@material-ui/core';
import gql from 'graphql-tag'
import { useQuery  } from '@apollo/react-hooks';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMutation} from '@apollo/react-hooks';


const ALL_TRANSACTIONS = gql`{
    allTransactions{
      id
      cardType
      comment
      cost
      date
    }  
}
`;
const DELETE_MUTATOR = gql`
  mutation DeleteTransaction($id: Int) {
    deleteTransaction(
        id:$id) {
      account{
        id
      }
    }
  }
`;


export default function TransactonsHistory(props){
    const { loading, error, data } = useQuery(ALL_TRANSACTIONS);
    const [deleteTransaction] = useMutation(DELETE_MUTATOR);

    const MouseOver = (e) => {
     e.currentTarget.style["background-color"] = "rgba(11, 46, 162, 0.12)"
    }
    const MouseLeave = (e) => {
      e.currentTarget.style["background-color"] = "white"

    }

    
    function refreshPage() {
        window.location.reload(false);
    }

    const cardTypes = {"CREDIT":"Credit Card","DEBIT":"Debit Card"}
    if(loading){return "Loading..."}
    if (error) return `Error! ${error}`;
    return(
            <>
                <TableContainer style={{...props.style,overflowY:"scroll",maxHeight:600}}  component={Paper}>
                    <Table stickyHeader aria-label="Transactions History">
                        <TableHead>
                            <TableRow>
                                <TableCell>Card Type</TableCell>
                                <TableCell>Cost</TableCell>
                                <TableCell>Comment</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{backgroundColor:"white"}} >
                            <TableRow>
                            </TableRow>
                            {data.allTransactions.map(transaction=>{return(
                              <> 
                            <TableRow onMouseLeave={(e)=>MouseLeave(e)} onMouseEnter={(e)=>MouseOver(e)} style={{cursor:"pointer"}}>
                                        <TableCell >{cardTypes[transaction.cardType]}</TableCell>
                                        <TableCell >${transaction.cost}</TableCell>
                                        <TableCell >{transaction.comment}</TableCell>
                                        <TableCell >{transaction.date}</TableCell>
                                        <TableCell>                                       
                                            <IconButton onClick={()=>{deleteTransaction({variables:{id:Number(transaction.id)}});refreshPage()}}>
                                                <DeleteIcon color="secondary" />
                                            </IconButton>
                                        </TableCell>
                            </TableRow> 
                              </> ) } ) }                    
                              </TableBody>
                        </Table>
                </TableContainer>
                    
                    
                    </>

        )
                                 
    }
