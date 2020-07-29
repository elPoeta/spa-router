import { Router } from './router.js';

const router = new Router();
router.root = 'http://localhost:3000'
router.add({ name: 'home', path: '/home', handler: () => console.log('Home route...') });
router.add({ name: 'contact', path: '/contact', handler: () => console.log('Contact route...') });
router.add({ name: 'about', path: '/about', handler: () => console.log('About route...') });

const activesRoutes = Array.from(document.querySelectorAll('[route]'));
activesRoutes
    .forEach(route => route.addEventListener('click', e => {
        e.preventDefault();
        router.navigate(e.target.getAttribute('route'));
    }, false))