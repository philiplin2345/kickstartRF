import React, { useState } from 'react';
import { Form, Button, Messaage, Input } from 'semantic-ui-react';
import Campaign from '../../../../ethereum/campaign';
import web3 from '../../../../ethereum/web3';
import Link from 'next/link';

const RequestNew = (props) => {

    const [descriptionInput, setDescriptionInput] = useState('');
    const [valueInput, setValueInput] = useState('');
    const [recipientInput, setRecipientInput] = useState('');
    return (
        <>
            <h3>Create a Request</h3>
            <Form>
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
                <Button primary> Create!! </Button>
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