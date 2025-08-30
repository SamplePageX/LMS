<!-- Sidebar -->
<style>
    .nav-link.active {
        --phoenix-bg-opacity: 1;
        background-color: rgba(var(--phoenix-secondary-rgb), var(--phoenix-bg-opacity)) !important;
        --phoenix-text-opacity: 1;
        color: rgba(var(--phoenix-white-rgb), var(--phoenix-text-opacity)) !important;
    }
</style>

<nav class="navbar navbar-vertical navbar-expand-lg" style="display:none;">
    <div class="collapse navbar-collapse" id="navbarVerticalCollapse">
        <div class="navbar-vertical-content">
            <ul class="navbar-nav flex-column" id="navbarVerticalNav">
                <li class="nav-item">
                    <div class="nav-item-wrapper"><a class="nav-link <?= $_GET['page'] === 'pages/admin/dashboard.php' ? 'active' : '' ?> label-1" href="admin.php?page=pages/admin/dashboard.php" role="button" data-bs-toggle="" aria-expanded="false">
                            <div class="d-flex align-items-center"><span class="nav-link-icon"><span data-feather="calendar"></span></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Calendar</span></span></div>
                        </a></div>
                </li>
                <li class="nav-item">
                    <!-- label-->
                    <p class="navbar-vertical-label">Setups</p>
                    <hr class="navbar-vertical-line" /><!-- parent pages-->
                    <div class="nav-item-wrapper"><a class="nav-link <?= $_GET['page'] === 'pages/admin/credentials.php' ? 'active' : '' ?> label-1" href="admin.php?page=pages/admin/credentials.php" role="button" data-bs-toggle="" aria-expanded="false">
                            <div class="d-flex align-items-center"><span class="nav-link-icon"><span data-feather="calendar"></span></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Credentials</span></span></div>
                        </a></div>
                    <div class="nav-item-wrapper"><a class="nav-link label-1" href="apps/calendar.html" role="button" data-bs-toggle="" aria-expanded="false">
                            <div class="d-flex align-items-center"><span class="nav-link-icon"><span data-feather="calendar"></span></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Students</span></span></div>
                        </a></div>
                    <div class="nav-item-wrapper"><a class="nav-link label-1" href="apps/calendar.html" role="button" data-bs-toggle="" aria-expanded="false">
                            <div class="d-flex align-items-center"><span class="nav-link-icon"><span data-feather="calendar"></span></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Faculty</span></span></div>
                        </a></div>
                    <div class="nav-item-wrapper"><a class="nav-link label-1" href="apps/calendar.html" role="button" data-bs-toggle="" aria-expanded="false">
                            <div class="d-flex align-items-center"><span class="nav-link-icon"><span data-feather="calendar"></span></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Departments</span></span></div>
                        </a></div>
                    <div class="nav-item-wrapper"><a class="nav-link label-1" href="apps/calendar.html" role="button" data-bs-toggle="" aria-expanded="false">
                            <div class="d-flex align-items-center"><span class="nav-link-icon"><span data-feather="calendar"></span></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Building</span></span></div>
                        </a></div>
                </li>
            </ul>
        </div>
    </div>
    <div class="navbar-vertical-footer"><button class="btn navbar-vertical-toggle border-0 fw-semibold w-100 white-space-nowrap d-flex align-items-center"><span class="uil uil-left-arrow-to-left fs-8"></span><span class="uil uil-arrow-from-right fs-8"></span><span class="navbar-vertical-footer-text ms-2">Collapsed View</span></button></div>
</nav>