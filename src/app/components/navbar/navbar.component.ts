import { Component, OnInit } from '@angular/core';

declare function select(el: any, all?: any): any;
declare function on(type, el, listener, all?): any;
// declare function onscroll(el, listener: any): any;

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    navbarlinks: any;
    selectHeader: any;

    constructor() { }

    ngOnInit(): void {
        this.navbarlinks = select('#navbar .scrollto', true)
        console.log(this.navbarlinks);
        
        window.addEventListener('load', this.navbarlinksActive)
        this.onscroll(document, this.navbarlinksActive);

        this.selectHeader = select('#header')
        if (this.selectHeader) {
            const headerScrolled = () => {
                if (window.scrollY > 100) {
                    this.selectHeader.classList.add('header-scrolled')
                } else {
                    this.selectHeader.classList.remove('header-scrolled')
                }
            }
            window.addEventListener('load', headerScrolled)
            this.onscroll(document, headerScrolled)
        }

        /**
        * Mobile nav toggle
        */
        on('click', '.mobile-nav-toggle', function (e) {
            let selector = document.querySelector('#navbar');
            selector.classList.toggle('navbar-mobile')
            this.classList.toggle('bi-list')
            this.classList.toggle('bi-x')
        });

        /**
         * Mobile nav dropdowns activate
         */
        on('click', '.navbar .dropdown > a', function (e) {
            let selector = document.querySelector('#navbar');
            if (selector.classList.contains('navbar-mobile')) {
                e.preventDefault()
                this.nextElementSibling.classList.toggle('dropdown-active')
            }
        }, true);

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
         * Preloader
         */
        let preloader = select('#preloader');
        if (preloader) {
            window.addEventListener('load', () => {
                preloader.remove()
            });
        }
    }

    navbarlinksActive = () => {
        let position = window.scrollY + 200;

        this.navbarlinks.forEach(navbarlink => {
            // console.log(navbarlink.hash);
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            // console.log({ section });

            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
                // console.log("adding class");
            } else {
                navbarlink.classList.remove('active')
                // console.log("remove class");
            }
        })
    }

    /**
    * Easy on scroll event listener 
    */
    onscroll = (el, listener: any) => {
        console.log({ el });
        el.addEventListener('scroll', listener);
    }


}
