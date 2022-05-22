import React from 'react';
import { useRouter } from 'next/router';
import EthCp from '../../../ethereum/campaign'

const Campaign = (props) => {
    const router = useRouter();
    const { id } = router.query;
    const jsonData = JSON.parse(props.jsonSummary);
    console.log(jsonData[0]);
    console.log(jsonData[1]);
    console.log(jsonData[2]);
    console.log(jsonData[3]);
    console.log(jsonData[4]);
    // console.log(props.summary)
    return <h3>Campaign {id}</h3>;
};


export async function getServerSideProps(context) {
    console.log(context.query.id);
    const cp = EthCp(context.query.id);
    const summary = await cp.methods.getSummary().call();
    console.log (JSON.stringify(summary))
    const jsonSummary= JSON.stringify(summary)
    return { props: { jsonSummary } };
}

export default Campaign;
