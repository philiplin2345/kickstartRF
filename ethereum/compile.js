const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname,'contracts','0813Campaign.sol');
const source = fs.readFileSync(campaignPath,'utf-8');

const input = {
    language: 'Solidity',
    sources: {
      'AllCampaign.sol': {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input)));


fs.ensureDirSync(buildPath);
console.log(output);

fs.outputJSONSync(
    path.resolve(buildPath,'Campaign.json'),
    output.contracts['AllCampaign.sol'].Campaign
);
fs.outputJSONSync(
    path.resolve(buildPath,'CampaignFactory.json'),
    output.contracts['AllCampaign.sol'].CampaignFactory
);

// for (let contract in output.contracts['AllCampaign.sol']){
//     console.log(contract)
//     fs.outputJSONSync(
//         path.resolve(buildPath,contract +'.json'),
//         output.contracts['AllCampaign.sol'].Campaign
//     );
// }

