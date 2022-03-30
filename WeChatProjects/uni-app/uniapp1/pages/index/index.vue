<template>
	<view class="content">
		<button type="primary" @click="handleChoose">上传图片</button>
		<image :src="imagePath" mode=""></image>
		<view class="">
			<text>识别结果</text>
			<text>{{keyword}}</text>
			<view v-for="item in similars">
				<text>{{item.keywords}}</text>
				<text>{{item.typename}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imagePath: '',
				keyword: '',
				similars: ''
			}
		},
		onLoad() {

		},
		methods: {
			handleChoose() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						// console.log(res)
						this.imagePath = res.tempFilePaths[0]
						this.imageToBase64(this.imagePath)
					}
				})
			},
			imageToBase64(imagePath) {
				wx.getFileSystemManager().readFile({
					filePath: imagePath,
					encoding: 'base64',
					success: async (res) => {
						// console.log(res)
						const result = await this.imageClassify(res.data)
						this.parseResult(result)
					}
				})
			},
			parseResult(result) {
				const itemList = result.map(item => item.keyword)
				uni.showActionSheet({
					itemList,
					success: res => {
						console.log(result)
						this.selectResult(result[res.tapIndex].keyword)
					}
				})
			},
			async selectResult(keyword) {
				this.keyword = keyword
				const searchResult = await this.searchKeyword(keyword)
				this.similars = searchResult.similars
			},
			searchKeyword(keyword) {
				return new Promise((resolve, reject) => {
					uniCloud.callFunction({
						name: 'TrashClassify',
						data: {
							keyword,
						},
						success: res => {
							resolve(res.result)
						}
					})
				})
			},
			async imageClassify(base64) {
				return new Promise((resolve) => {
					uniCloud.callFunction({
						name: 'imageClassify',
						data: {
							image: base64
						},
						success: res => {
							resolve(res.result)
						}
					})
				})
				// 获取Access Token
				const [token_error, token_res] = await uni.request({
					url: "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=ypj3tn79q8df6mBvjb1oph4g&client_secret=iq52GqGiQ9jzMcQIAvVx8fFrBZbGjXnd"
				})
				// console.log(token_res)
				const access_token = token_res.data.access_token
				
				const [error, res] = await uni.request({
					url: "https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general",
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: {
						access_token,
						image: base64
					}
				})
				
				// console.log(res)
				return res.data.result
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
