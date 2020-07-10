import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app'
import { Router } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore'

import { AlertController } from '@ionic/angular'
import { UserService } from '../user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = ""
  password: string= ""
  cpassword: string= ""

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public afstore: AngularFirestore,
    public user: UserService) { }

  ngOnInit() {
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Ok"]
    })
    await alert.present()
  }
  async register() {
    const { username, password, cpassword } = this
    if (password !== cpassword) {
      this.showAlert("Error!", "Passwords do not match")
      return console.error("Passwords do not match")
    }
    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(username, password)
      
      this.afstore.doc(`users/${res.user.uid}`).set({
        username
      })
      this.user.setUser({
        username,
        uid: res.user.uid
      })
      
      console.log(res)
      this.showAlert("Account created", "Welcome")
      this.router.navigate(['/tabs'])

    } catch(error) {
      console.dir(error)
      this.showAlert("Error", error.message)
    }
  
  } 
}
