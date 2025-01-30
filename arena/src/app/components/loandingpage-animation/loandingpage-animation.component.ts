import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-loandingpage-animation',
  templateUrl: './loandingpage-animation.component.html',
  styleUrls: ['./loandingpage-animation.component.css']
})
export class LoandingpageAnimationComponent {

  options: AnimationOptions = {
    path: '../../../assets/animation/Animation1.json',
  };
  
  styles = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };
  
    animationCreated(animationItem: AnimationItem): void {
      console.log(animationItem);
    }
    
    configReady() {
      console.log('Animation config ready');
    }
    
    dataReady() {
      console.log('Animation data ready');
    }
    
    domLoaded() {
      console.log('DOM loaded for animation');
    }
    
    enterFrame(event: any) {
      console.log('Frame entered:', event);
    }
    
    segmentStart(event: any) {
      console.log('Segment started:', event);
    }
    
    complete(event: any) {
      console.log('Animation complete:', event);
    }
    
    loopComplete(event: any) {
      console.log('Loop complete:', event);
    }
    
    destroy(event: any) {
      console.log('Animation destroyed:', event);
    }
    
    error(event: any) {
      console.log('Animation error:', event);
    }
    
  

}
