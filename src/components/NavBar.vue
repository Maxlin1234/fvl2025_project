<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-logo">
        <img src="@/assets/fvl_logo.png" alt="FVL Logo" class="logo-img" />
        <!-- <h2>FVL2025</h2> -->
      </div>
      <ul class="nav-main-menu">
        <li><a href="#home">首頁</a></li>
        <li><a href="#news">最新消息</a></li>
        <li><a href="#archive">過去藝術節</a></li>
      </ul>
      <div class="nav-toggle" @click="toggleNavMenu">
        <span class="nav-toggle-text">選單</span>
        <span class="nav-toggle-icon">☰</span>
      </div>
      <div class="nav-overlay" v-if="isNavOpen" @click="closeNavMenu"></div>
      <div class="nav-panel" :class="{ 'nav-panel-open': isNavOpen }">
        <div class="nav-panel-header">
          <h3>FVL2025</h3>
          <button class="nav-close" @click="closeNavMenu">✕</button>
        </div>
        <div class="nav-panel-content">
          <div v-for="(item, idx) in navItems" :key="item.title" class="nav-section">
            <div class="nav-section-header" @click="toggleSection(idx)">
              <span class="nav-section-title">{{ item.title }}</span>
              <span class="nav-section-arrow" :class="{ open: openSection === idx }">{{ openSection === idx ? '↑' : '↓' }}</span>
            </div>
            <transition name="fade">
              <div v-if="openSection === idx" class="nav-submenu">
                <template v-if="item.children && item.children.length">
                  <button v-for="child in item.children" :key="child.label" class="nav-sub-btn" @click="handleNav(child)">
                    {{ child.label }}
                  </button>
                </template>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    scrollToSection: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      isNavOpen: false,
      openSection: null,
      navItems: [
        {
          title: 'Events',
          children: [
            { label: 'SAT Fest', anchor: 'home' },
            { label: 'Other Event', anchor: 'about' }
          ]
        },
        {
          title: 'Youth Workshops',
          children: [
            { label: 'Workshop 1', anchor: 'services' },
            { label: 'Workshop 2', anchor: 'services' }
          ]
        },
        {
          title: 'Training Programs',
          children: [
            { label: 'Program 1', anchor: 'portfolio' },
            { label: 'Program 2', anchor: 'portfolio' }
          ]
        },
        {
          title: 'Artists',
          children: [
            { label: 'Residency Program', anchor: 'portfolio' },
            { label: 'SAT Fest', anchor: 'portfolio' },
            { label: 'Interviews', anchor: 'portfolio' },
            { label: 'Open Calls', anchor: 'portfolio' }
          ]
        },
        {
          title: 'Innovation',
          children: []
        },
        {
          title: 'Restaurant & Café',
          children: []
        }
      ]
    }
  },
  methods: {
    toggleNavMenu() {
      this.isNavOpen = true;
    },
    closeNavMenu() {
      this.isNavOpen = false;
    },
    toggleSection(idx) {
      this.openSection = this.openSection === idx ? null : idx;
    },
    handleNav(child) {
      this.closeNavMenu();
      this.scrollToSection(child.anchor);
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: #111;
  backdrop-filter: blur(10px);
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 70px;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 5%;
}

.logo-img {
  height: 36px;
  width: auto;
  display: block;
}

.nav-logo h2 {
  color: #fff;
  font-weight: bold;
  font-size: 1.3rem;
  margin: 0;
}

.nav-main-menu {
  display: flex;
  gap: 32px;
  margin-left: 32px;
  list-style: none;
}

.nav-main-menu li a {
  color: #fff;
  font-size: 1.08rem;
  font-weight: 500;
  text-decoration: none;
  padding: 6px 0;
  transition: color 0.2s;
}

.nav-main-menu li a:hover {
  color: #3ecfff;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  color: #fff;
}

.nav-toggle-text {
  font-size: 1.2rem;
  margin-right: 10px;
}

.nav-toggle-icon {
  font-size: 1.5rem;
}

.nav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
}

.nav-panel {
  position: fixed;
  top: 0;
  right: -300px;
  width: 300px;
  height: 100%;
  background: #111;
  z-index: 1000;
  padding: 20px;
  transition: right 0.3s ease;
  color: #fff;
}

.nav-panel-open {
  right: 0;
}

.nav-panel-header {
  border-bottom: 1.5px solid #fff;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-panel-header h3 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
}

.nav-panel-header button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #fff;
}

.nav-panel-content {
  padding-top: 20px;
}

.nav-section {
  border-bottom: 1px solid #333;
  padding: 0 0 0 0;
}

.nav-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 22px 0 22px 0;
  cursor: pointer;
  user-select: none;
  color: #fff;
}

.nav-section-title {
  font-size: 1.15em;
}

.nav-section-arrow {
  font-size: 1.2em;
  margin-left: 10px;
  transition: transform 0.3s;
  color: #fff;
}

.nav-section-arrow.open {
  transform: rotate(180deg);
}

.nav-submenu {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 18px 0 18px 0;
}

.nav-sub-btn {
  border: 1.5px solid #fff;
  background: transparent;
  color: #fff;
  border-radius: 25px;
  padding: 8px 22px;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 6px;
  margin-right: 6px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border 0.2s;
}

.nav-sub-btn:hover, .nav-sub-btn.active {
  background: #fff;
  color: #111;
  border: 1.5px solid #fff;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .nav-toggle {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 15px;
    background: #111;
    color: #fff;
    border-radius: 25px;
    font-weight: 500;
  }
  .nav-panel {
    width: 100%;
    right: -100%;
  }
  .nav-panel-open {
    right: 0;
  }
}

@media (max-width: 900px) {
  .nav-main-menu {
    display: none;
  }
}
</style> 