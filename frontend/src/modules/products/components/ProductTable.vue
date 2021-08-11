<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="products"
            hide-default-footer
            :options="options"
            sort-by="productName"
            class="elevation-1"
        >
            <template v-slot:top>
                <br>
                <v-toolbar flat>
                    <v-toolbar-title>
                        {{ $t('products.product.dataTable.toolbarTitle') }}
                    </v-toolbar-title>
                    <v-divider class="mx-4" inset vertical />
                    <v-row>
                        <v-col cols="12" sm="5">
                            <v-text-field
                                v-model="keywords"
                                color="purple darken-2"
                                :label="$t('products.product.searchBar.productTextField')"
                                required
                            />
                        </v-col>
                        <v-col cols="12" sm="5">
                            <v-select
                                v-model="searchCateValue"
                                :items="categories"
                                item-text="categoryName"
                                item-value="id"
                                color="pink"
                                :label="$t('products.product.searchBar.productSelectCate')"
                                required
                            />
                        </v-col>
                        <v-col cols="12" sm="2">
                            <v-btn icon color="purple darken-2" @click="searchProduct()">
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-spacer />
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                                {{ $t('products.product.createProductButton') }}
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field
                                                v-model="editedItem.productName"
                                                :label="
                                                    $t('products.product.formData.productTextField')
                                                "
                                            />
                                        </v-col>
                                        <v-col class="d-flex" cols="12" sm="6" md="6">
                                            <v-select
                                                v-model="editedItem.categoryId"
                                                :items="categories"
                                                item-text="categoryName"
                                                item-value="id"
                                                filled
                                                :label="
                                                    $t(
                                                        'products.product.formData.productSelectCate',
                                                    )
                                                "
                                            />
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field
                                                v-model="editedItem.price"
                                                :label="
                                                    $t('products.product.formData.productPrice')
                                                "
                                            />
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-checkbox
                                                v-model="editedItem.isAvailable"
                                                :label="
                                                    $t(
                                                        'products.product.formData.productIsAvailable',
                                                    )
                                                "
                                            />
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="12">
                                            <v-file-input
                                                accept="image/png, image/jpeg, image/bmp"
                                                :placeholder="
                                                    $t(
                                                        'products.product.formData.productImagePlaceHolder',
                                                    )
                                                "
                                                prepend-icon="mdi-camera"
                                                :label="
                                                    $t('products.product.formData.productImage')
                                                "
                                                @change="selectProductImage"
                                            />
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col class="d-flex" cols="12" sm="6" md="12">
                                            <v-textarea
                                                outlined
                                                v-model="editedItem.descriptions"
                                                name="input-7-4"
                                                :label="
                                                    $t(
                                                        'products.product.formData.productDescriptions',
                                                    )
                                                "
                                            />
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer />
                                <v-btn color="blue darken-1" text @click="close">
                                    {{ $t('products.product.formData.cancelButton') }}
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="save">
                                    {{ $t('products.product.formData.saveButton') }}
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">
                                {{ $t('products.product.deleteConfirmBox.title') }}
                            </v-card-title>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                                    {{ $t('products.product.deleteConfirmBox.yesButton') }}
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="closeDelete">
                                    {{ $t('products.product.deleteConfirmBox.cancelButton') }}
                                </v-btn>
                                <v-spacer />
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>

            <template v-slot:item.image="{item}">
                <img
                    :src="item.image"
                    style="width: 50px; height: 50px"
                >
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                    Reset
                </v-btn>
            </template>
        </v-data-table>
        <v-row align="center">
            <v-col class="d-flex" cols="12" sm="9">
                <v-pagination
                    v-model="options.page"
                    :total-visible="7"
                    :length="paginationLength"
                    circle
                />
            </v-col>
            <v-col cols="12" sm="3">
                <v-select
                    v-model="options.itemsPerPage"
                    :items="[10, 20, 30, 50]"
                    :label="$t('products.product.dataTable.limitSelectBox')"
                />
            </v-col>
        </v-row>
    </div>
</template>
<script>
import '../../../plugins/lodash';
import { sortTypes } from '../constants/index';
import {
    getProducts,
    getCategories,
    createNewProduct,
    updateProduct,
    deleteProduct,
    searchProduct,
} from '../services/index';

export default {
    name: 'ProductTable',
    components: {},
    props: {},
    data() {
        return {
            dialog: false,
            dialogDelete: false,
            headers: [
                {
                    text: this.$t('products.product.headers[0]'),
                    align: 'start',
                    value: 'index',
                    sortable: false,
                },
                {
                    text: this.$t('products.product.headers[1]'),
                    value: 'productName',
                },
                {
                    text: this.$t('products.product.headers[2]'),
                    value: 'Category.categoryName',
                    sortable: true,
                },
                { text: 'Image', value: 'image', sortable: false },

                {
                    text: this.$t('products.product.headers[3]'),
                    value: 'actions',
                    sortable: false,
                },
            ],
            products: [],
            categories: [],
            searchCateValue: 3,
            keywords: '',
            editedIndex: -1,
            editedItem: {
                id: null,
                categoryId: null,
                productName: '',
                Category: {
                    id: null,
                    categoryName: '',
                },
                price: null,
                descriptions: '',
                image: '',
                isAvailable: null,
                numOfSold: null,
            },
            defaultItem: {
                id: null,
                categoryId: null,
                productName: '',
                Category: {
                    id: null,
                    categoryName: '',
                },
            },
            originalItem: {},
            productCount: 0,
            searching: false,
            options: {
                page: 1,
                itemsPerPage: 10,
            },
            sortConditions: {
                sortBy: 'productName',
                sortTypes: 'ASC',
            },
        };
    },

    created() {
        this.initialize(this.options.page, this.options.itemsPerPage, this.sortConditions);
        this.getCategories();
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1
                ? this.$t('products.product.formData.createProductTitle')
                : this.$t('products.product.formData.editProductTitle');
        },
        paginationLength() {
            const paginationLength = Math.ceil(this.productCount / this.options.itemsPerPage);
            return paginationLength;
        },
        currentLang() {
            return this.$store.state.currentLang;
        },
    },

    watch: {
        dialog(val) {
            if (!val) this.close();
        },
        dialogDelete(val) {
            if (!val) this.closeDelete();
        },
        'options.page': {
            handler(val) {
                console.log(this);
                if (!this.searching) {
                    this.initialize(val, this.options.itemsPerPage, this.sortConditions);
                } else {
                    this.searchProduct();
                }
            },
        },
        'options.itemsPerPage': {
            handler(val) {
                console.log(this);
                if (this.options.page > this.paginationLength) {
                    this.options.page = this.paginationLength; // khi so luong item moi page thay doi,
                    // neu page hien tai lon' hon so luong page
                    // thi doi page hien tai thanh page cuoi cung de khong bi empty
                }
                if (!this.searching) {
                    this.initialize(this.options.page, val, this.sortConditions);
                } else {
                    this.searchProduct();
                }
            },
        },
        'options.sortDesc': {
            handler() {
                const { sortDesc, sortBy } = this.options;
                if (sortBy['0']) {
                    if (!sortDesc['0']) {
                        this.sortConditions.sortTypes = sortTypes.ASC;
                    } else {
                        this.sortConditions.sortTypes = sortTypes.DESC;
                    }
                    this.sortConditions.sortBy = sortBy['0'];
                    if (!this.searching) {
                        this.initialize(
                            this.options.page,
                            this.options.itemsPerPage,
                            this.sortConditions,
                        );
                    } else {
                        this.searchProduct();
                    }
                }
            },
        },
        keywords(val) {
            if (val === '') {
                this.searching = false;
                this.initialize(this.options.page, this.options.itemsPerPage, this.sortConditions);
            } else {
                this.searchProduct();
            }
        },
        currentLang() {
            this.headers = this.headers.map((value, index) => ({
                ...value, // copy object va thuc hien tao ra truong moi hoac thay doi cac truong o duoi neu co san
                text: this.$t(`products.product.headers[${index}]`),
            }));
        },
    },

    methods: {
        async initialize(page, limit, sortConditions) {
            const offset = parseInt((page - 1) * limit, 10);
            const res = await getProducts(offset, limit, sortConditions);
            if (res) {
                res.rows.forEach((element, index) => {
                    element.index = index + 1 + offset;
                });
                this.products = res.rows;
                this.productCount = res.count;
            }
        },

        async searchProduct() {
            const offset = parseInt((this.options.page - 1) * this.options.itemsPerPage, 10);
            const res = await searchProduct(
                this.keywords,
                this.searchCateValue,
                this.sortConditions,
                this.options.itemsPerPage,
                offset,
            );
            if (res) {
                res.rows.forEach((element, index) => {
                    element.index = index + 1;
                });
                this.products = res.rows;
                this.productCount = res.count;
                this.searching = true;
            }
        },

        selectProductImage(e) {
            this.editedItem.image = e;
        },

        async getCategories() {
            const res = await getCategories();
            if (res) {
                this.categories = res.map((item) => ({
                    value: item.id,
                    text: item.categoryName,
                }));
                this.categories = res;
                this.searchCateValue = res[0].id;
            }
        },

        editItem(item) {
            this.editedIndex = this.products.indexOf(item);
            this.editedItem = { ...item };
            this.originalItem = { ...item };
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.products.indexOf(item);
            this.editedItem = { ...item };
            this.dialogDelete = true;
        },

        async deleteItemConfirm() {
            const res = await deleteProduct(this.editedItem.id);
            if (res.data) {
                this.$swal({
                    title: 'Success',
                    text: 'Product has been deleted successfully',
                    icon: 'success',
                });
                this.initialize(this.options.page, this.options.itemsPerPage, this.sortConditions);
            } else {
                this.$swal({
                    title: `Error ${res.code}`,
                    text: `${res.message}`,
                    icon: 'error',
                });
            }
            this.closeDelete();
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = { ...this.defaultItem };
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = { ...this.defaultItem };
                this.editedIndex = -1;
            });
        },

        async save() {
            const formData = {
                file: this.editedItem.image,
                categoryId: this.editedItem?.categoryId,
                productName: this.editedItem?.productName,
                price: this.editedItem.price,
                isAvailable: this.editedItem.isAvailable,
                descriptions: this.editedItem.descriptions,
            };

            if (this.editedIndex > -1) {
                if (
                    this.originalItem.productName === this.editedItem.productName
                    && this.originalItem.categoryId === this.editedItem.categoryId
                ) {
                    this.$swal({
                        title: 'info',
                        text: 'You do not change any information',
                        icon: 'info',
                    });
                } else {
                    const res = await updateProduct({
                        ...formData,
                        id: this.editedItem?.id,
                    });
                    if (res.data?.result) {
                        this.$swal({
                            title: 'Success',
                            text: 'Product has been updated successfully',
                            icon: 'success',
                        });
                        this.initialize(
                            this.options.page,
                            this.options.itemsPerPage,
                            this.sortConditions,
                        );
                    } else {
                        this.$swal({
                            title: `Error ${res.code}`,
                            text: `${res.message}`,
                            icon: 'error',
                        });
                    }
                }
            } else {
                const res = await createNewProduct(formData);
                if (res.data?.product) {
                    this.$swal({
                        title: 'Success',
                        text: 'Product has been created successfully',
                        icon: 'success',
                    });
                    this.initialize(
                        this.options.page,
                        this.options.itemsPerPage,
                        this.sortConditions,
                    );
                } else {
                    this.$swal({
                        title: `Error ${res.code}`,
                        text: `${res.message}`,
                        icon: 'error',
                    });
                }
            }
            this.close();
        },
    },
};
</script>
<style lang="scss" scoped>
.d-flex {
    justify-content: center;
}
</style>
