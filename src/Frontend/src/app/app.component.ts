import {Component, OnInit} from '@angular/core';
import {HubConnectionBuilder} from "@microsoft/signalr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Frontend';


  ngOnInit(): void {
    const hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5003/notification-hub')
      .build();

    hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));

    hubConnection.on('Storage.FileSaved', data => console.log(data));
  }
}
