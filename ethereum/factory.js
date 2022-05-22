import web3 from "./web3";
import CampaignFactory from"./build/CampaignFactory.json"


const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface),
'0xA02979B8095d1AD726aD316c9FC96Ae5523e33CF');


export default instance;