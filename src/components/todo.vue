<template>
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
          <font-awesome-icon
            icon="fa-solid fa-circle-plus fa-xl"
            class="icon"
          />
        </div>
      </div>
    </div>
    <div v-for="todo in todos" class="todo-outer">
      <div class="content">
        <h3>{{ todo.value }}</h3>
      </div>
      <div class="controls">
        <div class="control-update" @click="deleteTodo(todo.id)">
          <font-awesome-icon icon="fa-pen-to-square"></font-awesome-icon>
        </div>
        <div class="control-delete" @click="deleteTodo(todo.id)">
          <font-awesome-icon icon="fa-trash" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      todoText: ""
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
        headers: { Accept: "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          this.todos = data;
        });
    },
    addTodo: function() {
      // this is not working as expected
      // todoText at the backend is getting as undefined
      fetch("http://localhost:3000/api/todo", {
        method: "post",
        body: this.todoText
      })
        .then(response => response.json())
        .then(data => {
          this.todos = data;
        });
      //this is working fine
      // this.$http
      //   .post("http://localhost:3000/api/todo", { body: this.todoText })
      //   .then(response => {
      //     response.json();
      //   });

      this.fetchTodo();
    },
    deleteTodo: function(id) {
      //this is not working as expected
      fetch("http://localhost:3000/api/todo/" + id, {
        method: "delete"
      }).then(response => response.json());

      //this is working fine
      // this.$http
      //   .delete("http://localhost:3000/api/todo/" + id)
      //   .then(response => {
      //     response.json();
      //   });
      this.fetchTodo();
    }
  }
};
</script>

<style scoped>
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
.control-delete {
  margin-left: 20px;
}
.add-todo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;
  padding: 0px 50px;
}
.input-todo {
  display: flex;
}
input {
  display: flex;
  width: 500px;
  height: 30px;
  border-radius: 5px;
}
.todo-outer {
  background-color: beige;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 5px 50px;
}
.content {
}
.control {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
