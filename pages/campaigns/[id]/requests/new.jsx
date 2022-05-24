import React, { useState } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../../ethereum/campaign';
import web3 from '../../../../ethereum/web3';
import Link from 'next/link';
import { useRouter } from "next/router";

const RequestNew = (props) => {

    const [descriptionInput, setDescriptionInput] = useState('');
    const [valueInput, setValueInput] = useState(0);
    const [recipientInput, setRecipientInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isProcessingTx, setIsProcessingTx] = useState(false);
    const router = useRouter();
    const submitNewRequest = async (event) => {
        setIsProcessingTx(true);
        setErrorMessage('');
        event.preventDefault();
        const campaign = Campaign(props.address);
        console.log(descriptionInput, web3.utils.toWei(valueInput, 'ether'), recipientInput)
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(
                descriptionInput, web3.utils.toWei(valueInput, 'ether'), recipientInput
            ).send({ from: accounts[0] });
            router.reload(`/campaigns/${props.address}/requests`)
        } catch (error) {
            setErrorMessage(error.message);
        }
        setDescriptionInput('')
        setValueInput(0)
        setRecipientInput('')
        setIsProcessingTx(false);
    }
    return (
        <>
            <Link href={`/campaigns/${props.address}/requests`} >
                <a>
                    Back
                </a>
            </Link>
            <h3>Create a Request</h3>
            <Form onSubmit={submitNewRequest} error={errorMessage ? true : false}>
                <Form.Field>
                    <label>Description</label>
                    <Input value={descriptionInput} onChange={e => setDescriptionInput(e.target.value)}></Input>
                </Form.Field>
                <Form.Field>
                    <label>Value</label>
                    <Input value={valueInput} onChange={e => setValueInput(e.target.value)}></Input>
                </Form.Field>
                <Form.Field>
                    <label>Recipient</label>
                    <Input value={recipientInput} onChange={e => setRecipientInput(e.target.value)}></Input>
                </Form.Field>
                <Message
                    error
                    header='There was some errors with your submission'
                    content={errorMessage}
                />
                <Button primary type='submit' loading={isProcessingTx}> Create!! </Button>
            </Form>
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


export default RequestNew