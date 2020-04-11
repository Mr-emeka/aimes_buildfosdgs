import React from 'react';
import { Button } from 'element-react';

function MyButton({ loading,handleSubmit}) {
  return <Button data-go-estimate type="primary" onClick={handleSubmit} loading={loading}>Estimate</Button>
}
export default MyButton;
