import React from 'react'
import {Form,Input,Message,Button} from 'semantic-ui-react'
const ContributeForm = () => {
  return (
    <Form >
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input label='ether' placeholder='amount' labelPosition='right'  />
            </Form.Field>
            <Button type='submit' primary>Contribute!</Button>
    </Form>
  )
}

export default ContributeForm