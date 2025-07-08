// =================================================================
// Main Application Logic for HR Salary Information System
// =================================================================

// 1. IMPORT DEPENDENCIES & HTML COMPONENTS
// -----------------------------------------------------------------
import { createIcons, icons } from "lucide"
import headerHtml from "./components/header.html?raw"
import footerHtml from "./components/footer.html?raw"
import toastDefaultHtml from "./components/toastDefault.html?raw"
import toastCivilServantHtml from "./components/toastCivilServant.html?raw"
import toastGovEmpHtml from "./components/toastGovEmp.html?raw"

// 2. DEFINE CORE FUNCTIONS
// -----------------------------------------------------------------

/**
 * Injects HTML content into a specified container element.
 * @param {string} htmlContent - The HTML string to inject.
 * @param {string} containerId - The ID of the target container element.
 */
function loadComponent(htmlContent, containerId) {
  const container = document.getElementById(containerId)
  if (container) {
    container.innerHTML = htmlContent
  }
}

/**
 * Loads all page components and initializes icons.
 */
function loadPageComponents() {
  // Load common components
  loadComponent(headerHtml, "header-container")
  loadComponent(footerHtml, "footer-container")

  // Select and load the correct toast notification
  const path = window.location.pathname
  const page = path.split("/").pop() || "index.html"
  let toastHtml

  switch (page) {
    case "civil-servant.html":
      toastHtml = toastCivilServantHtml
      break
    case "gov-emp.html":
      toastHtml = toastGovEmpHtml
      break
    case "coming-soon.html":
      toastHtml = toastDefaultHtml
      break
    default:
      toastHtml = toastDefaultHtml
  }
  loadComponent(toastHtml, "toast-container")

  // Create icons after all HTML has been injected into the DOM
  createIcons({ icons })
}

/**
 * Hides the preloader once the window has fully loaded.
 */
function initializePreloader() {
  const preloader = document.getElementById("preloader")
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.classList.add("hidden")
    })
  }
}

/**
 * Sets up navigation link highlighting and smooth scrolling.
 */
function initializeNavigation() {
  // Highlight active navigation link
  const currentPath = window.location.pathname.split("/").pop() || "index.html"
  const navLinks = document.querySelectorAll("nav a")
  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href")
    if (linkPath === currentPath) {
      link.classList.add("text-indigo-600", "font-semibold")
    }
  })

  // Setup smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    })
  })
}

/**
 * Initializes the toast notification's show/hide functionality.
 */
function initializeToast() {
  const toastElement = document.getElementById("toast-notification")
  const closeButton = document.getElementById("close-toast")

  if (toastElement && closeButton) {
    // Show toast after a delay
    setTimeout(() => {
      toastElement.classList.remove("translate-y-20")
    }, 2000)

    // Handle close button click
    closeButton.addEventListener("click", () => {
      toastElement.classList.add("translate-y-20")
      setTimeout(() => {
        toastElement.style.display = "none"
      }, 500)
    })
  }
}

// 3. APPLICATION ENTRY POINT
// -----------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  initializePreloader()
  loadPageComponents()

  // Delay initialization for components that need the DOM to be fully ready
  setTimeout(() => {
    initializeNavigation()
    initializeToast()
  }, 100)
})
