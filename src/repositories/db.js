import firebaseDB from "../config/firebase/firebaseDB";

const db = firebaseDB.collection("/users_time_to_move")

const getAll = () => {
    return db
}

// const getOneUser = (name) => {
//     return db.orderByChild('name').equalTo(name)
// }

const createUser = (data) => {
    return db.add(data)
}

const updateUser = (key, data) => {
    return db.doc(key).update(data)
}

const removeUser = (key) => {
    return db.doc(key).remove()
}

export default {
    getAll,
    createUser,
    updateUser,
    removeUser
}