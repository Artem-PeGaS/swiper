/* global $ */

import animate from './animate.js';
import mm from './mm.js';

import 'svgxuse';
import 'web-animations-js';
import Swiper from 'swiper';
import lozad from 'lozad';
import objectFitImages from 'object-fit-images';

// Setup lozad observer
const lazyload = lozad('.lozad', {
	rootMargin: `${window.innerHeight}px 0px ${window.innerHeight}px 0px`
});

$(() => {
	// Polyfills
	objectFitImages();

	// Observe new elements
	lazyload.observe();

	// IE11 detection
	if (/MSIE/.test(window.navigator.userAgent) || /Trident/.test(window.navigator.userAgent)) {
		$('body').addClass('msie');
	}

	const $container = $('body');

	if ($container.find('.slider-main').length > 0) {
		new Swiper('.slider-main', {
			loop: true,

			pagination: {
				el: '.swiper-pagination'
			},

			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},

			scrollbar: {
				el: '.swiper-scrollbar'
			}
		});
	}

	if ($container.find('.slider').length > 0) {
		let mySwiper = undefined;

		const initSwiper = () => {
			const screenWidth = $(window).width();

			if (screenWidth < 1000 && mySwiper === undefined) {
				$('.slider').removeClass('slider_destroy');
				mySwiper = new Swiper('.slider', {
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev'
					}
				});
			} else if (screenWidth > 1000 && mySwiper !== undefined) {
				mySwiper.destroy();
				mySwiper = undefined;
				$('.slider').addClass('slider_destroy');
				$('.swiper-wrapper').removeAttr('style');
				$('.swiper-slide').removeAttr('style');
			}
		};

		initSwiper();

		$(window).on('resize', function() {
			initSwiper();
		});
	}

	if ($container.find('.slider-reviews').length > 0) {
		new Swiper('.slider-reviews', {
			loop: true,

			pagination: {
				el: '.swiper-pagination'
			},

			// Navigation arrows
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},

			// And if we need scrollbar
			scrollbar: {
				el: '.swiper-scrollbar'
			}
		});
	}
});
