import React, { useState, useEffect } from 'react'
import factory from '../ethereum/factory'
import { Card, Button } from 'semantic-ui-react'
import Link from 'next/link'

const Index = (props) => {



    useEffect(() => {
        let campaigns;
        const getCampaigns = async () => {
            campaigns = await factory.methods.getDeployedCampaigns().call();
            console.log(campaigns)
        }
        getCampaigns()

    }, [])

    const allCampaignsItems = props.campaigns.map(address => {
        return {
            header: address,
            description:
                <Link href = {`/campaigns/${address}`}>
                <a>View Campaign</a>
                </Link>,
            fluid: true
        };
    })

    const allCampaigns = <Card.Group items={allCampaignsItems} />

    return (
        <div>
            <h3>Open campaigns</h3>
            <Link href = "/campaigns/new" >
            <a>
            <Button content='Create Campaign' icon='add circle' primary floated='right'></Button>
            </a>
            </Link>
            {allCampaigns}
        </div>
    )
}


Index.getInitialProps = async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
}

export default Index