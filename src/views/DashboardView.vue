<template>
  <div class="p-6" style="width: 100%">
    <a-button @click="handleClick" class="mb-4" type="primary">Add User</a-button>
    <a-table  :columns="columns" :data="data"  :loading="loading" :pagination="false">
      <template #optional="{ record }">
        <a-button @click="()=>{
          form.name = record.name;
          form.gender = record.gender;
          form.id = record.id;
          handleClick();
        }">Edit</a-button>
      </template>
      <template #gender="{ record }">
        {{ record.gender === "0" ? "Female" : "Male" }}
      </template>
    </a-table>
    <div style="height: 20px"></div>
    <a-pagination
      :total="pagination.total"
      :current="pageNum"
      :page-size="pagination.pageSize"
      @change="changeTable"
    ></a-pagination>

    <a-modal v-model:visible="visible" :page-change="changeTable" title="Add User" cancel-text="cancel" ok-text="confirm" @cancel="handleCancel" @before-ok="handleBeforeOk">
      <a-form :model="form">
        <a-form-item field="name" label="Name">
          <a-input v-model="form.name" />
        </a-form-item>
        <a-form-item field="gender" label="Gender">
          <a-select v-model="form.gender">
            <a-option value="1">Male</a-option>
            <a-option value="0">Female</a-option>
          </a-select>
        </a-form-item>
      </a-form>
      </a-modal>
  </div>
</template>

<script>
import {onMounted, reactive, ref} from 'vue';
import {APIAddUSer, APIEditUSer, APIGetUSerList} from "@/api/api";

export default {
  setup() {
    const visible = ref(false);
    const loading = ref(false);
    const pageNum = ref(1);
    const form = reactive({
      name: '',
      gender: ''
    });
    const pagination = reactive({
      total:0,
    });

    const changeTable = (currentPage) =>{
      pageNum.value = currentPage;
      getUserList();
    }

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
        slotName: 'gender',
      },
      {
        title: 'Optional',
        slotName: 'optional'
      }
    ];
    const data = ref([]);
    const handleClick = () => {
      visible.value = true;
    };
    const handleCancel = () => {
      visible.value = false;
      form.name = null;
      form.gender = null;
      form.id = null;
    };
    const handleBeforeOk = (done) => {
      if(form.id){
        APIEditUSer({...form}).then(resp=>{
          if(resp.result){
            getUserList();
          }
        }).finally(()=>{
          done()
          resetForm();
        })
      } else {
        APIAddUSer({...form}).then(resp=>{
          if(resp.result){
            getUserList();
          }
        }).finally(()=>{
          done();
          resetForm();
        })
      }
    };
    const resetForm = ()=>{
      form.name = null;
      form.gender = null;
      form.id = null;
    }

    const getUserList = () =>{
      loading.value = true;
      APIGetUSerList({
        page_num:pageNum.value
      }).then(resp=>{
        // console.log(resp);
        if(resp.result){
          data.value = resp.result.records;
          pagination.total = resp.result.total;
        }
      }).finally(()=>{
        loading.value = false
      });
    };
    onMounted(()=>{
      getUserList();
    });
    return {
      columns,
      data,
      visible,
      form,
      loading,
      handleClick,
      handleCancel,
      handleBeforeOk,
      resetForm,
      changeTable,
      pagination,
      pageNum
    };
  },
};
</script>
