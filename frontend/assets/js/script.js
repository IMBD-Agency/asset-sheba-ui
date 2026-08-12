/**
 * Asset Sheba - Global JavaScript Engine
 */

// ==============================================
// PRELOADER & BARLOADER ENGINE
// ==============================================
function showPreloader(type = 'full') {
    if (type === 'full') {
        $('.preloader').removeClass('hidden');
    } else if (type === 'bar') {
        $('.barloader').stop(true, true).css({
            width: '0%',
            display: 'block'
        });

        setTimeout(() => {
            $('.barloader').css('width', '90%');
        }, 50);
    }
}

function hidePreloader(type = 'full') {
    if (type === 'full') {
        $('.preloader').addClass('hidden');
    } else if (type === 'bar') {
        $('.barloader').css('width', '100%');
        
        setTimeout(() => {
            $('.barloader').fadeOut(200, function () {
                $(this).css('width', '0%');
            });
        }, 300);
    }
}

// Automatically hide full loader on initial page load
$(window).on('load', function () {
    hidePreloader('full');
});

// ==============================================
// AUTHENTICATION UTILITIES (PASSWORD & SOCIAL)
// ==============================================

/**
 * Toggle password visibility
 * @param {string} fieldId - The ID of the password field
 */
function togglePassword(fieldId) {
    const passwordInput = document.getElementById(fieldId);
    const toggleIcon = document.getElementById(fieldId === 'password' ? 'passwordToggleIcon' : 'passwordConfirmToggleIcon');
    
    if (!passwordInput || !toggleIcon) return;
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
        toggleIcon.setAttribute('title', 'Hide password');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
        toggleIcon.setAttribute('title', 'Show password');
    }
}

/**
 * Handle social authentication (login/register)
 * @param {Event} e - Click event
 * @param {string} provider - The social provider (google, facebook)
 */
function socialAuth(e, provider) {
    const btn = (e && e.target) ? e.target.closest('.social-btn') : null;
    if (!btn) return;
    
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
    btn.style.pointerEvents = 'none';
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.pointerEvents = 'auto';
        showAuthMessage(`Connecting with ${provider}... Feature coming soon!`, 'success');
    }, 1500);
}

/**
 * Show authentication feedback message
 * @param {string} message - The message to display
 * @param {string} type - 'success' or 'error'
 */
function showAuthMessage(message, type = 'error') {
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' 
        ? 'p-3 mb-4 text-xs font-semibold text-emerald-800 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-2' 
        : 'p-3 mb-4 text-xs font-semibold text-rose-800 bg-rose-50 rounded-xl border border-rose-200 flex items-center gap-2';
    
    messageDiv.innerHTML = `<i class="fas fa-${type === 'success' ? 'circle-check text-emerald-600' : 'triangle-exclamation text-rose-600'}"></i> <span>${message}</span>`;
    
    const container = document.querySelector('.login-container, .register-container, #auth-modal-card');
    if (container) {
        container.prepend(messageDiv);
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

/**
 * Initialize floating labels for form inputs
 */
function initializeAuthFloatingLabels() {
    $('.form-control').each(function() {
        const input = $(this);
        
        if (input.val()) {
            input.addClass('has-value');
        }
        
        input.on('focus', function() {
            $(this).parent().addClass('focused');
        });
        
        input.on('blur', function() {
            $(this).parent().removeClass('focused');
            if ($(this).val()) {
                $(this).addClass('has-value');
            } else {
                $(this).removeClass('has-value');
            }
        });
        
        input.on('input', function() {
            if ($(this).val()) {
                $(this).addClass('has-value');
            } else {
                $(this).removeClass('has-value');
            }
        });

        if (input.val() && input.val().trim() !== '') {
            input.addClass('has-value');
        }
    });
}

// ==============================================
// DYNAMIC MAIN MIN-HEIGHT CALCULATION (100vh - Header Height)
// ==============================================
function updateMainMinHeight() {
    const mainEl = document.querySelector('main');
    const headerEl = document.getElementById('main-header');
    if (!mainEl) return;
    
    let headerHeight = 0;
    if (headerEl) {
        headerHeight = headerEl.offsetHeight || 0;
    }
    
    // Dynamically set min-height taking header height into account
    mainEl.style.minHeight = `calc(100vh - ${headerHeight}px)`;
}

// ==============================================
// GLOBAL DOM READY INITIALIZATIONS
// ==============================================
$(document).ready(function() {
    // Dynamic Main Height
    updateMainMinHeight();
    
    // Floating Labels
    if ($('.login-page, .register-page, .form-control').length) {
        initializeAuthFloatingLabels();
    }
});

// Window Listeners for Dynamic Main Height
window.addEventListener('resize', updateMainMinHeight);
window.addEventListener('load', updateMainMinHeight);
