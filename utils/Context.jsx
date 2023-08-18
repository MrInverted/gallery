// import React from 'react'
// import axios from 'axios'
// import { initialArray } from './initial'

// export const MyContext = React.createContext()

// export default function Context({ children }) {
//   const [init, setInit] = React.useState([])

//   React.useEffect(() => {
//     axios.get('http://localhost:3000/api/items')
//       .then(res => setInit(res.data.success))
//       .catch(err => console.warn(err))
//   }, [])

//   React.useEffect(() => {
//     if (init.length === 0) return

//     axios.post('http://localhost:3000/api/items', init)
//       .then(res => console.log(res.data.success))
//       .catch(err => console.warn(err))
//   }, [init])



//   return (
//     <MyContext.Provider value={{ init, setInit }}>
//       {children}
//     </MyContext.Provider>
//   )
// }



// ------------------------------------

// import { initializeApp } from "firebase/app"
// import { getDatabase, ref, get, set } from "firebase/database"

// const firebaseConfig = {
//   apiKey: "AIzaSyCVrVeZhSCWJZtCXNI5_8_ELqTaQPcMI8o",
//   authDomain: "photos-b9cd5.firebaseapp.com",
//   projectId: "photos-b9cd5",
//   storageBucket: "photos-b9cd5.appspot.com",
//   messagingSenderId: "719091067610",
//   appId: "1:719091067610:web:c83417cc8858b388b653e3"
// }

// const app = initializeApp(firebaseConfig)
// const database = getDatabase(app);
// const databaseRef = ref(database, "/");

// ------------------------------------

// React.useEffect(() => {
//   get(databaseRef)
//     .then(async (snapshot) => {
//       if (snapshot.exists()) {
//         const data = await snapshot.val();
//         setInit(data);
//         console.log(data);
//       } else {
//         console.log("Данные не найдены.");
//       }
//     })
//     .catch((error) => {
//       console.error("Ошибка при получении данных:", error);
//     });
// }, [])

// React.useEffect(() => {
//   if (init.length > 0) {
//     set(databaseRef, init)
//       .then(() => console.log("Данные успешно записаны в базу данных."))
//       .catch((error) => console.error("Ошибка при записи данных:", error));
//   }
// }, [init])

// const handleClick = () => {
//   const db = getDatabase()
//   const reference = ref(db, "/test")

//   set(reference, {
//     hello: "world"
//   })
//     .then(res => console.log(res))
//     .catch(err => console.log(err))
// }