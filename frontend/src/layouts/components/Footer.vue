<template>
    <v-footer
        id="pages-core-footer"
        absolute
        color="transparent"
        dark
    >
        <v-container>
            <v-row
                align="center"
                no-gutters
            >
                <v-spacer class="hidden-sm-and-down" />

                <v-col
                    cols="12"
                    md="auto"
                />
            </v-row>
        </v-container>
    </v-footer>
</template>

<script>
export default {
    name: 'PagesCoreFooter',

    data: () => ({
    }),
};
</script>

<style lang="sass" scoped>
  #pages-core-footer
    a
      color: #FFFFFF
      font-size: .825rem
      font-weight: 500
      text-decoration: none
      text-transform: uppercase
</style>
