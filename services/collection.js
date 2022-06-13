// import { onSnapshot, setDoc, deleteDoc,collection} from "firebase/firestore";
// import { auth,db } from "../config";

// const listsRef = firestore()
//         .collection("users")
//         .doc(auth().currentUser.uid)
//         .collection("lists");

// const ref = collection(db, 'users',auth.currentUser.uid,"lists");


// export const onSnapShort   = (ref,callback,option) => {
//     onSnapshot(ref, (snapshot) => {
//         let items = snapshot.docs.map((doc)=>{
//             const data = doc.data();
//             data.id = doc.id;
//             return data;
//         })
//         items = options && option.sort ? items.sort(options.snapshot) : items;
//         callback(items)
//     })
// }


// export const addDoc = (ref, { id, ...data }) => {
//     const doc = id ? doc(ref,id) : doc(ref);
//     setDoc(doc,data).then(() => {
//         console.log("Add new item");
//     });
// };

// export const removeDoc = (ref, id) => {
//     ref.doc(id)
//         .delete()
//         .then(() => {
//             console.log(`Removed item: ${id}`);
//         });
// };

// export const updateDoc = (ref, id, data) => {
//     deleteDoc(ref,id).set(data)
//         .then(() => {
//             console.log(`Updated item: ${id}`);
//         });
// };