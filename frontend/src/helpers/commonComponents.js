import Vue from 'vue';
// alert components
import ErrorMessage from '@/components/alert/ErrorMessage.vue';
// common button components
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import DatePickerByWeek from '@/components/form/DatePickerByWeek.vue';

// common form components
import TextInput from '@/components/form/TextInput.vue';
import TextArea from '@/components/form/TextArea.vue';
import Date from '@/components/form/Date.vue';
import DatePicker from '@/components/form/DatePicker.vue';
import Select from '@/components/form/Select.vue';
// common components
import LoadingIndicator from '@/components/common/LoadingIndicator.vue';
import Pagination from '@/components/common/Pagination.vue';
import Breadcrumb from '@/components/common/Breadcrumb.vue';
import Item from '@/components/common/Item.vue';
import ItemGroup from '@/components/common/ItemGroup.vue';
import MaterialAlert from '@/components/common/MaterialAlert.vue';
import MaterialCard from '@/components/common/MaterialCard.vue';
import NoResult from '@/components/common/NoResult.vue';
// label component
import OutlineLabel from '@/components/labels/OutlineLabel.vue';

const alertComponents = [
    {
        name: 'ErrorMessage',
        component: ErrorMessage,
    },
];

const buttonComponents = [
    {
        name: 'PrimaryButton',
        component: PrimaryButton,
    },
];

const formComponents = [
    {
        name: 'TextInput',
        component: TextInput,
    },
    {
        name: 'TextArea',
        component: TextArea,
    },
    {
        name: 'Date',
        component: Date,
    },
    {
        name: 'DatePicker',
        component: DatePicker,
    },
    {
        name: 'DatePickerByWeek',
        component: DatePickerByWeek,
    },
    {
        name: 'Select',
        component: Select,
    },
];

const pageComponents = [
    {
        name: 'LoadingIndicator',
        component: LoadingIndicator,
    },
    {
        name: 'Pagination',
        component: Pagination,
    },
    {
        name: 'Breadcrumb',
        component: Breadcrumb,
    },
    {
        name: 'Item',
        component: Item,
    },
    {
        name: 'ItemGroup',
        component: ItemGroup,
    },
    {
        name: 'MaterialAlert',
        component: MaterialAlert,
    },
    {
        name: 'MaterialCard',
        component: MaterialCard,
    },
    {
        name: 'NoResult',
        component: NoResult,
    },
];

const labelComponents = [
    {
        name: 'OutlineLabel',
        component: OutlineLabel,
    },
];

const components = [
    ...alertComponents,
    ...buttonComponents,
    ...formComponents,
    ...pageComponents,
    ...labelComponents,
];

components.forEach((component) => {
    Vue.component(`Common${component.name}`, component.component);
});
