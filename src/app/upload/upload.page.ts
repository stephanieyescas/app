import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  imageURL: string;
  desc: string;

  @ViewChild('fileButton') fileButton

  constructor(
    public http: HttpClient,
    public afstore: AngularFirestore,
    public user: UserService) { }

  ngOnInit() {
  }

  createPost() {
    const data = {
      image: this.imageURL,
      desc: this.desc
    }
    this.afstore.doc(`users/${this.user}`).update({data})
    .then(()=> {

    })
    .catch((error) => {
      this.afstore.doc(`users/${this.user.getUID()}`).set({data})
    })

  }

  uploadFile() {
    this.fileButton.nativeElement.click()
  }

  fileChanged(event: { target: { files: any; }; }) {
    const files = event.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_STORAGE','1')
    data.append('UPLOADCARE_PUB_KEY', '5fe1a7af77e47009e78b')

    this.http.post('https://upload.uploadcare.com/base/', data)
    .subscribe(event => {
      console.log(event)
      this.imageURL=event.file
    })
  }
}
