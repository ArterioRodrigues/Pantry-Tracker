import Firebase from "./firebase.js";

const firebase = new Firebase()


firebase.getDataBase().then(   
    (e => e.forEach(element => {
        console.log(element);
    }))
);
