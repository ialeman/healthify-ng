import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        $('.back-to-top').click(function () {
            $("html, body").animate({ scrollTop: 0 }, 100);
            return false;
        });

        /**
         * Back to top button
         */
        let backtotop = document.querySelector('.back-to-top');
        if (backtotop) {
            const toggleBacktotop = () => {
                if (window.scrollY > 100) {
                    console.log('active top');
                    backtotop.classList.add('active')
                } else {
                    backtotop.classList.remove('active')
                }
            }
            window.addEventListener('load', toggleBacktotop)
            this.onscroll(document, toggleBacktotop)
        }
    }

    /**
      * Easy on scroll event listener 
      */
    onscroll = (el, listener: any) => {
        console.log({ el });
        el.addEventListener('scroll', listener);
    }

}
