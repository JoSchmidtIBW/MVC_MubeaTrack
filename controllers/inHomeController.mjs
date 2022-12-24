import Console from "console";


export let inHomeControllerGet = async (req, res) => {
    //router.get('/:maNummer', async(req, res)=> {

        console.log("bin im inHomeRoute.mjs - GET")
        console.log("inHomeRoute.mjs req: " + JSON.stringify(req.query))
        console.log("inHomeRoute.mjs pathname inHomeController: " + req.path)
        console.log("inHomeRoute.mjs req.session: "+JSON.stringify(req.session));

        const myArr = req.path.split(':');
        let gesplittetVonURLdenUserTeil = myArr[1];
        console.log("inHomeRoute.mjs gesplittetVonURLdenUserTeil: " + gesplittetVonURLdenUserTeil)




        console.log("inHomeRoute.mjs gesplittetVonURLdenUserTeiiiil: " + gesplittetVonURLdenUserTeil)
        const myArr1 = gesplittetVonURLdenUserTeil.split('*');
        console.log("inHomeRoute.mjs gesplittet myArr1[0]: " + myArr1[0] + "inHomeRoute.mjs gesplittet myArr1[1]: " + myArr1[1]);


        res.render('pages/layoutInHomeUser', {
            //werIstAngemeldetH:user1.getMa_NummerU()
            /*werIstAngemeldetH:user.getVornameU()+" "+user.getNachnameU(),
            kundeIHServer:  "hoi kunde",
            MaNummerServer: user.getMa_NummerU()*/
            werIstAngemeldetH: myArr1[0] + " " + myArr1[1],
            kundeIHServer: "hoi kunde",
            MaNummerServer: myArr1[0]
        });
    };

export default inHomeControllerGet;