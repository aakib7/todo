import { doc, setDoc,collection,deleteDoc,onSnapshot } from "firebase/firestore";



export const getData   = (ref,callback,options) => {
    onSnapshot(ref, (snapshot) => {
        let items = snapshot.docs.map((doc)=>{
            const data = doc.data();
            data.id = doc.id;
            return data;
        })
        items = options && options.sort ? items.sort(options.snapshot) : items;
        callback(items)
    })
}

export const addDoc = async(ref, { id, ...data }) => {
    console.log("Here")
    const re = id ? doc(ref,id) : doc(ref);
    await setDoc(re,data).then(()=>{
        console.log("Add new item");
    })
};


export const removeDoc = async(ref, id) => {
    await deleteDoc(doc(ref, id))
        .then(() => {
            console.log(`Removed item: ${id}`);
        });
};

export const updateDoc = async(ref, id, data) => {
    await setDoc(doc(ref,id),data).then(() => {
        console.log(`Updated item: ${id}`);
    });
};