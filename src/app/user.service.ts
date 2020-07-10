import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore/public_api'
import { UnsubscriptionError } from 'rxjs'

interface user {
    username: string,
    uid: string 
}

@Injectable()
export class UserService {
    private user: user
    
    constructor(private afAuth: AngularFireAuth) {}

    setUser(user: user) {
        this.user = user
    }

    async getUID() {
        return this.user.uid
    }
}
