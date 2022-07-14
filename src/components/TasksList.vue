<template>
  <div class="list row">
    <!-- <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title" v-model="title" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="searchTitle">
            Search
          </button>
        </div>
      </div>
    </div> -->

    <p>{{ message }}</p>
    <div class="accordion mb-5" id="accordionExample">

      <div class="accordion-item" v-for="(task, index) in tasks" :key="index" >
        <h2 class="accordion-header">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse'+task.id" aria-expanded="true" aria-controls="collapseOne">
            <span class="flex-grow-1"> {{ task.title }}</span>
            <small style="flex-basis: auto; margin-right: 15px;"> {{ task.status ? "Published" : "Pending" }}</small>
          </button>
        </h2>
        <div :id="'collapse'+task.id"  class="accordion-collapse collapse">
          <div class="accordion-body">

            <form @submit.prevent="updateTask">
              <div class="form-group mb-2">
                <label for="title">Title</label>
                <input type="text" name="title" class="form-control" id="title"
                       v-model="task.title"/>
              </div>

              <input type="hidden" name="id" v-model="task.id">
              <div class="form-group mb-2">
                <label for="description">Description</label>
                <input type="text" name="description" class="form-control" id="description"
                       v-model="task.description"
                />
              </div>
              <div class="form-group mb-2">
                <label><strong>Status:</strong></label>
                {{ task.published ? "Published" : "Pending" }}
              </div>

              <div class="form-group mb-2">
                <button type="submit" class="btn btn-success">Update</button>
              </div>
            </form>
        </div>
      </div>
    </div>
    </div>
    <!--    <div class="card rounded-6 shadow">
          <h4 class="card-header">Tasks List</h4>
          <ul class="list-group">
            <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(task, index) in tasks"
              :key="index" @click="setActiveTask(task, index)">
              {{ task.title }}
            </li>
          </ul>
          <button class="m-3 btn btn-sm btn-danger" @click="removeAllTasks">
            Remove All
          </button>
        </div>-->
  </div>
</template>
<script>
import TaskDataService from "../services/TasksDataService";
export default {
  name: "tasks-list",
  data() {
    return {
      tasks: [],
      currentTask: null,
      message: null,
      currentIndex: -1,
      title: "",
      task: {
        id: null,
        title: "",
        description: "",
        published: false
      },
    };
  },
  methods: {

    updateTask(submitEvent) {

      this.task.title = submitEvent.target.elements.title.value;
      this.task.description = submitEvent.target.elements.description.value;
      this.task.id = submitEvent.target.elements.id.value;

      TaskDataService.update(this.task.id, this.task)
          .then(response => {
            console.log(response.data);
            this.message = 'The task was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
    },

    retrieveTasks() {
      TaskDataService.getAll()
          .then(response => {
            this.tasks = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    refreshList() {
      this.retrieveTasks();
      this.currentTask = null;
      this.currentIndex = -1;
    },
    setActiveTask(task, index) {
      this.currentTask = task;
      this.currentIndex = task ? index : -1;
    },
    removeAllTasks() {
      TaskDataService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
    },

    searchTitle() {
      TaskDataService.findByTitle(this.title)
          .then(response => {
            this.tasks = response.data;
            this.setActiveTask(null);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.retrieveTasks();
  }
};
</script>
<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>