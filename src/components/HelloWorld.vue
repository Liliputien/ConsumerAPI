<template>
  <div class="hello">
    <div>
      <button @click="getPosts()">Get posts</button>
    </div>
    <div>
      <button @click="getPost()">Get post 1</button>
    </div>
    <div>
      <button @click="createPost()">Create post</button>
    </div>
    <div>
      <button @click="updatePost()">Update post</button>
    </div>
    <div>
      <button @click="deletePost()">delete post</button>
    </div>
  </div>
</template>

<script>
import container from "@/plugins/APISConsumer";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: () => ({
      postAPI: container.get("post"),
      commentAPI: container.get("comment"),
  }),
  methods: {
    async getPosts() {
      console.log(await this.postAPI.get())
    },
    async getPost() {
      console.log(await this.postAPI.edit(1))
    },
    async createPost() {
      console.log(await this.postAPI.store({
        body: "Body 1",
        title: "title 1",
        userId: 1
      }))
    },
    async updatePost() {
      console.log(await this.postAPI.update(1, {
        body: "Body 2",
        title: "title 2",
        userId: 2
      }))
    },
    async deletePost() {
      console.log(await this.postAPI.destroy(1))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
