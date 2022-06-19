// createUserWithEmailAndPassword(auth, email, password)
//         .then(({user})=>{
//           setDoc(doc(db, "user", user.uid), {
//               user_name:name,
//               address:"Lahore",
//               phone:number,
//           });
//       })
//       adddata();
//     }



    
// const adddata = (){
//     await addDoc(collection(db,`user/${auth.currentUser.uid}/student`), {
//         //pass any data for user{user.uid}
//         user_name:"Umar Farooq Cklld",
//         address:"Lahore",
//         phone:"0300",
//         // date: Timestamp.fromDate(new Date()),
//         // date: Timestamp.fromDate(new Date("December 10, 1815")),
//     });
// }
    


//     // createUserWithEmailAndPassword
//     // at thee time of singup a  doc is created with uid and 
//     // in that doc a collection is created with the name and number\
//     // adddata method 
//     // in the same user a student collection is create and a doc with a 
//     // new id in that doc a collection is created with the given fields
//     // /user/uid/student/anewidofstudentautogeneraated