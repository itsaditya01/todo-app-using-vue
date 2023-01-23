<template>
  <div>
    <app-header></app-header>
    <div id="todo">
      <div class="add-todo">
        <div class="input-todo">
          <input
            type="text"
            v-model.text="todoText"
            placeholder="Add todo here..."
          />
        </div>
        <div class="add-button">
          <div @click="addTodo" class="icon-holder">
            <button class="update-button">Add Todo</button>
          </div>
        </div>
      </div>
      <div v-for="todo in todos" class="todo-outer">
        <div class="todo-inner" v-if="updateId !== todo.id">
          <div class="content">
            <h3>{{ todo.value }}</h3>
            <h5 style="color: #301E67" v-if="isAdmin">By {{ todo.name }}</h5>
          </div>
          <div class="controls">
            <div class="control-update" @click="updateMode(todo)">
              <font-awesome-icon icon="fa-pen-to-square"></font-awesome-icon>
            </div>
            <div class="control-delete" @click="deleteTodo(todo.id)">
              <font-awesome-icon icon="fa-trash" />
            </div>
          </div>
        </div>
        <div v-else-if="updateId === todo.id" class="todo-update">
          <div class="content">
            <input type="text" v-model="updatedTodo" />
          </div>
          <div class="controls">
            <div class="control-update">
              <button @click="updateTodo(todo.id)" class="update-button">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import header from "./header.vue";
export default {
  components: { "app-header": header },

  data() {
    return {
      todos: [],
      todoText: "",
      updatedTodo: "",
      updateId: -1,
      isAdmin: false
    };
  },
  created() {
    this.fetchTodo();
  },
  beforeUpdate() {
    this.fetchTodo();
  },
  methods: {
    fetchTodo: function() {
      fetch("http://localhost:3000/api/todo", {
        method: "get",
        headers: {
          Accept: "application/json",
          token: localStorage.getItem("token")
        }
      })
        .then(response => response.json())
        .then(data => {
          this.todos = data.data;
          this.isAdmin = data.is_admin;
        });
    },
    addTodo: function() {
      // this is not working as expected
      // todoText at the backend is getting as undefined
      // fetch("http://localhost:3000/api/todo", {
      //   method: "post",
      //   body: this.todoText
      // })
      //   .then(response => response.json())
      //   .then(data => {
      //     this.todos = data;
      //   });
      // this is working fine
      this.$http
        .post(
          "http://localhost:3000/api/todo",
          { value: this.todoText },
          {
            headers: { token: localStorage.getItem("token") }
          }
        )
        .then(response => {
          response.json();
        });
      this.todoText = "";
      this.fetchTodo();
    },
    deleteTodo: function(id) {
      //this is not working as expected
      // fetch("http://localhost:3000/api/todo/" + id, {
      //   method: "delete"
      // }).then(response => response.json());

      //this is working fine
      this.$http
        .delete("http://localhost:3000/api/todo/" + id, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(response => {
          response.json();
        });
      this.fetchTodo();
    },
    updateTodo: function(id) {
      this.$http
        .put("http://localhost:3000/api/todo/" + id, {
          updatedTodo: this.updatedTodo
        })
        .then(response => {
          response.json();
        });
      this.updateId = -1;
      this.updatedTodo = "";
      this.fetchTodo();
    },
    updateMode: function(todo) {
      this.updatedTodo = todo.value;
      this.updateId = todo.id;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Fira+Sans");
* {
  font-family: "Fira Sans", sans-serif;
}
#todo {
  margin: 30px 100px;
}
svg {
  font-size: 24px;
  transition: 0.4s;
}
svg:hover {
  color: rgb(155, 48, 40);
}
.controls {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.update-button {
  background: #ff4742;
  border: 1px solid #ff4742;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: nunito, roboto, proxima-nova, "proxima nova", sans-serif;
  font-size: 16px;
  font-weight: 800;
  line-height: 16px;
  min-height: 40px;
  outline: 0;
  padding: 12px 14px;
  text-align: center;
  text-rendering: geometricprecision;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
}

.update-button:hover,
.update-button:active {
  background-color: initial;
  background-position: 0 0;
  color: #ff4742;
}

.update-button:active {
  opacity: 0.5;
}
.control-delete {
  margin-left: 20px;
}
.add-todo {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 50px 0;
  padding: 0px 50px;
}
.input-todo {
  display: flex;
  margin-right: 50px;
}
input {
  display: flex;
  width: 500px;
  height: 40px;
  border-radius: 5px;
  padding: 2px 10px;
}
.todo-outer {
  background-color: #1f8a70ab;
  border-radius: 10px;
}
.todo-inner {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 5px 50px;
}
.todo-update {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 5px 50px;
}
.todo-update .content {
  display: flex;
  align-items: center;
  height: 59.03px;
  color: #00425a;
}
.control {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
