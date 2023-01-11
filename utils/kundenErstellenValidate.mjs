// export function isPositivNumber(parameter){
//     console.log("bin isNumber + habe: "+parameter);
//     let isNumber = false;
//
//     if(parameter.match(/^-?\d+$/)){
//         console.log("ist eine Nummer");
//         isNumber = true;
//         //return isnumber;
//     }
//     else{
//         console.log("ist keine Nummer!")
//         isNumber = false;
//     }
//
//     return isNumber;
// }

export default function isPositivNumber(str) {
    console.log("bin isNumber + habe: "+str);
    let isOnlyPositivNumber = false;
    str = str.trim();
    console.log("str.trim(): "+str);
    if (!str) {
        isOnlyPositivNumber = false
        return isOnlyPositivNumber
    }
    str = str.replace(/^0+/, "") || "0";
    let n = Math.floor(Number(str));
    console.log("n: "+n)
    if(n !== Infinity && String(n) === str && n >= 0){
        isOnlyPositivNumber = true
        console.log("zahl >= 0");
    }else{
        console.log("zahl < 0, also negative Zahl!");
        isOnlyPositivNumber = false
    }

    return isOnlyPositivNumber;
}