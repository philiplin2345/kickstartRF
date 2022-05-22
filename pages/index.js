import React, {useState, useEffect} from 'react'
import factory from '../ethereum/factory'

const Index = (props) => {



    useEffect(()=>{
        let campaigns;
        const getCampaigns = async ()=>{
            campaigns = await factory.methods.getDeployedCampaigns().call();
            console.log(campaigns)
        }
        getCampaigns()

    },[])

  return (
    <div>{props.campaigns[0]}</div>
  )
}


Index.getInitialProps = async ()=> {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return {campaigns};
}

export default Index