import React, {useState} from 'react';
import { useRouter } from 'next/router';
import EthCp from '../../../ethereum/campaign'
import { Card } from 'semantic-ui-react';
import ContributeForm from '../../../components/ContributeForm';

const Campaign = (props) => {
    const [campaignStats, setCampaignStats] = useState({
        minimumContribution:   props.minimumContribution,
        balance: props.balance,
        requestsCount: props.requestsCount,
        approversCount: props.approversCount,
        manager:props.manager
    })

    
    const statKeys = Object.keys(campaignStats);
    console.log(statKeys);
    statKeys.forEach((key, index) => {
        console.log(`${key}: ${campaignStats[key]}`);
    });
    let cardItems = []
    statKeys.forEach((key, index) =>{
        cardItems.push({header: campaignStats[key],
        description: `The contents for ${key}`,
        meta: key,
        style: {overflowWrap: 'break-word'}})
      });
    console.log(cardItems)
    const router = useRouter();
    const { id } = router.query;
    console.log(props.minimumContribution);
    console.log(props.balance);
    console.log(props.requestsCount);
    console.log(props.approversCount);
    console.log(props.manager);
    // console.log(props.summary)
    return <><h3>Campaign {id}</h3><Card.Group items={cardItems} /><ContributeForm></ContributeForm></>;
};


export async function getServerSideProps(context) {
    console.log(context.query.id);
    const cp = EthCp(context.query.id);
    const summary = await cp.methods.getSummary().call();
    return { props: { minimumContribution:summary[0], balance: summary[1], requestsCount: summary[2],
    approversCount: summary[3], manager: summary[4]} };
}

export default Campaign;
