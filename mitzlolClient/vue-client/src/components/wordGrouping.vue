<template>
    <div v-if="!$store.state.waiting">
        <div class="container-fluid" >
            <div v-if="$store.state.total == 0">
                <div class="row justify-content-md-center">
                    <div class="col-12 col-md-8" style="margin-top: 10px;">
                        <div class="card" >
                            <div class="card-body" style="padding-bottom: 10px;">
                                <div class="card my-2">
                                    <div class="card-header">
                                        {{ "לא נמצאו תוצאות" }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="$store.state.total > 0">
                <div v-for="wordGroup in $store.state.mitzlolim" :key="wordGroup.id">
                    <div v-if="wordGroup.words.length">
                        <div class="row justify-content-md-center">
                            <div class="word-grouping col-12 col-md-8">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="card my-2">
                                            <div class="card-header">
                                                {{ wordGroup.title }}
                                            </div>
                                            <div class="card-body">
                                                <p class="card-text">
                                                    {{ wordGroup.words.join(', ') }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "wordGrouping"
};
</script>

<style scoped>
.card-body .card-text {
  text-align: right;
} 
.card-body {
    width: 100%;
}
.word-grouping {
    margin-bottom: 10px;
}
</style>




