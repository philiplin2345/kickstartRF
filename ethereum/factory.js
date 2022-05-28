import web3 from "./web3";
import CampaignFactory from"./build/CampaignFactory.json"


const instance = new web3.eth.Contract(CampaignFactory.abi,
'0x1B9B15503a7643bb4815D227d148485350Cce8e8');


export default instance;