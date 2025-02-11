import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-search-animation',
  templateUrl: './search-animation.component.html',
  styleUrls: ['./search-animation.component.css']
})
export class SearchAnimationComponent {

  options: AnimationOptions = {
    path: '../../../../assets/animation/search.json',
  };
  
  styles = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };

}
