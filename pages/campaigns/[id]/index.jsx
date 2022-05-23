import React from 'react';
import { useRouter } from 'next/router';
import EthCp from '../../../ethereum/campaign'

const Campaign = (props) => {
    const router = useRouter();
    const { id } = router.query;
    console.log(props.minimumContribution);
    console.log(props.balance);
    console.log(props.requestsCount);
    console.log(props.approversCount);
    console.log(props.manager);
    // console.log(props.summary)
    return <h3>Campaign {id}</h3>;
};


export async function getServerSideProps(context) {
    console.log(context.query.id);
    const cp = EthCp(context.query.id);
    const summary = await cp.methods.getSummary().call();
    return { props: { minimumContribution:summary[0], balance: summary[1], requestsCount: summary[2],
    approversCount: summary[3], manager: summary[4]} };
}

export default Campaign;
