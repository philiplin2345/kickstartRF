import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import Link from 'next/link';
import web3 from '../../../../ethereum/web3';
import Campaign from '../../../../ethereum/campaign';

const RequestIndex = (props) => {
    const header = (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Recipient</Table.HeaderCell>
            <Table.HeaderCell>Approval Count</Table.HeaderCell>
            <Table.HeaderCell>Approve </Table.HeaderCell>
            <Table.HeaderCell>Finalize</Table.HeaderCell>
            <Table.HeaderCell>Header</Table.HeaderCell>
            <Table.HeaderCell>Header</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      )
      const body = (
        <Table.Body>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
        </Table.Body>
      )
      

    return (
        <>
            
            <div>{props.address} requests</div>
            <Link href={`/campaigns/${props.address}/requests/new`} >
                <a>
                    <Button primary >Add Request</Button>
                </a>
            </Link>
            <Table attached='top' basic>
                {header}
                {body}
            </Table>
        </>
    )
}

export async function getServerSideProps(context) {
    console.log(context.query.id);
    const address = context.query.id;
    console.log(context);
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();

    const requests = await Promise.all(
        Array(parseInt(requestCount)).fill().map((element, index) => {
            return campaign.methods.requests(index).call();
        })
    );
    console.log(requests)
    // const cp = EthCp(context.query.id);
    // const summary = await cp.methods.getSummary().call();
    return {
        props: {
            address: address
            // minimumContribution: summary[0],
            // balance: summary[1],
            // requestsCount: summary[2],
            // approversCount: summary[3],
            // manager: summary[4],
        },
    };
}


export default RequestIndex