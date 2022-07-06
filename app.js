// https://flutterwave.stoplight.io/docs/2022-tech-heroes/ZG9jOjQxNjU5MTAz-lannister-pay-tpss

// Sample Payload
const sample = {
    "ID": 13092,
    "Amount": 4500,
    "Currency": "NGN",
    "CustomerEmail": "anon8@customers.io",
    "SplitInfo": [
        {
            "SplitType": "FLAT",
            "SplitValue": 450,
            "SplitEntityId": "LNPYACC0019"
        },
        {
            "SplitType": "RATIO",
            "SplitValue": 3,
            "SplitEntityId": "LNPYACC0011"
        },
        {
            "SplitType": "PERCENTAGE",
            "SplitValue": 3,
            "SplitEntityId": "LNPYACC0015"
        },
        {
            "SplitType": "RATIO",
            "SplitValue": 2,
            "SplitEntityId": "LNPYACC0016"
        },
        {
            "SplitType": "FLAT",
            "SplitValue": 2450,
            "SplitEntityId": "LNPYACC0029"
        },
        {
            "SplitType": "PERCENTAGE",
            "SplitValue": 10,
            "SplitEntityId": "LNPYACC0215"
        },
    ]
}

// = Rule 2 =
// The order of precedence for the SplitType is:

// FLAT types should be computed before PERCENTAGE OR RATIO types
// PERCENTAGE types should be computed before RATIO types.
// RATIO types should always be computed last.
// SORTING SamplePayload
let sortSplit = sample.SplitInfo.sort((a,b) => {
    if(a.SplitType > b.SplitType) {
            return -1;
    } else if(b.SplitType > a.SplitType) {
            return 1;
    } else {
        return 0;
    }
});

// Sorted Sample Payload
const input = sortSplit.reverse();
console.log(input, "PayLoad as been sorted here!!!");

// Computation for flat, percentage and ratio;
let balance = sample.Amount;
let sum = 0;
let totalRatio = input.map((i, index) => {
    if(i.SplitType === 'RATIO'){
        sum += i.SplitValue;
    }
});
console.log(sum, 'Total Ratio in the Sample Payload');


let computeFiat = (balance, value) => {
    let amount = value; 
    newBalance = balance - amount;
    return {newBalance, amount};
}

let computePerc = (balance, value) => {
    amount = (value / 100) * balance;
    newBalance = balance - amount;
    return {newBalance, amount};
}

let computeRatio = (balance, value) => {
    amount = (value / sum) * balance;
    newBalance = (balance - amount);
    return {newBalance, amount};
}


const output = input.map((item, index) => {
    if(index == 0){
        compute = computeFiat(balance, item.SplitValue);
        return {
            "SplitEntityId" : `LNPYACC${index}`,
            "Amount" : compute.amount,
            };
        }

    let prevBalance = compute.newBalance;

    if(index > 0) {
        if(item.SplitType === 'FLAT') {
            compute = computeFiat(prevBalance, item.SplitValue);
            prevBalance = compute.newBalance;
            return {
                "SplitEntityId" : `LNPYACC${index}`,
                "Amount" : compute.amount,
                "Balance" : compute.newBalance
                }
            } 
        if(item.SplitType === 'PERCENTAGE') {
            let prevBalance = compute.newBalance;
            console.log();
            compute = computePerc(prevBalance, item.SplitValue);
            return {
                "SplitEntityId" : `LNPYACC${index}`,
                "Amount" : compute.amount,
                "Balance" : compute.newBalance
                } 
            } 
    
            if(item.SplitType === 'RATIO') {
                compute = computeRatio(prevBalance, item.SplitValue);
                prevBalance = compute.newBalance;
                return {
                    "SplitEntityId" : `LNPYACC${index}`,
                    "Amount" : compute.amount,
                    "Balance" : compute.newBalance
               }
        
            }
    }

});

// sampleResponse
console.log(output, "SampleResponse here!!!");