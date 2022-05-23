import React, {useState} from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
const ContributeForm = () => {
    const [contributionAmount, setContributionAmount] = useState(0)
    const handleInputChange = ()=>{
        setContributionAmount(event.target.value)
        console.log(contributionAmount)
    }
    const handleSubmit = () =>{
        event.preventDefault();
    }
  return (
    <Form onSubmit = {handleSubmit}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input label="ether" placeholder="amount" labelPosition="right" onChange={handleInputChange} />
      </Form.Field>
      <Button type="submit" primary>
        Contribute!
      </Button>
    </Form>
  );
};

export default ContributeForm;
