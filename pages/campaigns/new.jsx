import React, { useState } from 'react'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'


const CampaignNew = () => {
    const [minContribution, setMinContribution] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const handleMinContributionChange = () => {
        setMinContribution(event.target.value);
    }

    const submitForm = async () => {
        event.preventDefault();
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(minContribution)
                .send({
                    from: accounts[0]
                });
        } catch (error) {
            setErrorMessage(error.message);
        }
        setMinContribution(0);

    };

    return (
        <Form onSubmit={submitForm} error={errorMessage?true:false}>
            <h3>Create a Campaign!</h3>
            <Form.Field>
                <label>Minimum Contribution</label>
                <Input label='wei' placeholder='amount' labelPosition='right' onChange={handleMinContributionChange} />
            </Form.Field>

            <Message
                error
                header='There was some errors with your submission'
                content = {errorMessage}
            />
            <Button type='submit' primary>Create</Button>
        </Form>
    )
}

export default CampaignNew