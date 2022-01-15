import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { initializeApp } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app3';

  ngOnInit(): void {
    const firebaseConfig = {
      apiKey: "AIzaSyAMUWCXTGS3qVm2GOM2fMdaHpP63y417p8",
      authDomain: "instagramclone-aac13.firebaseapp.com",
      projectId: "instagramclone-aac13",
      storageBucket: "instagramclone-aac13.appspot.com",
      messagingSenderId: "115501142812",
      appId: "1:115501142812:web:66cb6229377b62b49720d9",
      measurementId: "G-Q23G8L5K75"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
  }
}
