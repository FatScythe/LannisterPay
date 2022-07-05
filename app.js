// https://flutterwave.stoplight.io/docs/2022-tech-heroes/ZG9jOjQxNjU5MTAz-lannister-pay-tpss

// Sample Payload
const SP = {
    ID: 1308,
    Amount: 12580,
    Currency: "NGN",
    CustomerEmail: "anon8@customers.io",
    SplitInfo: [
        {
            SplitType: "FLAT",
            SplitValue: 45,
            SplitEntityId: "LNPYACC0019"
        },
        {
            SplitType: "RATIO",
            SplitValue: 3,
            SplitEntityId: "LNPYACC0011"
        },
        {
            SplitType: "PERCENTAGE",
            SplitValue: 3,
            SplitEntityId: "LNPYACC0015"
        }
    ]
}

// SAMPLE RESPONSE

const SR = {
    ID: 13092,
    Balance: 0,
    SplitBreakdown: [
        {
            SplitEntityId: "LNPYACC0019",
            Amount: 450
        },
        {
            SplitEntityId: "LNPYACC0011",
            Amount: 2450
        },
        {
            SplitEntityId: "LNPYACC0015",
            Amount: 48
        },
        {
            SplitEntityId: "LNPYACC0215",
            Amount: 155.2
        },
        {
            SplitEntityId: "LNPYACC0011",
            Amount: 838.08
        },
        {
            SplitEntityId: "LNPYACC0016",
            Amount: 558.72
        }

    ]
}


// sorting an array of objects
const lists = [
    {
        type : "PERCENTAGE",
        value: 5
    },
    {
        type : "RATIO",
        value: 8
    },
    {
        type : "FLAT",
        value: 45
    }
];

let sort = lists.sort((a,b) => {
    if(a.type > b.type) {
        return -1;
    } else if(b.type > a.type) {
        return 1
    } else {
        return 0;
    }
});
// console.log(sort.reverse())

// console.log(lists[1].type > lists[0].type )

// // SAMPLE RESPONSE

// const SR = {
//     ID: 13092,
//     Balance: 0,
//     SplitBreakdown: [
//         {
//             SplitEntityId: "LNPYACC0019",
//             Amount: 450
//         },
//         {
//             SplitEntityId: "LNPYACC0011",
//             Amount: 2450
//         },
//         {
//             SplitEntityId: "LNPYACC0015",
//             Amount: 48
//         },
//         {
//             SplitEntityId: "LNPYACC0215",
//             Amount: 155.2
//         },
//         {
//             SplitEntityId: "LNPYACC0011",
//             Amount: 838.08
//         },
//         {
//             SplitEntityId: "LNPYACC0016",
//             Amount: 558.72
//         }

//     ]
// }

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

// Sorting Payload
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
const Object = sortSplit;
console.log(Object, "Object");

// Compute
let balance = sample.Amount;
let newBalance;
let finalBalance;
let totalRatio = 5;

let computeFiat = (balance, value) => {
    let amount = value; 
    newBalance = balance - amount;
    return {newBalance, amount};
};

let computePerc = (balance, value) => {
    amount = (value / 100) * balance;
    newBalance = balance - amount;
    return {newBalance, amount};
}

let computeRatio = (balance, value) => {
    amount = (value / totalRatio) * balance;
    newBalance = (balance - amount);
    return {newBalance, amount};
}

// let compute = (balance, value) => {
//     if(Object.SplitType === 'FLAT') {
//         amount = value; 
//         newBalance = balance - amount;
//         return {newBalance, amount};
//     }
//     if(Object.SplitType === 'PERCENTAGE') {
//         amount = (value / 100) * balance;
//         newBalance = balance - amount;
//         return {newBalance, amount};
//     } 
//     if(Object.SplitType === 'RATIO') {
//         amount = (value / totalRatio) * balance;
//         newBalance = (balance - amount);
//         return {newBalance, amount};
//     }
// }




// const output = Object.reverse().map((obj, index) => {
//     // let previousBal = Object[index - 1].
//     // if(index == 0) {
//         compute(sample.amount, obj.SplitValue)
//     // }
//     // if(index > 0) {
//         // compute(350, obj.SplitValue)
//     // }
//     console.log(obj);
// });

// console.log(output);

// const output = Object.map((item, index) => {
//     let balance = sample.Amount;
//     let newBalance = Object.
// });




const output = Object.reverse().map((item, index) => {
    let balance = sample.Amount;
    // let prevBalance = Object[index - 1].Balance;
    // let finalBalance = Object
    if(index == 0){
        compute = computeFiat(balance, item.SplitValue);
        return {
            "SplitEntityId" : `LNPYACC${index}`,
            "Amount" : compute.amount,
            "Balance" : compute.newBalance
            };
        }
    console.log(item[0]);
    if(index > 0) {
        return item;
    }
    // if(item.SplitType === 'FLAT') {
    //     compute = computeFiat(prevBalance, item.SplitValue);
    //     return {
    //         "SplitEntityId" : `LNPYACC${index}`,
    //         "Amount" : compute.amount,
    //         "Balance" : compute.newBalance
    //         }
    //     } 
    // if(item.SplitType === 'PERCENTAGE') {
    //     compute = computePerc(sample.Amount, item.SplitValue)
    //     return {
    //         "SplitEntityId" : `LNPYACC${index}`,
    //         "Amount" : compute.amount,
    //         "Balance" : compute.newBalance
    //         } 
    //     } 

    //     if(item.SplitType === 'RATIO') {
    //         compute = computeRatio(sample.Amount, item.SplitValue)
    //         return {
    //             "SplitEntityId" : `LNPYACC${index}`,
    //             "Amount" : compute.amount,
    //             "Balance" : compute.newBalance
    //        }
    
    //     }
});

output.map((obj, index) => {
    console.log(obj, index);
})
console.log(output, "output")
let prevBalance = output[0].Balance;
console.log(prevBalance);





const sampleResponse = {
    "ID": 13092,
    "sortSplit" : sortSplit.reverse(),
    "SplitBreakdown" : [
    {
        "SplitEntityId": "LNPYACC0019",
        "Amount": 450
    },
    {
        "SplitEntityId": "LNPYACC0011",
        "Amount": 2450
    },
    {
        "SplitEntityId": "LNPYACC0015",
        "Amount": 48
    },
    {
        "SplitEntityId": "LNPYACC0215",
        "Amount": 155.2
    },
    {
        "SplitEntityId": "LNPYACC0011",
        "Amount": 838.08
    },
    {
        "SplitEntityId": "LNPYACC0016",
        "Amount": 558.72
    }

    ]
}

// console.log(sampleResponse.sortSplit);


// const sampleResponse = {
//     "ID": 13092,
//     "Balance": Initialbalance,
//     "SplitBreakdown": [
//         {
//             "SplitEntityId": "LNPYACC0019",
//             "Amount": 450
//         },
//         {
//             "SplitEntityId": "LNPYACC0011",
//             "Amount": 2450
//         },
//         {
//             "SplitEntityId": "LNPYACC0015",
//             "Amount": 48
//         },
//         {
//             "SplitEntityId": "LNPYACC0215",
//             "Amount": 155.2
//         },
//         {
//             "SplitEntityId": "LNPYACC0011",
//             "Amount": 838.08
//         },
//         {
//             "SplitEntityId": "LNPYACC0016",
//             "Amount": 558.72
//         }

//     ]
// }





// let text = JSON.stample)ringify(s
// // JSON.parse(sample);
// console.log(text);