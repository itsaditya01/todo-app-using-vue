<template>
    <div id="header">
        <div class="brand">
            <h1>Todo app</h1>
        </div>
        <div class="nav-links">
                <ul>
                    <li><router-link to="/" exact>about</router-link></li>
                    <li><router-link to="/todo" exact>to-do list</router-link></li>
                </ul>

        </div>
    </div>
</template>

<script>


export default {

}
</script>

<style scoped>
    #header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        
    }
    ul {
        list-style: none;
        display: flex;
        flex-direction: row;
    }
    ul li {
        margin-left: 50px;
    }
    a {
        font-size: 20px;
        text-decoration: none;
    }
</style>
