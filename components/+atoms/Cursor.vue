<template>
	<div class="cursor-shell" :style="{ transform: transform }" :class="[size && `cursor--size--${size}`]">
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
			} else {
				document.body.classList.add(CURSOR_BODY_CLASS);
			}
		}
	},
	methods: {
		initCursor() {
			document.addEventListener('mousemove', (e) => {
				this.x = e.clientX;
				this.y = e.clientY;
			});

			const render = () => {
				this.transform = `translate(${this.x}px, ${this.y}px)`;

				requestAnimationFrame(render);
			}

			requestAnimationFrame(render);
		},

	},
	mounted() {
		this.initCursor();
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
