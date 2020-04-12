<template>
    <div class="container-fluid search-box-container">
        <div class="row justify-content-center">
			<span class="logo">מִצְלוֹל</span>
        </div>
        <div class="row justify-content-md-center">
            <div class="col-12 col-md-6">
                <input type="text" class="input form-control search-box" v-on:keyup="getWords" v-model="word" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
	name: "searchBox",
	data() {
		return {
			word: ""
		};
	},
	methods: {
		getWords: function(e) {
			if (e.keyCode === 13) {
				this.$store.dispatch("getMitzlolimAsync", this.word);
			}
		}
	}
};
</script>
<style scoped>
.search-box-container {
	padding-top: 100px;
}
.logo {
	font-family: Narkisim;
    font-size: 100px;
    color: #b353b5;
}
.search-box {
	direction: rtl; 
	box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 2px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
	margin-bottom: 30px;
}
</style>
