const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CampaignFactory.json")
const compiledCampaign = require("../ethereum/build/Campaign.json")


let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(
    async ()=>{
        accounts = await web3.eth.getAccounts();
    
        let newBalance = await web3.eth.getBalance(accounts[9]);
        factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({data:compiledFactory.evm.bytecode.object})
        .send({from:accounts[0],gas:3000000});


         await factory.methods.createCampaign('100').send({from:accounts[0],gas:3000000});
         [campaignAddress] = await factory.methods.getAllCampaigns().call();//es6 notation of getting the first member of the array

         campaign = await new web3.eth.Contract(compiledCampaign.abi,campaignAddress);
    }
)

describe('Campaigns',()=>{
    it('deploys a factory and campaign',()=>{
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });
    it('marks caller as campaign owner', async ()=>{
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0],manager);
    })
    it('allows people to contribute and marks them as approvers', async ()=>{
        await campaign.methods.contribute().send({
            from:accounts[1],value:'200', gas:1000000
        })
        const isfirstapprover= await campaign.methods.approvers(accounts[1]).call();
        assert(isfirstapprover);
    })

    it('requires a minimum contribution', async ()=>{
        try{
        await campaign.methods.contribute().send({
            from:accounts[1],value:'10', gas:1000000
        })
        assert(false)
        } catch(error){
            assert.ok(error);
        }
       
    })

    it('requires the person to make requests be the owner', async ()=>{
        try{
        await campaign.methods.createRequest("buy stuff",12345678 ,accounts[9]).send({
            from:accounts[1], gas:1000000
        });

        assert(false);
        } catch(error){
            assert.ok(error);
        }
       
    })

    it('allows manager to create a payment request', async ()=>{
 
        await campaign.methods.createRequest("buy stuff",12345678 ,accounts[9]).send({
            from:accounts[0], gas:1000000
        });
        const rq = await campaign.methods.requests(0).call();
        assert.equal(rq.description,"buy stuff");
        assert.equal(rq.value,"12345678");
        assert.equal(rq.recipient,accounts[9]);
    })

    it('can successfully run a campaign', async ()=>{
        
        let oldBalance = await web3.eth.getBalance(accounts[9]);
        console.log(oldBalance);
        oldBalance = web3.utils.fromWei(oldBalance,'ether');
        oldBalance = parseFloat(oldBalance);

        await campaign.methods.createRequest("buy shtloads of stufff", web3.utils.toWei('5','ether') ,accounts[9]).send({
            from:accounts[0], gas:1000000
        });
        
        await campaign.methods.contribute().send({
            from: accounts[1], value: web3.utils.toWei('1','ether')
        });

        await campaign.methods.contribute().send({
            from: accounts[2], value: web3.utils.toWei('1','ether')
        });
        await campaign.methods.contribute().send({
            from: accounts[3], value: web3.utils.toWei('1','ether')
        });
        await campaign.methods.contribute().send({
            from: accounts[4], value: web3.utils.toWei('1','ether')
        });
        await campaign.methods.contribute().send({
            from: accounts[5], value: web3.utils.toWei('1','ether')
        });
        await campaign.methods.contribute().send({
            from: accounts[6], value: web3.utils.toWei('1','ether')
        });

        await campaign.methods.approveRequest(0).send({
            from: accounts[1], gas:1000000
        })
        await campaign.methods.approveRequest(0).send({
            from: accounts[2], gas:1000000
        })
        await campaign.methods.approveRequest(0).send({
            from: accounts[3], gas:1000000
        })
        await campaign.methods.approveRequest(0).send({
            from: accounts[4], gas:1000000
        })

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0], gas:1000000
        });

        let newBalance = await web3.eth.getBalance(accounts[9]);
        console.log(newBalance);
        newBalance = web3.utils.fromWei(newBalance,'ether');
        newBalance = parseFloat(newBalance);

        console.log(newBalance);
        assert(Math.abs(newBalance-oldBalance)>4.998);
    })

})