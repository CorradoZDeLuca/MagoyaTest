import React from 'react';
import TransactonsHistory from "./history"
import AccountBalance from "./AccountBalance"
import CreateTransaction from "./createTransaction"
import gql from 'graphql-tag'
import { useQuery  } from '@apollo/react-hooks';

const ACCOUNT = gql`{
    account{
      value
    }  
}
`;

export default function AppContainer(){
    const {data,loading,error} = useQuery(ACCOUNT)
    if(error){return error}
    if(loading){return "...Loading"}
    return(
        <div>
            <AccountBalance data={data} />
            <TransactonsHistory style={{width:"50%",float:"right"}} />
            <CreateTransaction accountBalance={data.account.value} />
        </div>
    )
}