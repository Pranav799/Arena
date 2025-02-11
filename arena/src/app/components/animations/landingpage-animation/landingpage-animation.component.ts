import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-landingpage-animation',
  templateUrl: './landingpage-animation.component.html',
  styleUrls: ['./landingpage-animation.component.css']
})
export class LandingpageAnimationComponent {

  options: AnimationOptions = {
    path: '../../../../assets/animation/Animation1.json',
  };
  
  styles = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };

}
