import * as firebase from "firebase"
import "firebase/database"

import config from './configFirebase'

firebase.initializeApp(config)

export default firebase.database()