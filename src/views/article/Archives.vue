<template>
  <!-- banner -->
  <div class="banner" :style="cover">
    <h1 class="banner-title">归档</h1>
  </div>
  <!-- 归档列表 -->
  <v-card class="blog-container">
    <timeline>
      <timeline-title> 目前共计{{ state.total }}篇文章，继续加油 </timeline-title>
      <timeline-item v-for="item of state.articles" :key="item.id">
        <v-card style="padding: 20px 20px">
          <!-- 日期 -->
          <div class="time">{{ moment(item.publishTime).format("YYYY-MM-DD HH:mm:ss") }}</div>
          <!-- 文章标题 -->
          <router-link :to="'/articles/' + item.id" style="color: #666; text-decoration: none">
            {{ item.title }}
          </router-link>
        </v-card>
      </timeline-item>
    </timeline>
    <!-- 分页按钮 -->
    <v-pagination
      v-if="state.pages > 1"
      size="x-small"
      :length="state.pages"
      active-color="#00C4B6"
      v-model="state.query.pageNo"
      :total-visible="3"
      variant="elevated"
    ></v-pagination>
  </v-card>
</template>

<script setup lang="ts">
import { Timeline, TimelineTitle, TimelineItem } from "vue3-cute-component";
import { ref, reactive, watch, onMounted, inject, computed } from "vue";
import { ArticleCsServiceProxy, ArticleListQueryInput, ArticleOutput } from "@/shared/service-proxies";
import moment from "moment";
import { useApp } from "@/stores/app";
const _articleCService = new ArticleCsServiceProxy(inject("$baseurl"), inject("$api"));
const appStore = useApp();
const cover = computed(() => `background: url(${appStore.archivesCover()}) center center / cover no-repeat`);
const state = reactive({
  query: {
    pageNo: 1,
    pageSize: 10,
    keyword: "",
  } as ArticleListQueryInput,
  pages: 0,
  total: 0,
  articles: [] as ArticleOutput[],
});
// 加载数据
const loadData = async () => {
  await _articleCService.getList(state.query).then((res) => {
    if (res.result) {
      let data = res.result;
      state.pages = data?.pages ?? 0;
      state.articles = data?.rows ?? [];
      state.total = data?.total ?? 0;
    }
  });
};

watch(
  () => state.query.pageNo,
  async () => {
    window.scrollTo(0, 0);
    await loadData();
  }
);

onMounted(async () => {
  await loadData();
});
</script>

<style scoped>
.time {
  font-size: 0.75rem;
  color: #555;
  margin-right: 1rem;
}
</style>
