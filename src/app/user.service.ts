import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore/'
import { first } from  'rxjs/operators'

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

    async isAuthenticated() {
        if(this.user) return true

        const user = await this.afAuth.authState.pipe(first()).toPromise()        // converting observable to promise; want value not string
        if (user) {
            this.setUser({
                username: this.user.username,
                uid: user.uid
            })
            return true
        }
        return false
    }
    getUID() {
        return this.user.username
    }
}
