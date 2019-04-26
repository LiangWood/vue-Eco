<template>
  <div>
    <!-- <loading :active.sync="isLoading"></loading> -->
    <div class="mt-3 d-flex">
			<button class="btn btn-outline-success btn-sm d-flex align-items-center ml-auto">
			  <i class="fas fa-plus"></i>建立優惠券
			</button>
		</div>
    <div class="table-responsive">
			<table class="table table-hover mt-3">
				<thead class="table-becare">
					<tr class="text-nowrap">
						<th>名稱</th>
						<th>代碼</th>
						<th width="100">折扣 % </th>
						<th width="200">到期日</th>
						<th width="100">是否啟用</th>
						<th width="150">操作</th>
					</tr>
				</thead>
				<tbody class="bg-white">
					<tr>
						<td>test</td>
						<td>12345</td>
						<td>20%</td>
						<td>1994/12/01</td>
						<td>
							<span class="text-success font-weight-bold">啟用</span>
							<!-- <span v-else>未啟用</span> -->
						</td>
						<td>
							<button class="btn btn-outline-secondary btn-sm mr-1">編輯</button>
							<button class="btn btn-outline-danger btn-sm">刪除</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
  </div>
</template>
