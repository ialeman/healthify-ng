import { Component, OnInit } from '@angular/core';

declare var Swiper: any;
declare var AOS: any;
declare var GLightbox: any;

// declare function select(el: any, all?: any): any;
declare function on(type, el, listener, all?): any;
// declare function onscroll(el, listener: any): any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    ngOnInit(): void {
        document.querySelector('#header').classList.add('header-transparent');

        /**
         * Scrool with ofset on links with a class name .scrollto
         */
        on('click', '.scrollto', function (e) {
            let selector = document.querySelector(this.hash);
            // console.log(selector)
            if (selector) {
                e.preventDefault()

                let navbar = document.querySelector('#navbar');
                if (navbar.classList.contains('navbar-mobile')) {
                    navbar.classList.remove('navbar-mobile')
                    let navbarToggle = document.querySelector('.mobile-nav-toggle');
                    navbarToggle.classList.toggle('bi-list')
                    navbarToggle.classList.toggle('bi-x')
                }

                // this.scrollto(this.hash)
                let header: any = document.querySelector('#header');
                let offset = header.offsetHeight;

                if (!header.classList.contains('header-scrolled')) {
                    offset -= 20
                }

                let elementPos = document.querySelector(this.hash).offsetTop;
                window.scrollTo({
                    top: elementPos - offset,
                    behavior: 'smooth'
                });
            }
        }, true);

        /**
         * Testimonials slider
         */
        new Swiper('.testimonials-slider', {
            speed: 600,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            slidesPerView: 'auto',
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            }
        });

        /**
         * Animation on scroll
         */
        window.addEventListener('load', () => {
            AOS.init({
                duration: 1000,
                easing: 'ease-in-out',
                once: true,
                mirror: false
            })
        });

        const galleryLightbox = GLightbox({
            selector: '.gallery-lightbox'
        });
    }

}
