import React, { useState } from 'react'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import { useRouter } from "next/router";


const CampaignNew = () => {
    const [minContribution, setMinContribution] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [isProcessingTx, setIsProcessingTx] = useState(false);

    const router = useRouter();

    const handleMinContributionChange = () => {
        setMinContribution(event.target.value);
    }

    const submitForm = async () => {
        event.preventDefault();
        setIsProcessingTx(true);
        setErrorMessage('');
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(minContribution)
                .send({
                    from: accounts[0]
                });
                router.push('/');
        } catch (error) {
            setErrorMessage(error.message);
        }
        setMinContribution(0);
        setIsProcessingTx(false);

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
            <Button type='submit' primary loading={isProcessingTx}>Create</Button>
        </Form>
    )
}

export default CampaignNew