import React from 'react';
import { useRouter } from 'next/router';
 
const Campaign = () => {
  const router = useRouter();
  const { id } = router.query;
 
  return <h3>Campaign {id}</h3>;
};
 
export default Campaign;
