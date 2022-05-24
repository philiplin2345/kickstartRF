import React, { useState } from 'react';
import { Form, Button, Messaage, Input } from 'semantic-ui-react';
import Campaign from '../../../../ethereum/campaign';
import web3 from '../../../../ethereum/web3';
import Link from 'next/link';

const RequestNew = (props) => {

    const [descriptionInput, setDescriptionInput] = useState('');
    const [valueInput, setValueInput] = useState(0);
    const [recipientInput, setRecipientInput] = useState('');
    const submitNewRequest = async (event) => {
        event.preventDefault();
        const campaign = Campaign(props.address);
        console.log(descriptionInput, web3.utils.toWei(valueInput, 'ether'), recipientInput)
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(
                descriptionInput, web3.utils.toWei(valueInput, 'ether'), recipientInput
            ).send({ from: accounts[0] });
        } catch (error) {

        }
    }
    return (
        <>
            <h3>Create a Request</h3>
            <Form onSubmit={submitNewRequest}>
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
                <Button primary type='submit'> Create!! </Button>
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