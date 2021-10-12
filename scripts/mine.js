const { BigNumber } = require("@ethersproject/bignumber");
const { id } = require("@ethersproject/hash");

const random = input => BigNumber.from(id(input));
const items = ['WEAPON','CHEST','HEAD','WAIST','FOOT','HAND','NECK','RING'];

const findGreatBags = (start, end, threshold, itemThreshold) => {
    for(let i=start; i<=end; i++) {
        let greatness = 0
        const tokenId = BigNumber.from(i);
        for (let keyPrefix of items) {
            const rand = random(keyPrefix + tokenId.toString());
            let itemGreatness = rand.mod(21).toNumber();
            if(itemGreatness<itemThreshold) {
                break
            }
            greatness+=itemGreatness
        }
        if(greatness>=threshold) {
            console.log(i,greatness)
        }
    }
}

findGreatBags(106900000,10000000000,140, 18)
