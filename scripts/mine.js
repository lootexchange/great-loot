const { BigNumber } = require("@ethersproject/bignumber");
const { id } = require("@ethersproject/hash");

const random = input => BigNumber.from(id(input));
const items = ['WEAPON','CHEST','HEAD','WAIST','FOOT','HAND','NECK','RING'];

const getGreatness = id => {
    let greatness = 0
    const tokenId = BigNumber.from(id);
    for (let keyPrefix of items) {
        const rand = random(keyPrefix + tokenId.toString());
        greatness += rand.mod(21).toNumber();
    }
    return greatness;
};

const findGreatBags = (start, end, threshold) => {
    for(let i=start; i<=end; i++) {
        let greatness = getGreatness(i);
            if(greatness>=threshold) {
            console.log(i,greatness)
        }
    }
}

findGreatBags(100000000,10000000000,140)
