import React from 'react'
import { Button, Form } from 'semantic-ui-react'


const CampaignNew = () => {
    return (
        <Form>
            <h3>Create a Campaign!</h3>
            <Form.Field>
                <label>Minimum Contribution</label>
                <input placeholder='in wei' />
            </Form.Field>
            
           
            <Button type='submit' primary>Create</Button>
        </Form>
    )
}

export default CampaignNew