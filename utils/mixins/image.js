export default {
	computed: {
		srcset() {
			if (!Array.isArray(this.image.srcset)) return;

			let srcset = '';
			this.image.srcset.forEach((item, index) => {
				srcset += item.src;
				if (item.scale && item.scale > 1) {
					srcset += item.scale;
					srcset += 'x';
				}
				if (index < this.image.srcset.lenght - 1) {
					srcset += ', ';
				}
			});

			return srcset;
		},

		alt() {
			return this.image.alt || 'image';
		},
	},
}
