<template>
  <div class="p-6" style="width: 100%">
    <a-button class="mb-4" type="primary">Add User</a-button>
    <a-table  :columns="columns" :data="data" >
      <template #optional="{ record }">
        <a-button @click="$modal.info({ title:'Edit', content:record.name })">Edit</a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
import {reactive, ref} from 'vue';

export default {
  setup() {
    const show = ref(true);
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
      },
      {
        title: 'Optional',
        slotName: 'optional'
      }
    ];
    const data = reactive([{
      id:"1",
      name:"111",
      gender:"ccc"
    }]);


    return {
      columns,
      data,
      show,
    };
  },
};
</script>
