<template>
    <v-navigation-drawer
        id="core-navigation-drawer"
        v-model="drawer"
        :dark="true"
        :expand-on-hover="expandOnHover"
        src="/images/sidebar.jpg"
        mobile-breakpoint="960"
        app
        mini-variant-width="80"
        width="260"
        v-bind="$attrs"
    >
        <template v-slot:img="props">
            <v-img :gradient="`to bottom, rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)`" v-bind="props" />
        </template>

        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title
                    class="text-uppercase font-weight-regular d-flex align-center justify-center"
                >
                    <!--                    <span class="logo-mini">-->
                    <!--            <img src="../../assets/images/logo.png" class="mr-2" width="40"  alt="" />-->
                    <!--                    </span>-->
                    <span class="logo-normal">TTLab</span>
                    <span class="logo-mini ml-0 mr-0">TT</span>
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-divider class="mb-3" />

        <v-list expand nav>
            <div />

            <template v-for="(item, i) in computedItems">
                <common-item-group v-if="item.children" :key="`group-${i}`" :item="item">
                    <!--  -->
                </common-item-group>

                <common-item v-else :key="`item-${i}`" :item="item" />
            </template>

            <div />
        </v-list>
    </v-navigation-drawer>
</template>

<script>

export default {
    name: 'Drawer',

    props: {
        expandOnHover: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        items: [
            {
                icon: 'mdi-account-multiple',
                title: 'layout.sidebar.user',
                to: '/user/list',
            },
               {
                icon: 'mdi-shopping',
                title: 'layout.sidebar.product',
                to: '/products/list',
            },
        ],
    }),

    computed: {
        drawer: {
            get() {
                return this.$store.state.drawer;
            },
            set(val) {
                this.$store.commit('SET_DRAWER', val);
            },
        },
        computedItems() {
            return this.items.map(this.mapItem);
        },
    },

    watch: {
        '$vuetify.breakpoint.smAndDown': (val) => {
            this.$emit('update:expandOnHover', !val);
        },
    },
    created() {},
    methods: {
        mapItem(item) {
            return {
                ...item,
                children: item.children ? item.children.map(this.mapItem) : undefined,
                title: item.title,
            };
        },
    },
};
</script>

<style lang="sass" scoped>
@import '~vuetify/src/styles/tools/_rtl.sass'

#core-navigation-drawer
  &.v-navigation-drawer--mini-variant
    .v-list-item
      justify-content: flex-start !important

    .v-list-group--sub-group
      display: block !important

  .v-list-group__header.v-list-item--active:before
    opacity: .24

  .v-list-item
    &__icon--text,
    &__icon:first-child
      justify-content: center
      text-align: center
      width: 20px

      +ltr()
        margin-right: 24px
        margin-left: 12px !important

      +rtl()
        margin-left: 24px
        margin-right: 12px !important

  .v-list--dense
    .v-list-item
      &__icon--text,
      &__icon:first-child
        margin-top: 10px

  .v-list-group--sub-group
    .v-list-item
      +ltr()
        padding-left: 8px

      +rtl()
        padding-right: 8px

    .v-list-group__header
      +ltr()
        padding-right: 0

      +rtl()
        padding-right: 0

      .v-list-item__icon--text
        margin-top: 19px
        order: 0

      .v-list-group__header__prepend-icon
        order: 2

        +ltr()
          margin-right: 8px

        +rtl()
          margin-left: 8px
.logo-mini
    display: none
    margin: 0
.v-navigation-drawer--mini-variant
    .logo-mini
        font-size: 20px
        display: block
    .logo-normal
        display: none
</style>
