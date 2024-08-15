import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private socket: Socket | undefined; // Initialize with undefined

  constructor() {
    this.connect();
  }

  connect(): void {
    this.socket = io('http://localhost:3001', {
      transports: ['websocket'], // Ensure WebSocket transport is used
      autoConnect: true
    });

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server',this.socket?.id);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
    this.socket.on('submissionPayloadResponse',(data)=>{
      console.log("submissionpayload",data);
    })
  }

  listenToSubmissionResponse(): Observable<any> {
    return new Observable((observer) => {
      // debugger
      if (this.socket) { // Check if socket is initialized
        console.log("inside the socket service")
        this.socket.on('submissionPayloadResponse', (data: any) => {
          console.log('Received submissionPayloadResponse:', data);
          observer.next(data);
        });
      } else {
        console.error('Socket is not initialized');
        observer.error('Socket is not initialized');
      }
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = undefined; // Reset socket after disconnecting
    }
  }
}
