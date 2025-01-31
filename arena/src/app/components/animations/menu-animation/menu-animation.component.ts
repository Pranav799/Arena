import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';


@Component({
  selector: 'app-menu-animation',
  templateUrl: './menu-animation.component.html',
  styleUrls: ['./menu-animation.component.css']
})
export class MenuAnimationComponent {

  options: AnimationOptions = {
    path: '../../../../assets/animation/Menu.json',
  };
  
  styles = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };
  
}
