import firebase from 'firebase/app';
import 'firebase/analytics';

import config from '../../config/firebase';

firebase.initializeApp(config);
firebase.analytics();

export { firebase };
