<template>
  <div>
    <app-header></app-header>
    <div id="about">
      <h2 style="margin-top: 50px; text-align: center; color: #BFDB38">
        About this application
      </h2>
      <p style="margin-top: 20px; text-align: justify;">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
        error vero quae odio id quia quidem alias nemo impedit earum excepturi
        consequuntur vitae, inventore odit incidunt quas hic suscipit amet,
        nihil architecto. Tempore quam dolores necessitatibus, minima eum
        temporibus ipsa aperiam, atque assumenda, ipsum vel. Consequatur dolores
        inventore suscipit beatae enim laudantium iste! Exercitationem corrupti
        ipsa, sunt minima voluptates deleniti nemo deserunt voluptatibus
        possimus fuga quaerat, vitae alias? Nemo, minima sint aspernatur, quas
        maxime, debitis aliquam ut est ipsam quia nobis impedit error sunt dicta
        quidem officia iure corrupti magnam a sit mollitia tempore distinctio!
        Repellat, ab inventore nihil numquam commodi eos minus quod iste
        incidunt officiis facere tempora laborum, animi alias aperiam mollitia!
        Officia eum veritatis veniam assumenda nemo dignissimos accusamus ipsam
        enim quasi, dolor placeat dolores ipsum eaque. Quae doloribus alias
        aperiam reiciendis a provident aut sapiente dignissimos, corrupti autem
        itaque beatae fugit voluptas vitae quo maiores totam magnam neque. Sit
        impedit delectus voluptatum voluptatem officiis vel voluptas, harum est
        nihil, aut quidem illo quas eum ad tenetur quibusdam laborum quis
        molestias? Praesentium qui architecto at fuga blanditiis, commodi est
        tempora quae. Illum, vero excepturi itaque facere, voluptatem eligendi
        ipsam at iste assumenda recusandae temporibus nesciunt porro minus?
      </p>
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
          console.log(todos);
        });
    },
    addTodo: function() {
      console.log(typeof this.todoText);
      this.$http
        .post("http://localhost:3000/api/todo", { body: this.todoText })
        .then(response => {
          console.log(response.json());
        });
      this.fetchTodo();
    },
    deleteTodo: function(id) {
      this.$http
        .delete("http://localhost:3000/api/todo/" + id)
        .then(response => {
          console.log(response.json());
        });
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
