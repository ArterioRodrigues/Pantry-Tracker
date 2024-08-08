import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, setDoc, doc} from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js'; 
import { firebaseConfig } from "./config.js";

export default class Firebase {
    constructor(){
        this.app = initializeApp(firebaseConfig);
        this.db = getFirestore(this.app);
        this.currentDataBaseName = "inventory";
    }

    setDataBaseName(name){
        this.currentDataBaseName = name;
    }

    async getDataBase() {
        try {
            const DataBaseCol = collection(this.db, this.currentDataBaseName);
            const snapShot = await getDocs(DataBaseCol);
            const itemList = snapShot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }));
            return itemList;
        }
        catch (e) {
            console.error("Error getting documents: ", e);
            return [];
        }
    }

    async addItemToDataBase(data){
        try {
            const DataBaseCol = collection(this.db, this.currentDataBaseName);
            const docRef = await addDoc(DataBaseCol, data);
            console.log("Document written with ID: ", docRef.id);
        }
        catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async setItem(id, data) {
        try {
            const DataBaseDocRef = doc(this.db, this.currentDataBaseName, id);
            await setDoc(DataBaseDocRef, data);
            console.log("Document successfully written!");
        } catch (e) {
            console.error("Error writing document: ", e);
        }
    }

    async deleteItem(id) {
        try {
            const DataBaseDocRef = doc(this.db, this.currentDataBaseName, id);
            await deleteDoc(DataBaseDocRef);
            console.log(`Document with ID ${id} has been deleted.`);
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    }
}