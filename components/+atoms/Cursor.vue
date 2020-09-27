<template>
	<div class="cursor-shell" :style="{ transform }" :class="[size && `cursor--size--${size}`]">
		<div
			class="cursor"
			:class="[
				cursor && 'cursor--visible',
				color && `cursor--color--${color}`,
			]"
		>
			<component v-if="name" :is="name" v-bind="cursor"></component>
		</div>
	</div>
</template>

<script>
import CursorLabel from '+/CursorLabel';
import { mapState } from 'vuex';

const CURSOR_BODY_CLASS = 'cursor-custom';

export default {
	components: {
		CursorLabel,
	},

	data: () => ({
		transform: 'none',
		x: -100,
		y: -100,
		timer: null,
		render: false,
	}),

	computed: {
		...mapState([
			'cursor',
		]),

		name() {
			if (this.cursor === null || (this.cursor && !this.cursor.type)) return null;
			return `cursor-${this.cursor.type}`;
		},

		size() {
			if (this.cursor === null || (this.cursor && !this.cursor.size)) return '80';
			return this.cursor.size;
		},

		color() {
			if (this.cursor === null || (this.cursor && !this.cursor.color)) return 'white';
			return this.cursor.color;
		}
	},
	watch: {
		cursor(value) {
			if (value === null) {
				document.body.classList.remove(CURSOR_BODY_CLASS);

				// Получаем таймер для отображения
				this.timer = setTimeout(() => {
					this.destroyCursor();
					this.timer = null;
				}, 150);

			} else {
				document.body.classList.add(CURSOR_BODY_CLASS);
				if (this.timer) {
					clearInterval(this.timer);
					this.timer = null;
				} else {
					this.initCursor();
				}
			}
		}
	},
	methods: {
		initCursor() {
			// Listen
			this.handler = (e) => {
				this.x = e.clientX;
				this.y = e.clientY;
			};
			window.addEventListener('mousemove', this.handler);

			// Рендер proccess
			this.render = true;
			const render = () => {
				if (!this.render) return;
				this.transform = `translate(${this.x}px, ${this.y}px)`;
				requestAnimationFrame(render);
			}
			requestAnimationFrame(render);
		},

		destroyCursor() {
			window.removeEventListener('mousemove', this.handler);
			this.render = false;
			this.x = -100;
			this.y = -100;
		}
	},
}
</script>

<style lang="scss">
.cursor-shell {
	position: fixed;
	left: 0;
	top: 0;
	pointer-events: none;
	z-index: $z-index-cursor;
}

.cursor {
	$b: #{&};
	border-radius: 50%;
	opacity: 0;
	transform: scale(0);
	@include defaultTransition(opacity, transform);

	&--visible {
		opacity: 1;
		transform: scale(1);
	}

	&,
	&--size--80 {
		width: rem(80);
		height: rem(80);
		left: rem(-40);
		top: rem(-40);
	}

	&,
	&--color--white {
		background-color: $color-white;
	}

	&--color--light {
		background-color: $color-light;
	}
}

.cursor-custom * {
	cursor: none;
}
</style>
