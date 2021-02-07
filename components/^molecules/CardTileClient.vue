<template>
	<CardTile
		:theme="theme"
		:title="title"
		:class="[ collapse && `tile-client--collapse`, collapse && collapseValue && 'is-open']"
		class="tile-client">
		<template #header v-if="header">
			<slot name="header">
				<Dropdown text="еще" :items="headerDropdownItems"/>
			</slot>
		</template>

		<template #default>
			<div class="tile-client__user tile-client-user">
				<Avatar size="lg" class="tile-client-user__avatar"/>

				<div class="tile-client-user__info">
					<p class="tile-client-user__name text-default">Мария Ижуткина</p>

					<template>
						<LinkAction class="tile-client-user__phone" :link="{ text: '89373941802', href: 'tel:89373941802' }" />
						<br>
						<LinkAction class="tile-client-user__phone" :link="{ text: '89373941802', href: 'tel:89373941802' }" />
						<br>
					</template>
				</div>

				<div class="tile-client-user__action" v-if="collapse || $slots['user-action']">
					<slot v-if="$slots['user-action']" name="user-action"></slot>

					<LinkAction
						v-if="collapse && !collapseValue"
						@click.native="actionCollapse()"
						class="tile-client-user__collapse-action"
						:link="{ text: 'Подробнее', tag: 'button' }" />
				</div>
			</div>

			<div class="tile-client__content">
				<TabsSimple>
					<div class="tile-client__info" title="Подробнее">
						<div class="tile-client-row">
							<p class="tile-client-row__content text-default">Красивая девчонка может быть. Лучше подходит 2д наращинвание</p>
						</div>

						<div class="tile-client-row">
							<p class="tile-client-row__title text-default">День рождения</p>
							<p class="tile-client-row__content text-default">31.10.1995</p>
						</div>

						<div class="tile-client-row">
							<p class="tile-client-row__title text-default">Социальные сети</p>
							<table class="tile-client-row__content">
								<tbody>
									<tr>
										<th>Vk</th>
										<td>i7enov</td>
									</tr>

									<tr>
										<th>In</th>
										<td>i7enov</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					<div class="tile-client__static" title="Статистика">
						<div class="tile-client-row tile-client-row--inline">
							<span class="tile-client-row__title text-default">Количество записей</span>
							<span class="tile-client-row__content text-default">4</span>
						</div>
						<div class="tile-client-row tile-client-row--inline">
							<span class="tile-client-row__title text-default">Количество записей</span>
							<span class="tile-client-row__content text-default">4</span>
						</div>
					</div>

					<div class="tile-client__records" title="Записи">
						<CardTileRecordList/>
					</div>
				</TabsSimple>
			</div>

			<div class="tile-client__collapse" v-if="collapse && collapseValue">
				<LinkAction @click.native="actionCollapse(false)" :link="{ text: 'Скрыть', tag: 'button' }" />
			</div>
		</template>
	</CardTile>
</template>

<script>
import CardTile from '^/CardTile';
import LinkAction from '+/LinkAction';
import TabsSimple from '^/TabsSimple';
import CardTileRecordList from '^/CardTileRecordList';
import Avatar from '+/Avatar';
import Dropdown from '^/Dropdown';

export default {
	components: {
		CardTile,
		LinkAction,
		TabsSimple,
		CardTileRecordList,
		Avatar,
		Dropdown,
	},

	props: {
		header: {
			type: Boolean,
			default: true,
		},
		title: {
			type: [Boolean, String],
			default: 'Карта клиента',
		},
		theme: String,
		collapse: {
			type: Boolean,
			default: false,
		},
		card: {
			type: Object,
			default() {
				return {
					id: 'create',
					name: 'Мария Ижуткина',
					phones: ['89373941802', '89991234345'],
					comment: 'Красивая девчонка может быть. Лучше подходит 2д наращинвание',
					birthday: new Date(),
					socials: { Vk: 'i7enov', In: '@i7enov' },
					statistic: {
						"Количество записей": 4,
						"Количество отмены": 1,
						"Сумма денег": "5900 ₽",
						"Любимый объем": "Classic",
					},
					records: {
						0: [
							{
								id: 34,
								statusId: 0,
								price: 1400,
								date: new Date(),
								services: [0, 3],
								text: 'Все супер но пришлось сделать кое один момент очень неверный. Например 2d вообще не подошло блин.',
								photos: ['https://vk.com/'],
							}
						]
					}
				}
			}
		},
	},

	data: () => ({
		collapseValue: false,
	}),

	computed: {
		headerDropdownItems() {
			return this.getHeaderDropdownItems();
		},
	},

	methods: {
		getHeaderDropdownItems() {
			return [
				{
					text: 'Редактировать',
					handler: null,
				},
				{
					text: 'Удалить клиента',
					handler: null,
				},
				{
					text: 'Удалить все',
					handler: null,
				}
			]
		},

		actionCollapse(action = true) {
			this.collapseValue = action;
		}
	},
}
</script>

<style lang="scss">
.tile-client {
	$b: #{&};

	&__content {
		margin-top: rem(24);
	}

	&__collapse {
		text-align: right;
		margin-top: rem(32);
	}

	&--collapse {
		&:not(.is-open) {
			#{$b}__content {
				display: none;
			}
		}
	}
}

.tile-client-row {
	$b: #{&};

	& + & {
		margin-top: rem(16);
	}

	&__title {
		opacity: 0.3;
	}

	table#{$b}__content {
		@include text-default;

		th,
		td {
			padding: 0;
		}

		td {
			padding: 0 rem(16);

			&:last-child {
				padding-right: 0;
			}
		}

		th {
			opacity: 0.3;
		}
	}

	&--inline {
		& + & {
			margin-top: rem(4);
		}

		#{$b}__content {
			margin-left: rem(8);
		}
	}
}

.tile-client-user {
	display: flex;

	&__avatar {
		margin-right: rem(16);
	}

	&__name {
		margin-bottom: rem(4);
	}

	&__phone {
		opacity: 0.3;
	}

	&__info {
		flex: 1 1 auto;
	}

	&__action {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	&__collapse-action {
		margin-top: auto;
	}
}
</style>
