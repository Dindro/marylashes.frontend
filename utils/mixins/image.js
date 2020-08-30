export default {
	methods: {
		getSrcset(structure) {
			if (!structure) return;
			if (!Array.isArray(structure)) return;

			let srcset = '';
			structure.forEach((item, index) => {
				srcset += item.src;
				if (item.scale && item.scale > 1) {
					srcset += item.scale;
					srcset += 'x';
				}
				if (index < structure.lenght - 1) {
					srcset += ', ';
				}
			});

			return srcset;
		}
	},
	computed: {
		srcset() {
			return this.getSrcset(this.image.srcset)
		},

		alt() {
			return this.image.alt || 'image';
		},
	},
}
