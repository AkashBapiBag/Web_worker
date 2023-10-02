import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  public number: number = 0;
  public sliderTranslate = 'translateX(0px)';
  private animation = {
    translate: 0,
    rightDirection: true,
  };
  private worker!: Worker;
  private finalCalculationLimit: number = 100000;
  ngOnInit(): void {
    this.worker = new Worker(new URL('../app.worker', import.meta.url));

    this.worker.onmessage = ({ data }) => {
      this.number += data;
    };
  }

  addOne() {
    this.number += 1;
  }
  sumOfPrimeNumbers() {
    for (let i = 0; i <= this.finalCalculationLimit; i++) {
      let flag = 0;
      for (let j = 2; j < i; j++)
        if (i % j == 0) {
          flag = 1;
          break;
        }
      if (i > 1 && flag == 0) {
        this.number += i;
      }
    }
  }

  sumOfPrimeNumbersWorker() {
    this.worker.postMessage(this.finalCalculationLimit);
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(this.animateFrame.bind(this));
  }

  private animateFrame(): void {
    this.animation.translate = this.animation.rightDirection
      ? this.animation.translate + 5
      : this.animation.translate - 5;

    if (this.animation.translate > window.innerWidth * 0.2 + 40) {
      this.animation.rightDirection = false;
    } else if (this.animation.translate < 0) {
      this.animation.rightDirection = true;
    }
    this.sliderTranslate = `translateX(${this.animation.translate}px)`;
    requestAnimationFrame(this.animateFrame.bind(this));
  }

  ngOnDestroy(): void {
    this.worker.terminate();
  }
}
