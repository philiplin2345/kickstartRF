import React, {useState} from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign  from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { useRouter } from "next/router";

const ContributeForm = (props) => {
    const [contributionAmount, setContributionAmount] = useState(0)
    const [errorMessage, setErrorMessage] = useState('');
    const [isProcessingTx, setIsProcessingTx] = useState(false);
    const router = useRouter();

    const handleInputChange = ()=>{
        setContributionAmount(event.target.value)
        console.log(contributionAmount)
    }
    const handleSubmit = async (event) =>{
        event.preventDefault();
        const campaign = new Campaign(props.address);
        console.log(campaign);
        setIsProcessingTx(true);
        setErrorMessage('');
        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from:accounts[0],
                value: web3.utils.toWei(contributionAmount,'ether')
            });
            setContributionAmount(0);
            router.reload(`/campaigns/${props.address}`)
        }catch(error){
          setErrorMessage(error.message);
        }
        setIsProcessingTx(false);
        setContributionAmount(0);
    }
    console.log(`props address is ${props.address}`)
  return (
    <Form onSubmit = {handleSubmit} error = {!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input label="ether" placeholder="amount" labelPosition="right" onChange={handleInputChange} />
      </Form.Field>
      <Message
                error
                header='There was some errors with your submission'
                content = {errorMessage}
            />
      <Button type="submit" primary loading = {isProcessingTx}>
        Contribute!
      </Button>
    </Form>
  );
};

export default ContributeForm;
