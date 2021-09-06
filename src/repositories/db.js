import firebase from "../config/firebase/firebaseDB"

const db = firebase.ref("/users")

const getAll = () => {
    return db
}

const createUser = (data) => {
    return db.push(data)
}

const updateUser = (key, data) => {
    return db.child(key).update(data)
}

const removeUser = (key) => {
    return db.child(key).remove()
}

export default {
    getAll,
    createUser,
    updateUser,
    removeUser
}