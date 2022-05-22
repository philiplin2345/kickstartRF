import React, {useState} from 'react'
import { Button, Form,Input } from 'semantic-ui-react'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'


const CampaignNew = () => {
    const[minContribution, setMinContribution] = useState(0);

    const handleMinContributionChange = ()=>{
        setMinContribution(event.target.value);
    }

    const submitForm = async () =>{
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        await factory.methods.createCampaign(minContribution)
        .send({
            from: accounts[0]
        });
        setMinContribution(0);

    };

    return (
        <Form onSubmit = {submitForm}>
            <h3>Create a Campaign!</h3>
            <Form.Field>
                <label>Minimum Contribution</label>
                <Input label='wei' placeholder='amount' labelPosition='right' onChange={handleMinContributionChange} />
            </Form.Field>
            
           
            <Button type='submit' primary>Create</Button>
        </Form>
    )
}

export default CampaignNew