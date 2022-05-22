import React, {useState} from 'react'
import { Button, Form,Input } from 'semantic-ui-react'


const CampaignNew = () => {
    const[minContribution, setMinContribution] = useState(0);

    const handleMinContributionChange = ()=>{
        setMinContribution(event.target.value);
    }



    return (
        <Form>
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