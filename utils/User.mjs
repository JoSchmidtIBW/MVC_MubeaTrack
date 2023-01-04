//'use strict';

export default class User {

    static id = 0;

    constructor(id_UserU,erfasstDatumU,erfasstZeitU,maNummerU,vornameU,nachnameU,passwortU,rolleU,avatarFarbeU, id) {
        this.id = ++User.id;
        console.log("bin UserInLoggt Class User, und this.id: "+this.id);

        this.id_UserU = id_UserU;
        this.erfasstDatumU = erfasstDatumU;
        this.erfasstZeitU = erfasstZeitU;
        this.maNummerU = maNummerU;
        this.vornameU = vornameU;
        this.nachnameU = nachnameU;
        this.passwortU = passwortU;
        this.rolleU = rolleU;
        this.avatarFarbeU = avatarFarbeU;
    }

    //-------------------------
    getID() {
        console.log(this.id);
        return this.id;
    }

    static get counter() {
        User._counter = (User._counter || 0) + 1;
        return User._counter;
    }
    //-------------------------
    getId_UserU() {
        return this.id_UserU;
    }
    setId_UserU(id_UserU) {
        this.id_UserU = id_UserU;
    }
    getErfasstDatumU() {
        return this.erfasstDatumU;
    }
    setErfasstDatumU(erfasstDatumU) {
        this.erfasstDatumU = erfasstDatumU;
    }
    getErfasstZeitU() {
        return this.erfasstZeitU;
    }
    setErfasstZeitU(erfasstZeitU) {
        this.erfasstZeitU = erfasstZeitU;
    }
    getMaNummerU() {
        return this.maNummerU;
    }
    setMaNummerU(maNummerU) {
        this.maNummerU = maNummerU;
    }
    getVornameU() {
        return this.vornameU;
    }
    setVornameU(vornameU) {
        this.vornameU = vornameU;
    }
    getNachnameU() {
        return this.nachnameU;
    }
    setNachnameU(nachnameU) {
        this.nachnameU = nachnameU;
    }
    getPasswortU() {
        return this.passwortU;
    }
    setPasswortU(passwortU) {
        this.passwortU = passwortU;
    }
    getRolleU() {
        return this.rolleU;
    }
    setRolleU(rolleU) {
        this.rolleU = rolleU;
    }
    getAvatarFarbeU() {
        return this.avatarFarbeU;
    }
    setAvatarFarbeU(avatarFarbeU) {
        this.avatarFarbeU = avatarFarbeU;
    }
}




//--------------------------------------------ALT----------------------------------------------
// //'use strict';
//
// export default class User {
//
//     //static id1 = 0;
//     static id = 0;
//
//     constructor(erfasstDatumU,erfasstZeitU,maNummerU,vornameU,nachnameU,passwortU,rolleU,avatarFarbeU, id) {
//         //this.id = ++User.counter;
//         //this.id1 = ++id1;
//         //console.log("vvvvvvvvvvvvvvvvvvvvvvvvv"+this.id1)
//         //this._id = User.counter;
//         this.id = ++User.id;
//         console.log("bin UserInLogt Class User, und this.id"+this.id);
//
//         this.erfasstDatumU = erfasstDatumU;
//         this.erfasstZeitU = erfasstZeitU;
//         this.maNummerU = maNummerU;
//         this.vornameU = vornameU;
//         this.nachnameU = nachnameU;
//         this.passwortU = passwortU;
//         this.rolleU = rolleU;
//         this.avatarFarbeU = avatarFarbeU;
//     }
//
//     //-------------------------
//     getID() {
//         console.log(this.id);
//         return this.id;
//     }
//
//     get Id() {
//         return this._id;
//     }
//     static get counter() {
//         User._counter = (User._counter || 0) + 1;
//         return User._counter;
//     }
//     //-------------------------
//     getErfasstDatumU() {
//         return this.erfasstDatumU;
//     }
//     setErfasstDatumU(erfasstDatumU) {
//         this.erfasstDatumU = erfasstDatumU;
//     }
//     getErfasstZeitU() {
//         return this.erfasstZeitU;
//     }
//     setErfasstZeitU(erfasstZeitU) {
//         this.erfasstZeitU = erfasstZeitU;
//     }
//     getMaNummerU() {
//         return this.maNummerU;
//     }
//     setMaNummerU(maNummerU) {
//         this.maNummerU = maNummerU;
//     }
//     getVornameU() {
//         return this.vornameU;
//     }
//     setVornameU(vornameU) {
//         this.vornameU = vornameU;
//     }
//     getNachnameU() {
//         return this.nachnameU;
//     }
//     setNachnameU(nachnameU) {
//         this.nachnameU = nachnameU;
//     }
//     getPasswortU() {
//         return this.passwortU;
//     }
//     setPasswortU(passwortU) {
//         this.passwortU = passwortU;
//     }
//     getRolleU() {
//         return this.rolleU;
//     }
//     setRolleU(rolleU) {
//         this.rolleU = rolleU;
//     }
//     getAvatarFarbeU() {
//         return this.avatarFarbeU;
//     }
//     setAvatarFarbeU(avatarFarbeU) {
//         this.avatarFarbeU = avatarFarbeU;
//     }
// }
// //export * from 'UserInLoggt';