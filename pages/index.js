import React, { useState, useEffect } from 'react'
import factory from '../ethereum/factory'
import { Card, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

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
                <a>View Campaign</a>,
            fluid: true
        };
    })

    const allCampaigns = <Card.Group items={allCampaignsItems} />

    return (
        <div>
            {allCampaigns}
            <Button content = 'Create Campaign' icon ='add circle' primary></Button>
        </div>
    )
}


Index.getInitialProps = async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
}

export default Index