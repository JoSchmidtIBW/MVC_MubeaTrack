import userEingeloggtArray from "../utils/userEingeloggtArray.mjs";
import {sucheInDBVerladung} from "../models/inHomeVerladungDB.mjs";

// module.exports = (req, res) => {
//     res.send("Home")
// };
//
// export let logOutGetController = function(req,res)=>{
//     res.send("Home")
//     //res.render('pages/logOut')
//
// }

export  let logOutGetController = async (req, res) => {
        res.render('pages/logOut', {
        });


};

export default logOutGetController