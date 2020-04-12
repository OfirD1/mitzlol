<template>
    <div v-if="$store.state.waiting">
        <div class="container-fluid" >
            <div class="row justify-content-md-center">
                <div class="col-12 col-md-8">
                    <div class="card" >
                        <div class="card-body">
                            <div class="card my-2">
                                <div class="card-header">
                                    <!-- hourglass -->
                                    <span>&#8987;</span>
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
	name: "spinner",
};
</script>
<style scoped>
.card-body .card-text {
	text-align: right;
}
</style>




