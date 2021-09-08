 import firebase from "firebase/compat/app/"
import "firebase/compat/firestore"

import config from './configFirebase'

firebase.initializeApp(config)

export default firebase.firestore()