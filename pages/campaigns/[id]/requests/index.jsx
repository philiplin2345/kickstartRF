import React from 'react';
import { Button } from 'semantic-ui-react';
import  Link  from 'next/link';

const RequestIndex = (props) => {
    return (
        <>
        <div>{props.address} requests</div>
        <Link href={`/campaigns/${props.address}/requests/new`} >
            <a>
                <Button primary >Add Request</Button>
            </a>
        </Link>
        </>
    )
}

export async function getServerSideProps(context) {
    console.log(context.query.id);
    console.log(context);
    // const cp = EthCp(context.query.id);
    // const summary = await cp.methods.getSummary().call();
    return {
        props: {
            address: context.query.id
            // minimumContribution: summary[0],
            // balance: summary[1],
            // requestsCount: summary[2],
            // approversCount: summary[3],
            // manager: summary[4],
        },
    };
}


export default RequestIndex