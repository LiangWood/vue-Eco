<template>
  <div>
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span class="category_title">管理者</span>
              <a class="d-flex align-items-center text-muted" href="#">
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/products">
                <i class="fas fa-box-open"></i>
                訂單列表
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/coupon">
                <i class="fas fa-ticket-alt"></i>
                優惠卷列表
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/orderlist">
                <i class="far fa-folder"></i>
                訂單列表
                </router-link>
              </li>
            </ul>
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span class="category_title">模擬訂單</span>
              <a class="d-flex align-items-center text-muted" href="#">
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <router-link class="nav-link" to="/custom_order">
                <i class="fas fa-box-open"></i>
                模擬訂單列表
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
  </div>
</template>

<style scoped="scss">
  .category_title {
      font-size: 20px;
      font-weight: bold;
  }
</style>
