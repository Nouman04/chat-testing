import { Component, OnInit } from '@angular/core';
import Peer from 'peerjs';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  peer: Peer;
  peerId: string;
  peerIdShare:string;
  lazyStream :any;
  currentPeer:any;
  peerList: Array<any> = [];
  // private peer : Peer
  // peerId: string
  // createURLToConnect: any
  // private currentPeer :any


  constructor() {
     this.peer = new Peer(); 
  }


  ngOnInit(): void {
    this.getPeerId();
  }

  private getPeerId(){
    this.peer.on("open",(id:any)=>{
      this.peerId = id;
    })
  }
  
  private videoCallPear(id: string)
  {
    
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then((stream) => {
      this.lazyStream = stream;

      const call = this.peer.call(id, stream);
      call.on('stream', (remoteStream:any) => {
        if (!this.peerList.includes(call.peer)) {
          this.streamRemoteVideo(remoteStream);
          this.currentPeer = call.peerConnection;
          this.peerList.push(call.peer);
        }
      });
    }).catch(err => {
      console.log(err + 'Unable to connect');
    });

    this.connectCall();
  }

 


  private streamRemoteVideo(stream:any) {
    const video = document.createElement('video');
    video.classList.add('video');
    video.srcObject = stream;
    video.play();

    let block = document.getElementById('remote-video')!
    block.append(video)
  }
  
  private connectCall(){
    // Peer event to accept incoming calls
    this.peer.on('call', (call: any) => {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then((stream) => {
        this.lazyStream = stream;

        call.answer(stream);
        call.on('stream', (remoteStream: any) => {
          if (!this.peerList.includes(call.peer)) {
            this.streamRemoteVideo(remoteStream);
            this.currentPeer = call.peerConnection;
            this.peerList.push(call.peer);
          }
        });

      }).catch(err => {
        console.log(err + 'Unable to get media');
      });
    });
  }



  private audioCallPear(id: string)
  {

  }


  audioCall(){
    //console.log("Audio Call");
    this.audioCallPear(this.peerIdShare);
  }
  videoCall(){
    //console.log("Video Call");
    this.videoCallPear(this.peerIdShare);
  }
  shareScreen(){
    // navigator.mediaDevices.getDisplayMedia({
    //   video: {
    //     cursor: 'always'
    //   },
    //   audio: {
    //     echoCancellation: true,
    //     noiseSuppression: true
    //   }
    // }).then((stream:any) => {
    //   const videoTrack = stream.getVideoTracks()[0];
    //   videoTrack.onended = () => {
    //     this.stopScreenShare();
    //   };

    //   const sender = this.currentPeer.getSenders().find((s:any) => s.track.kind === videoTrack.kind);
    //   sender.replaceTrack(videoTrack);
    // }).catch((err:any) => {
    //   console.log('Unable to get display media ' + err);
    // });
  }

  private stopScreenShare() {
    const videoTrack = this.lazyStream.getVideoTracks()[0];
    const sender = this.currentPeer.getSenders().find((s:any) => s.track.kind === videoTrack.kind);
    sender.replaceTrack(videoTrack);
  }

}
