import firebaseDB from "../config/firebase/firebaseDB";

const db = firebaseDB.collection("/users_time_to_move")

const getAll = () => {
    return db
}

const getOneUser = async (name) => {    
    return await db.where('name', '==', name).get()
}

const createUser = async (data) => {
    const resp = await db.add(data)
    console.log('id ', resp.id);
    return resp
}

const updateUser = async (key, data) => {
    let refUser;
    const ref = (await db.where('id','==',key).get())
    .docs.forEach( (item) => { 
        refUser = item.id                  
    })
   
   return db.doc(refUser).set(data)
}

const removeUser = async (key) => {
    let refUser;
    const ref = (await db.where('id','==',key).get())
    .docs.forEach( (item) => { 
        refUser = item.id                  
    })
    return db.doc(refUser).remove()
}

export default {
    getAll,
    getOneUser,
    createUser,
    updateUser,
    removeUser
}