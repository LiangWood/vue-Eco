<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">前台測試</a>
      <!-- 購物車內的數量 (Button 內包含 icon, 數量 badge) -->
      <div class="dropdown ml-auto">
        <button class="btn btn-sm btn-cart" data-toggle="dropdown" data-flip="false">
          <i class="fa fa-shopping-cart text-dark fa-2x" aria-hidden="true"></i>
          <span class="badge badge-pill badge-danger">9</span>
          <span class="sr-only">unread messages</span>
        </button>
        <div
          class="dropdown-menu dropdown-menu-right p-3"
          style="min-width: 300px"
          data-offset="400"
        >
          <h6>已選擇商品</h6>
          <table class="table table-sm">
            <tbody>
              <tr>
                <td class="align-middle text-center">
                  <a
                    href="#removeModal"
                    class="text-muted"
                    data-toggle="modal"
                    data-title="刪除 金牌西裝 1 件"
                  >
                    <i class="fas fa-trash-alt" aria-hidden="true"></i>
                  </a>
                </td>
                <td class="align-middle">金牌西裝</td>
                <td class="align-middle">1 件</td>
                <td class="align-middle text-right">$520</td>
              </tr>
            </tbody>
          </table>
          <a href="shoppingCart-checkout.html" class="btn btn-primary btn-block">
            <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
          </a>
        </div>
      </div>
    </nav>
    <div class="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end">
      <div class="container">
        <div class="p-3 bg-lighter">
          <h1 class="display-3 font-weight-bold"></h1>
        </div>
      </div>
    </div>
  </div>
</template>
