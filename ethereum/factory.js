import web3 from "./web3";
import CampaignFactory from"./build/CampaignFactory.json"


const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface),
'0x6156f734Dcb3954c4Ea88A6a1370c0798267045A');


export default instance;