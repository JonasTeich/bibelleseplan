 <template>
  <div>
    <h2 class="text-lg font-bold">Gedanken</h2>
    <div class="flex py-4 items-center">
      <input
      v-model="thoughtText"
        type="text"
        class="border rounded w-full p-2"
        placeholder="Schreibe deine Gedanken..."
      >
      <fa
        @click="sendThought"
        :icon="['fas', 'chevron-circle-right']"
        class="text-4xl text-gray-700 ml-4"
      />
    </div>
    <ul>
      <li 
        v-for="item in thoughts"
        :key="item.text"
        class="thought p-2 bg-gray-100 rounded my-2"
      >
        {{ item.username }}:<br>
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    thoughtText: '',
    username: ''
  }),
  props: {
    thoughts: {
      type: Array,
      required: false,
      default() {
        return []
      }
    }
  },
  async created () {
    const { data } = await this.$supabase
      .from('users')
      .select()
      .filter('id', 'eq', this.$supabase.auth.user().id)
    this.username = data[0].username
  },
  methods: {
    async sendThought () {
      const thought = { text: this.thoughtText, username: this.username}
      if (thought.text.length > 3) {
        this.thoughts.push(thought)
        await this.$supabase
          .from(this.$route.params.plan)
          .update({ thoughts: this.thoughts })
          .filter('id', 'eq', this.$route.params.day)
        this.thoughtText = ''
      }
    }
  }
}
</script>

<style scoped>
.thought:last-child {
  margin-bottom: 0;
}
.thought:first-child {
  margin-top: 0;
}
</style>
