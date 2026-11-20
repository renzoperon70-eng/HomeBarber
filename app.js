/**
 * VIP Barber Home - Booking System & Management
 * Estilo Tradicional: Rojo, Azul, Blanco y Negro con Cilindro Giratorio de Barbería
 * Sistema de Seña Anticancelación y Seguridad para Servicio a Domicilio
 */

// Contraseña requerida para modificar horarios
const SCHEDULE_PASSWORD = "colo13579246810gG";

// Servicios Oficiales Actualizados
const DEFAULT_SERVICES = [
    {
        id: "corte-fade",
        name: "Corte Clásico / Fade Moderno",
        description: "Degradado tradicional o corte a tijera con navaja descartable, líneas definidas y acabado limpio.",
        duration: 45,
        price: 10000,
        icon: "fa-scissors",
        badge: "Clásico Barber"
    },
    {
        id: "corte-infantil",
        name: "Corte Infantil",
        description: "Corte moderno, cuidadoso y con paciencia para niños y jóvenes (hasta 14 años).",
        duration: 35,
        price: 12000,
        icon: "fa-child",
        badge: "Kids"
    },
    {
        id: "combo-padre-hijo",
        name: "Combo Padre e Hijo",
        description: "Dos cortes completos a domicilio en la misma visita. Estilo y comodidad familiar.",
        duration: 75,
        price: 18000,
        icon: "fa-people-roof",
        badge: "Promo Dúo"
    },
    {
        id: "perfilado-barba",
        name: "Perfilado de Barbas",
        description: "Diseño y alineación milimétrica con toalla caliente al vapor, navaja esterilizada y aceites.",
        duration: 25,
        price: 3000,
        icon: "fa-wand-magic-sparkles",
        badge: "Navaja & Toalla"
    },
    {
        id: "combo-vip",
        name: "Combo Completo VIP",
        description: "Corte completo o fade + ritual de barba con toalla caliente + perfilado de cejas.",
        duration: 65,
        price: 15000,
        icon: "fa-crown",
        badge: "Servicio Total"
    },
    {
        id: "mascarilla",
        name: "Mascarilla Facial Express",
        description: "Limpieza facial de puntos negros con mascarilla peel-off exfoliante y loción refrescante.",
        duration: 20,
        price: 2500,
        icon: "fa-spray-can-sparkles",
        badge: "Skin Care"
    }
];

// Inventario y Costo Inicial Oficial (Planilla del Barbero)
const DEFAULT_INVENTORY = [
    { id: "inv-1", name: "maquina de corte", description: "Vgr-003", qty: 1, unitPrice: 170000, category: "Maquinaria", icon: "fa-scissors" },
    { id: "inv-2", name: "patillera", description: "Vgr-988", qty: 1, unitPrice: 95000, category: "Maquinaria", icon: "fa-bolt" },
    { id: "inv-3", name: "Tijera de filo", description: "Jaguar", qty: 1, unitPrice: 1300000, category: "Herramientas", icon: "fa-hand-scissors" },
    { id: "inv-4", name: "Tijera entresacar", description: "Olise", qty: 2, unitPrice: 70000, category: "Herramientas", icon: "fa-scissors" },
    { id: "inv-5", name: "Pulidora", description: "Kemei", qty: 1, unitPrice: 26000, category: "Maquinaria", icon: "fa-wand-magic-sparkles" },
    { id: "inv-6", name: "Sopladora", description: "Inalambrica", qty: 1, unitPrice: 70000, category: "Herramientas", icon: "fa-wind" },
    { id: "inv-7", name: "Quitapelos", description: "Negro- comun", qty: 1, unitPrice: 10000, category: "Accesorios", icon: "fa-broom" },
    { id: "inv-8", name: "Peines", description: "Negro-Plastico", qty: 5, unitPrice: 5000, category: "Accesorios", icon: "fa-bars" },
    { id: "inv-9", name: "Peines guias", description: "VGR", qty: 4, unitPrice: 6000, category: "Accesorios", icon: "fa-grip-lines" },
    { id: "inv-10", name: "Capas", description: "Tradicional-Arg", qty: 2, unitPrice: 25000, category: "Accesorios", icon: "fa-shirt" },
    { id: "inv-11", name: "papel de cuello", description: "rollo individual", qty: 1, unitPrice: 5000, category: "Insumos", icon: "fa-scroll" },
    { id: "inv-12", name: "Spray", description: "5x1", qty: 1, unitPrice: 15000, category: "Insumos", icon: "fa-spray-can" },
    { id: "inv-13", name: "Motocicleta", description: "Honda wave 110cc", qty: 1, unitPrice: 2900000, category: "Movilidad", icon: "fa-motorcycle" }
];

// Costos Fijos Mensuales del Microemprendimiento a Domicilio
const DEFAULT_FIXED_COSTS = [
    { id: "fc-1", name: "Combustible / Nafta Moto (Honda Wave)", description: "Traslados a domicilios (~30 lts/mes)", amount: 35000, period: "Mensual", icon: "fa-gas-pump" },
    { id: "fc-2", name: "Seguro Motocicleta Honda Wave 110cc", description: "Cobertura contra robo e incidentes", amount: 22000, period: "Mensual", icon: "fa-shield-halved" },
    { id: "fc-3", name: "Mantenimiento Preventivo Moto & Herramientas", description: "Aceite 4T, afilado y desinfección", amount: 18000, period: "Mensual", icon: "fa-wrench" },
    { id: "fc-4", name: "Plan Móvil / Datos 4G & WhatsApp", description: "Atención turnos, mapas GPS e internet", amount: 12000, period: "Mensual", icon: "fa-mobile-screen" },
    { id: "fc-5", name: "Monotributo / Impuesto Microemprendimiento", description: "Régimen simplificado AFIP / ARCA", amount: 26000, period: "Mensual", icon: "fa-receipt" },
    { id: "fc-6", name: "Reposición Insumos Descartables", description: "Navajas, papel de cuello, toallitas y spray 5x1", amount: 22000, period: "Mensual", icon: "fa-box-open" }
];

// Comprobamos versión de catálogo
const SERVICES_VERSION = "barber_pole_v5_restored";
let storedServices = null;
try {
    const savedVer = localStorage.getItem('vbh_services_version');
    if (savedVer === SERVICES_VERSION) {
        storedServices = JSON.parse(localStorage.getItem('vbh_services'));
    }
} catch (e) {
    storedServices = null;
}

if (!storedServices || !Array.isArray(storedServices) || storedServices.length !== DEFAULT_SERVICES.length) {
    storedServices = DEFAULT_SERVICES;
    localStorage.setItem('vbh_services', JSON.stringify(DEFAULT_SERVICES));
    localStorage.setItem('vbh_services_version', SERVICES_VERSION);
}

// Comprobamos versión de inventario y costos fijos
const INVENTORY_VERSION = "barber_inv_v1";
let storedInventory = null;
try {
    if (localStorage.getItem('vbh_inventory_version') === INVENTORY_VERSION) {
        storedInventory = JSON.parse(localStorage.getItem('vbh_inventory'));
    }
} catch(e) {
    storedInventory = null;
}
if (!storedInventory || !Array.isArray(storedInventory) || storedInventory.length === 0) {
    storedInventory = DEFAULT_INVENTORY;
    localStorage.setItem('vbh_inventory', JSON.stringify(DEFAULT_INVENTORY));
    localStorage.setItem('vbh_inventory_version', INVENTORY_VERSION);
}

let storedFixedCosts = null;
try {
    if (localStorage.getItem('vbh_fixed_costs_version') === INVENTORY_VERSION) {
        storedFixedCosts = JSON.parse(localStorage.getItem('vbh_fixed_costs'));
    }
} catch(e) {
    storedFixedCosts = null;
}
if (!storedFixedCosts || !Array.isArray(storedFixedCosts) || storedFixedCosts.length === 0) {
    storedFixedCosts = DEFAULT_FIXED_COSTS;
    localStorage.setItem('vbh_fixed_costs', JSON.stringify(DEFAULT_FIXED_COSTS));
    localStorage.setItem('vbh_fixed_costs_version', INVENTORY_VERSION);
}

// Número oficial de WhatsApp del Barbero (+54 3757 632529 -> internacional: 5493757632529)
const OFFICIAL_BARBER_PHONE = "5493757632529";

// Función normalizadora de teléfonos para enlaces wa.me
function normalizeWhatsAppNumber(phone) {
    if (!phone) return OFFICIAL_BARBER_PHONE;
    // Elimina signos +, espacios, guiones, paréntesis y corchetes < >
    let clean = phone.toString().replace(/[^0-9]/g, '');

    // Caso Argentina: si tiene 12 dígitos (ej: 54 3757 632529) le agregamos el '9' móvil internacional requerido por WhatsApp
    if (clean.startsWith('54') && !clean.startsWith('549') && clean.length === 12) {
        clean = '549' + clean.slice(2);
    }
    // Si tiene 10 dígitos (ej: 3757632529) le anteponemos el código internacional de Argentina + 9
    else if (!clean.startsWith('54') && clean.length === 10) {
        clean = '549' + clean;
    }
    return clean || OFFICIAL_BARBER_PHONE;
}

// Cargar o migrar teléfono del barbero al número oficial (+54 3757 632529)
let savedBarberPhone = localStorage.getItem('vbh_barber_phone');
if (!savedBarberPhone || savedBarberPhone === '5491123456789' || savedBarberPhone === '5491100000000' || savedBarberPhone.startsWith('54911')) {
    savedBarberPhone = OFFICIAL_BARBER_PHONE;
    localStorage.setItem('vbh_barber_phone', OFFICIAL_BARBER_PHONE);
} else {
    savedBarberPhone = normalizeWhatsAppNumber(savedBarberPhone);
    localStorage.setItem('vbh_barber_phone', savedBarberPhone);
}

// App State
let state = {
    barberPhone: savedBarberPhone,
    barberName: localStorage.getItem('vbh_barber_name') || 'VIP Barber Home • Barbería Tradicional',
    // Configuración de Seña Anticancelación
    depositPercent: parseInt(localStorage.getItem('vbh_deposit_percent'), 10) || 30,
    barberAlias: localStorage.getItem('vbh_barber_alias') || 'barbero.domicilio.mp',
    barberCbu: localStorage.getItem('vbh_barber_cbu') || '0000003100084729104829',
    barberHolder: localStorage.getItem('vbh_barber_holder') || 'Leonardo Gómez (Barbería)',
    
    services: storedServices,
    inventory: storedInventory,
    fixedCosts: storedFixedCosts,
    bookings: JSON.parse(localStorage.getItem('vbh_bookings')) || [
        {
            id: "VB-8291",
            createdAt: new Date().toISOString(),
            date: getFormattedDateOffset(1),
            time: "10:00",
            clientName: "Esteban Quiroga",
            clientPhone: "11 5544 3322",
            address: "Av. Corrientes 3400",
            apt: "Piso 3 Dto A",
            zone: "Almagro",
            paymentMethod: "Transferencia / Mercado Pago",
            services: ["Combo Completo VIP"],
            total: 15000,
            deposit: 4500,
            balance: 10500,
            depositStatus: "Acreditada",
            status: "Confirmado",
            notes: "Seña recibida por Mercado Pago"
        }
    ],
    // Horarios personalizados por fecha: { "YYYY-MM-DD": { isClosed: boolean, slots: string[] } }
    customSchedules: JSON.parse(localStorage.getItem('vbh_custom_schedules')) || {},
    selectedServices: [],
    selectedDate: null,
    selectedTime: null
};

// Available daily time slots por defecto
const TIME_SLOTS = [
    "09:00", "10:00", "11:00", "12:00", "13:00", 
    "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
];

// Estado temporal del gestor de horarios del barbero
let managerState = {
    date: null,
    isClosed: false,
    slots: []
};

// Helper: Format Date Offset (Days)
function getFormattedDateOffset(offset) {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return d.toISOString().split('T')[0];
}

// Format Price
function formatPrice(num) {
    return '$' + Number(num).toLocaleString('es-AR');
}

// Calcular monto de la seña (redondeado a centenas)
function getDepositAmount(total) {
    if (!total || total <= 0) return 0;
    const calc = Math.round((total * state.depositPercent / 100) / 100) * 100;
    return Math.max(calc, 1000);
}

// Document Ready
document.addEventListener('DOMContentLoaded', () => {
    initServicesCatalog();
    initBookingServices();
    initDatePicker();
    initBookingNavigation();
    initFAQ();
    initAdminModal();
    initScheduleAuthAndManager();
    initFinanceModule();
    updateWhatsAppLink();
});

// Update global WhatsApp button links (+54 3757 632529)
function updateWhatsAppLink() {
    const phone = normalizeWhatsAppNumber(state.barberPhone);
    const defaultMsg = encodeURIComponent("¡Hola! Quisiera consultar disponibilidad para un corte de barbería a domicilio.");
    const waUrl = `https://wa.me/${phone}?text=${defaultMsg}`;

    const heroBtn = document.getElementById('heroWhatsAppBtn');
    if (heroBtn) heroBtn.href = waUrl;

    const floatingBtn = document.getElementById('floatingWhatsAppBtn');
    if (floatingBtn) floatingBtn.href = waUrl;

    const navBtn = document.getElementById('navWhatsAppBtn');
    if (navBtn) navBtn.href = waUrl;

    const footerBtn = document.getElementById('footerWhatsAppBtn');
    if (footerBtn) footerBtn.href = waUrl;
}

// Render Services Catalog (Public Presentation)
function initServicesCatalog() {
    const container = document.getElementById('servicesCardsContainer');
    if (!container) return;

    container.innerHTML = state.services.map(s => `
        <div class="tech-service-card p-6 rounded-2xl bg-dark-900 border border-gray-800 hover:border-barber-blue transition-all flex flex-col justify-between group relative overflow-hidden">
            <!-- Subtle Ribbon Glow -->
            <div class="absolute -top-12 -right-12 w-28 h-28 bg-barber-blue/10 rounded-full blur-xl group-hover:bg-barber-red/15 transition-all"></div>
            
            <div>
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 rounded-xl bg-dark-950 border border-gray-700 text-barber-blue flex items-center justify-center text-xl shadow-md group-hover:scale-105 group-hover:border-barber-red group-hover:text-barber-red transition-all">
                        <i class="fa-solid ${s.icon}"></i>
                    </div>
                    ${s.badge ? `<span class="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-barber-red/15 text-rose-300 border border-barber-red/30 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-barber-red animate-pulse"></span>${s.badge}</span>` : ''}
                </div>

                <h3 class="text-white font-bold text-lg mb-2 group-hover:text-barber-blue transition-colors">${s.name}</h3>
                <p class="text-xs text-gray-400 leading-relaxed mb-4">${s.description}</p>

                <div class="flex items-center justify-between pt-3 border-t border-gray-800 mb-5">
                    <span class="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                        <i class="fa-regular fa-clock text-barber-blue"></i> ${s.duration} min
                    </span>
                    <span class="font-mono text-lg font-extrabold text-white tracking-tight bg-dark-950 px-3 py-1 rounded-lg border border-gray-800">
                        ${formatPrice(s.price)}
                    </span>
                </div>
            </div>

            <button onclick="preSelectService('${s.id}')" class="w-full py-2.5 rounded-xl bg-dark-800 hover:bg-barber-red text-white font-bold text-xs transition duration-200 flex items-center justify-center gap-2 border border-gray-700 hover:border-barber-red">
                <i class="fa-solid fa-calendar-plus text-xs"></i> Reservar Este Servicio
            </button>
        </div>
    `).join('');
}

// Pre-select service from catalog click
window.preSelectService = function(serviceId) {
    state.selectedServices = [serviceId];
    renderBookingServices();
    updateBookingSummary();
    const target = document.getElementById('reservar');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
    showToast("Servicio seleccionado. Selecciona día y horario a continuación.", "info");
};

// Render Services in Booking Step 1
function initBookingServices() {
    renderBookingServices();
}

function renderBookingServices() {
    const container = document.getElementById('bookingServicesList');
    if (!container) return;

    container.innerHTML = state.services.map(s => {
        const isSelected = state.selectedServices.includes(s.id);
        return `
            <div onclick="toggleServiceSelection('${s.id}')" class="service-card-item p-4 rounded-2xl border cursor-pointer flex items-center justify-between gap-3 ${isSelected ? 'selected' : 'border-gray-800 bg-dark-900'}">
                <div class="flex items-center gap-3.5">
                    <div class="w-11 h-11 rounded-xl ${isSelected ? 'bg-barber-red text-white font-bold shadow-md shadow-barber-red/30' : 'bg-dark-950 text-barber-blue border border-gray-800'} flex items-center justify-center text-base transition-all">
                        <i class="fa-solid ${s.icon}"></i>
                    </div>
                    <div>
                        <h4 class="text-sm font-bold text-white flex items-center gap-2">
                            ${s.name}
                            ${s.badge ? `<span class="text-[9px] font-mono px-2 py-0.5 rounded-full bg-barber-blue/15 text-blue-300 border border-barber-blue/30">${s.badge}</span>` : ''}
                        </h4>
                        <div class="flex items-center gap-2.5 text-xs text-gray-400 mt-1">
                            <span class="font-mono text-[11px]"><i class="fa-regular fa-clock text-barber-blue"></i> ${s.duration} min</span>
                            <span class="text-gray-600">•</span>
                            <span class="font-mono font-bold text-white text-xs bg-dark-950 px-2 py-0.5 rounded border border-gray-800">${formatPrice(s.price)}</span>
                        </div>
                    </div>
                </div>
                <div class="w-6 h-6 rounded-lg border ${isSelected ? 'border-barber-red bg-barber-red text-white' : 'border-gray-700 bg-dark-950'} flex items-center justify-center text-xs font-bold transition-all">
                    ${isSelected ? '<i class="fa-solid fa-check"></i>' : ''}
                </div>
            </div>
        `;
    }).join('');
}

window.toggleServiceSelection = function(id) {
    if (state.selectedServices.includes(id)) {
        state.selectedServices = state.selectedServices.filter(s => s !== id);
    } else {
        state.selectedServices.push(id);
    }
    renderBookingServices();
    updateBookingSummary();
};

function updateBookingSummary() {
    const selectedObjs = state.services.filter(s => state.selectedServices.includes(s.id));
    const totalCount = selectedObjs.length;
    const totalDuration = selectedObjs.reduce((acc, curr) => acc + curr.duration, 0);
    const totalPrice = selectedObjs.reduce((acc, curr) => acc + curr.price, 0);
    const depositAmount = getDepositAmount(totalPrice);
    const balanceAmount = totalPrice - depositAmount;

    const countEl = document.getElementById('selectedCountText');
    const durEl = document.getElementById('selectedDurationText');
    const priceEl = document.getElementById('selectedPriceText');
    const depositEl = document.getElementById('selectedDepositText');
    const balanceEl = document.getElementById('selectedBalanceText');
    const nextBtn = document.getElementById('btnGoToStep2');

    if (countEl) countEl.innerText = totalCount;
    if (durEl) durEl.innerText = `${totalDuration} min`;
    if (priceEl) priceEl.innerText = formatPrice(totalPrice);
    if (depositEl) depositEl.innerText = formatPrice(depositAmount);
    if (balanceEl) balanceEl.innerText = formatPrice(balanceAmount);
    if (nextBtn) nextBtn.disabled = totalCount === 0;
}

// Step 2: Date & Time Picker (Respeta horarios modificados por el barbero)
function initDatePicker() {
    const carousel = document.getElementById('datePickerCarousel');
    if (!carousel) return;

    const days = [];
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    for (let i = 0; i < 14; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        const iso = d.toISOString().split('T')[0];
        const dayOfWeek = d.getDay(); // 0 is Sunday
        const dayNum = d.getDate();
        const dayStr = dayNames[dayOfWeek];
        const monthStr = monthNames[d.getMonth()];

        // Comprobar si hay modificación personalizada para este día
        let isClosed = false;
        if (state.customSchedules && state.customSchedules[iso]) {
            isClosed = state.customSchedules[iso].isClosed === true;
        } else {
            isClosed = dayOfWeek === 0; // Domingo cerrado por defecto
        }

        days.push({
            iso,
            dayStr,
            dayNum,
            monthStr,
            isClosed,
            isToday: i === 0
        });
    }

    // Seleccionar el primer día disponible
    const firstValid = days.find(d => !d.isClosed) || days[0];
    if (!state.selectedDate || !days.some(d => d.iso === state.selectedDate && !d.isClosed)) {
        state.selectedDate = firstValid.iso;
    }

    carousel.innerHTML = days.map(d => {
        const isSelected = state.selectedDate === d.iso;
        const disabledClass = d.isClosed ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer';

        return `
            <div onclick="selectBookingDate('${d.iso}')" class="date-picker-card flex-shrink-0 w-20 p-3 rounded-2xl border text-center ${isSelected ? 'selected' : 'border-gray-800 bg-dark-900'} ${disabledClass}">
                <span class="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">${d.isToday ? 'Hoy' : d.dayStr}</span>
                <p class="text-xl font-mono font-extrabold text-white my-0.5">${d.dayNum}</p>
                <span class="block text-[10px] uppercase font-mono ${d.isClosed ? 'text-rose-400 font-bold' : 'text-gray-400'}">
                    ${d.isClosed ? 'Cerrado' : d.monthStr}
                </span>
            </div>
        `;
    }).join('');

    renderTimeSlots();
}

window.selectBookingDate = function(iso) {
    state.selectedDate = iso;
    state.selectedTime = null;

    // Refresh carousel active classes
    const cards = document.querySelectorAll('.date-picker-card');
    cards.forEach(card => card.classList.remove('selected'));

    const carousel = document.getElementById('datePickerCarousel');
    if (carousel) {
        const days = carousel.children;
        for (let card of days) {
            if (card.getAttribute('onclick') && card.getAttribute('onclick').includes(iso)) {
                card.classList.add('selected');
            }
        }
    }

    // Update label
    const label = document.getElementById('selectedDateLabel');
    if (label) {
        const [year, month, day] = iso.split('-');
        label.innerText = `${day}/${month}/${year}`;
    }

    renderTimeSlots();
    const nextBtn = document.getElementById('btnGoToStep3');
    if (nextBtn) nextBtn.disabled = true;
};

function renderTimeSlots() {
    const container = document.getElementById('timeSlotsContainer');
    const alertEl = document.getElementById('noSlotAlert');
    if (!container) return;

    // Verificar si la fecha está marcada como cerrada por el barbero
    const customConfig = state.customSchedules ? state.customSchedules[state.selectedDate] : null;
    if (customConfig && customConfig.isClosed) {
        container.innerHTML = `
            <div class="col-span-full p-4 rounded-xl bg-dark-900 border border-barber-red/30 text-rose-300 text-xs font-mono text-center">
                <i class="fa-solid fa-circle-exclamation mr-1.5"></i> El barbero no atenderá en esta fecha. Por favor selecciona otro día.
            </div>
        `;
        if (alertEl) alertEl.classList.add('hidden');
        return;
    }

    // Determinar franjas horarias activas para el día
    let activeSlots = TIME_SLOTS;
    if (customConfig && Array.isArray(customConfig.slots)) {
        activeSlots = customConfig.slots;
    }

    // Turnos ya reservados
    const bookedTimesForDate = state.bookings
        .filter(b => b.date === state.selectedDate && b.status !== 'Cancelado')
        .map(b => b.time);

    // Si es hoy, inhabilitar horas pasadas
    const now = new Date();
    const isToday = state.selectedDate === now.toISOString().split('T')[0];
    const currentHour = now.getHours();

    let availableCount = 0;

    if (activeSlots.length === 0) {
        container.innerHTML = `
            <div class="col-span-full p-4 rounded-xl bg-dark-900 border border-gray-800 text-gray-400 text-xs font-mono text-center">
                No hay horarios disponibles configurados para este día.
            </div>
        `;
        if (alertEl) alertEl.classList.add('hidden');
        return;
    }

    container.innerHTML = activeSlots.map(slot => {
        const slotHour = parseInt(slot.split(':')[0], 10);
        const isPast = isToday && slotHour <= currentHour;
        const isBooked = bookedTimesForDate.includes(slot);
        const isOccupied = isPast || isBooked;

        if (!isOccupied) availableCount++;
        const isSelected = state.selectedTime === slot;

        return `
            <button type="button" 
                    onclick="selectTimeSlot('${slot}')" 
                    ${isOccupied ? 'disabled' : ''} 
                    class="time-slot-btn py-2.5 px-3 rounded-xl border text-xs font-mono font-semibold ${isSelected ? 'selected' : 'border-gray-800 bg-dark-900 text-gray-200'}">
                ${slot} hs
            </button>
        `;
    }).join('');

    if (alertEl) {
        if (availableCount === 0) {
            alertEl.classList.remove('hidden');
        } else {
            alertEl.classList.add('hidden');
        }
    }
}

window.selectTimeSlot = function(slot) {
    state.selectedTime = slot;
    renderTimeSlots();
    const nextBtn = document.getElementById('btnGoToStep3');
    if (nextBtn) nextBtn.disabled = false;
};

// Booking Wizard Step Navigation
function initBookingNavigation() {
    const step1 = document.getElementById('bookingStep1');
    const step2 = document.getElementById('bookingStep2');
    const step3 = document.getElementById('bookingStep3');

    const badge1 = document.getElementById('stepBadge1');
    const badge2 = document.getElementById('stepBadge2');
    const badge3 = document.getElementById('stepBadge3');

    const line1 = document.getElementById('stepLine1');
    const line2 = document.getElementById('stepLine2');

    const btnGoToStep2 = document.getElementById('btnGoToStep2');
    const btnBackToStep1 = document.getElementById('btnBackToStep1');
    const btnGoToStep3 = document.getElementById('btnGoToStep3');
    const btnBackToStep2 = document.getElementById('btnBackToStep2');
    const btnSubmit = document.getElementById('btnSubmitBooking');

    // Step 1 -> Step 2
    if (btnGoToStep2) {
        btnGoToStep2.addEventListener('click', () => {
            if (state.selectedServices.length === 0) {
                showToast("Por favor selecciona al menos un servicio.", "warning");
                return;
            }
            step1.classList.add('hidden');
            step2.classList.remove('hidden');

            badge2.classList.replace('bg-dark-700', 'bg-barber-blue');
            badge2.classList.replace('text-gray-400', 'text-white');
            line1.classList.replace('bg-gray-800', 'bg-barber-red');
        });
    }

    // Step 2 -> Step 1
    if (btnBackToStep1) {
        btnBackToStep1.addEventListener('click', () => {
            step2.classList.add('hidden');
            step1.classList.remove('hidden');

            badge2.classList.replace('bg-barber-blue', 'bg-dark-700');
            badge2.classList.replace('text-white', 'text-gray-400');
            line1.classList.replace('bg-barber-red', 'bg-gray-800');
        });
    }

    // Step 2 -> Step 3
    if (btnGoToStep3) {
        btnGoToStep3.addEventListener('click', () => {
            if (!state.selectedTime) {
                showToast("Por favor elige un horario para tu turno.", "warning");
                return;
            }
            step2.classList.add('hidden');
            step3.classList.remove('hidden');

            badge3.classList.replace('bg-dark-700', 'bg-barber-red');
            badge3.classList.replace('text-gray-400', 'text-white');
            line2.classList.replace('bg-gray-800', 'bg-barber-blue');

            populateRecapStep3();
        });
    }

    // Step 3 -> Step 2
    if (btnBackToStep2) {
        btnBackToStep2.addEventListener('click', () => {
            step3.classList.add('hidden');
            step2.classList.remove('hidden');

            badge3.classList.replace('bg-barber-red', 'bg-dark-700');
            badge3.classList.replace('text-white', 'text-gray-400');
            line2.classList.replace('bg-barber-blue', 'bg-gray-800');
        });
    }

    // Final Submit Booking
    if (btnSubmit) {
        btnSubmit.addEventListener('click', handleBookingSubmit);
    }
}

function populateRecapStep3() {
    const selectedObjs = state.services.filter(s => state.selectedServices.includes(s.id));
    const totalPrice = selectedObjs.reduce((acc, curr) => acc + curr.price, 0);
    const depositAmount = getDepositAmount(totalPrice);
    const balanceAmount = totalPrice - depositAmount;

    const sNames = selectedObjs.map(s => s.name).join(', ');
    const [y, m, d] = state.selectedDate.split('-');

    document.getElementById('recapServices').innerText = sNames;
    document.getElementById('recapDateTime').innerText = `${d}/${m}/${y} a las ${state.selectedTime} hs`;
    document.getElementById('recapTotal').innerText = formatPrice(totalPrice);
    document.getElementById('recapDeposit').innerText = formatPrice(depositAmount);
    document.getElementById('recapBalance').innerText = formatPrice(balanceAmount);

    // Cargar datos bancarios en la tarjeta de seña
    const aliasEl = document.getElementById('bankAliasDisplay');
    const cbuEl = document.getElementById('bankCbuDisplay');
    const holderEl = document.getElementById('bankHolderDisplay');
    const senaAmountEl = document.getElementById('senaCardAmount');

    if (aliasEl) aliasEl.innerText = state.barberAlias;
    if (cbuEl) cbuEl.innerText = state.barberCbu;
    if (holderEl) holderEl.innerText = state.barberHolder;
    if (senaAmountEl) senaAmountEl.innerText = formatPrice(depositAmount);
}

// Helpers para copiar datos bancarios
window.copyBankAlias = function() {
    navigator.clipboard.writeText(state.barberAlias).then(() => {
        showToast("¡Alias copiado al portapapeles! Pégalo en tu Mercado Pago o banco.", "success");
    }).catch(() => {
        showToast(`Alias: ${state.barberAlias}`, "info");
    });
};

window.copyBankCbu = function() {
    navigator.clipboard.writeText(state.barberCbu).then(() => {
        showToast("¡CBU copiado al portapapeles!", "success");
    }).catch(() => {
        showToast(`CBU: ${state.barberCbu}`, "info");
    });
};

function handleBookingSubmit() {
    const name = document.getElementById('clientName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    const address = document.getElementById('clientAddress').value.trim();
    const apt = document.getElementById('clientApt').value.trim();
    const zone = document.getElementById('clientZone').value.trim();
    const payment = document.getElementById('paymentMethod').value;
    const notes = document.getElementById('clientNotes').value.trim();
    const receiptProof = document.getElementById('clientReceiptProof') ? document.getElementById('clientReceiptProof').value.trim() : '';

    if (!name || !phone || !address || !zone) {
        showToast("Por favor completa los campos requeridos (*)", "warning");
        return;
    }

    const selectedObjs = state.services.filter(s => state.selectedServices.includes(s.id));
    const totalPrice = selectedObjs.reduce((acc, curr) => acc + curr.price, 0);
    const depositAmount = getDepositAmount(totalPrice);
    const balanceAmount = totalPrice - depositAmount;
    const totalDuration = selectedObjs.reduce((acc, curr) => acc + curr.duration, 0);
    const serviceNames = selectedObjs.map(s => s.name).join(' + ');

    const randomId = "VB-" + Math.floor(1000 + Math.random() * 9000);

    const newBooking = {
        id: randomId,
        createdAt: new Date().toISOString(),
        date: state.selectedDate,
        time: state.selectedTime,
        clientName: name,
        clientPhone: phone,
        address: address,
        apt: apt || 'N/A',
        zone: zone,
        paymentMethod: payment,
        services: selectedObjs.map(s => s.name),
        total: totalPrice,
        deposit: depositAmount,
        balance: balanceAmount,
        depositStatus: "Pendiente",
        receiptProof: receiptProof || 'Por enviar por WhatsApp',
        status: "Pendiente",
        notes: notes || 'Sin notas'
    };

    // Save in LocalStorage
    state.bookings.unshift(newBooking);
    localStorage.setItem('vbh_bookings', JSON.stringify(state.bookings));

    // Prepare WhatsApp Message con desglose de seña anticancelación
    const [year, month, day] = state.selectedDate.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    const waText = 
`💈 *NUEVA RESERVA - VIP BARBER HOME* 💈
*Comprobante:* #${randomId}

👤 *Cliente:* ${name}
📱 *Teléfono:* ${phone}
📍 *Dirección:* ${address} ${apt ? `(${apt})` : ''}
🏙️ *Barrio/Zona:* ${zone}

📅 *Fecha:* ${formattedDate}
⏰ *Hora:* ${state.selectedTime} hs
⏱️ *Duración estimada:* ${totalDuration} min
✂️ *Servicio(s):* ${serviceNames}

━━━━━━━━━━━━━━━━━━━━━
💰 *Total del Servicio:* ${formatPrice(totalPrice)}
🔒 *Seña para congelar turno (${state.depositPercent}%):* ${formatPrice(depositAmount)}
🪙 *Saldo a abonar en domicilio:* ${formatPrice(balanceAmount)}
💳 *Forma de pago saldo:* ${payment}
━━━━━━━━━━━━━━━━━━━━━

🏦 *Datos para Seña:*
Alias: ${state.barberAlias}
Titular: ${state.barberHolder}
${receiptProof ? `🧾 *Comprobante/Titular que transfiere:* ${receiptProof}` : ''}
${notes ? `📝 *Notas:* ${notes}` : ''}

_Hola! Acabo de registrar mi turno desde la web. Te adjunto/enviaré el comprobante de la seña para congelar la visita a mi domicilio. ¡Muchas gracias!_`;

    const encodedMsg = encodeURIComponent(waText);
    const barberWaPhone = normalizeWhatsAppNumber(state.barberPhone);
    const waUrl = `https://wa.me/${barberWaPhone}?text=${encodedMsg}`;

    // Abrir WhatsApp directamente en nueva pestaña
    try {
        window.open(waUrl, '_blank');
    } catch (e) {
        console.log("Direct WhatsApp popup handled", e);
    }

    // Open Voucher Modal
    openVoucherModal({
        id: randomId,
        clientName: name,
        services: serviceNames,
        dateTime: `${formattedDate} - ${state.selectedTime} hs`,
        address: `${address} ${apt ? `(${apt})` : ''}, ${zone}`,
        payment: payment,
        total: formatPrice(totalPrice),
        deposit: formatPrice(depositAmount),
        balance: formatPrice(balanceAmount),
        alias: state.barberAlias,
        waUrl: waUrl,
        rawText: waText
    });

    // Reset Form
    resetBookingWizard();
}

function resetBookingWizard() {
    state.selectedServices = [];
    state.selectedTime = null;
    document.getElementById('bookingForm').reset();

    // Reset back to Step 1 view
    document.getElementById('bookingStep3').classList.add('hidden');
    document.getElementById('bookingStep2').classList.add('hidden');
    document.getElementById('bookingStep1').classList.remove('hidden');

    const badge2 = document.getElementById('stepBadge2');
    const badge3 = document.getElementById('stepBadge3');
    badge2.classList.replace('bg-barber-blue', 'bg-dark-700');
    badge2.classList.replace('text-white', 'text-gray-400');
    badge3.classList.replace('bg-barber-red', 'bg-dark-700');
    badge3.classList.replace('text-white', 'text-gray-400');

    document.getElementById('stepLine1').classList.replace('bg-barber-red', 'bg-gray-800');
    document.getElementById('stepLine2').classList.replace('bg-barber-blue', 'bg-gray-800');

    renderBookingServices();
    updateBookingSummary();
    renderTimeSlots();
}

// Voucher Modal Handling
function openVoucherModal(data) {
    const modal = document.getElementById('voucherModal');
    if (!modal) return;

    document.getElementById('voucherCode').innerText = `#${data.id}`;
    document.getElementById('vClientName').innerText = data.clientName;
    document.getElementById('vServices').innerText = data.services;
    document.getElementById('vDateTime').innerText = data.dateTime;
    document.getElementById('vAddress').innerText = data.address;
    document.getElementById('vPayment').innerText = data.payment;
    document.getElementById('vTotal').innerText = data.total;
    document.getElementById('vDeposit').innerText = data.deposit;
    document.getElementById('vBalance').innerText = data.balance;
    if (document.getElementById('vAlias')) document.getElementById('vAlias').innerText = data.alias;

    const waBtn = document.getElementById('voucherWhatsAppBtn');
    waBtn.href = data.waUrl;

    const copyBtn = document.getElementById('btnDownloadVoucher');
    copyBtn.onclick = () => {
        navigator.clipboard.writeText(data.rawText).then(() => {
            showToast("¡Datos de reserva copiados al portapapeles!", "success");
        }).catch(() => {
            showToast("No se pudo copiar automáticamente.", "info");
        });
    };

    modal.classList.remove('hidden');

    const closeBtn = document.getElementById('closeVoucherBtn');
    closeBtn.onclick = () => {
        modal.classList.add('hidden');
    };
}

// FAQ Accordion
function initFAQ() {
    const buttons = document.querySelectorAll('.faq-toggle');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('i');

            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                icon.style.transform = 'rotate(180deg)';
            } else {
                content.classList.add('hidden');
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
}

// =========================================================================
// GESTOR DE HORARIOS Y AUTENTICACIÓN CON CONTRASEÑA (colo13579246810gG)
// =========================================================================

function initScheduleAuthAndManager() {
    const authModal = document.getElementById('scheduleAuthModal');
    const managerModal = document.getElementById('scheduleManagerModal');
    const openNavbarBtn = document.getElementById('openScheduleManagerBtn');
    const openStep2Btn = document.getElementById('step2ModifyScheduleBtn');

    const closeAuthBtn = document.getElementById('closeScheduleAuthBtn');
    const cancelAuthBtn = document.getElementById('cancelScheduleAuthBtn');
    const closeManagerBtn = document.getElementById('closeScheduleManagerBtn');
    const closeManagerBtn2 = document.getElementById('closeScheduleManagerBtn2');

    const passwordInput = document.getElementById('schedulePasswordInput');
    const authError = document.getElementById('scheduleAuthError');
    const toggleEyeBtn = document.getElementById('toggleSchedulePasswordEye');

    const openAuth = () => {
        if (passwordInput) passwordInput.value = '';
        if (authError) authError.classList.add('hidden');
        if (authModal) authModal.classList.remove('hidden');
        if (passwordInput) setTimeout(() => passwordInput.focus(), 150);
    };

    if (openNavbarBtn) openNavbarBtn.addEventListener('click', openAuth);
    if (openStep2Btn) openStep2Btn.addEventListener('click', openAuth);

    if (closeAuthBtn) closeAuthBtn.addEventListener('click', () => authModal.classList.add('hidden'));
    if (cancelAuthBtn) cancelAuthBtn.addEventListener('click', () => authModal.classList.add('hidden'));

    if (closeManagerBtn) closeManagerBtn.addEventListener('click', () => managerModal.classList.add('hidden'));
    if (closeManagerBtn2) closeManagerBtn2.addEventListener('click', () => managerModal.classList.add('hidden'));

    // Toggle Eye (Mostrar / Ocultar Contraseña)
    if (toggleEyeBtn && passwordInput) {
        toggleEyeBtn.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
            toggleEyeBtn.innerHTML = isPassword ? '<i class="fa-regular fa-eye-slash"></i>' : '<i class="fa-regular fa-eye"></i>';
        });
    }

    // Listener para selector de fecha en el modal
    const datePicker = document.getElementById('manageScheduleDatePicker');
    if (datePicker) {
        datePicker.addEventListener('change', (e) => {
            if (e.target.value) {
                initScheduleManager(e.target.value);
            }
        });
    }

    // Toggle día habilitado / cerrado
    const closedToggle = document.getElementById('manageDayClosedToggle');
    if (closedToggle) {
        closedToggle.addEventListener('change', (e) => {
            managerState.isClosed = e.target.checked;
            updateManagerClosedLabel();
        });
    }
}

// Verificación de la Contraseña
window.verifySchedulePassword = function() {
    const passwordInput = document.getElementById('schedulePasswordInput');
    const authError = document.getElementById('scheduleAuthError');
    const authModal = document.getElementById('scheduleAuthModal');
    const managerModal = document.getElementById('scheduleManagerModal');

    if (!passwordInput) return;

    if (passwordInput.value === SCHEDULE_PASSWORD) {
        authModal.classList.add('hidden');
        authError.classList.add('hidden');
        passwordInput.value = '';

        // Abrir Gestor de Horarios
        managerModal.classList.remove('hidden');
        const defaultDate = state.selectedDate || getFormattedDateOffset(0);
        initScheduleManager(defaultDate);
        showToast("Contraseña correcta. Gestor de horarios activado.", "success");
    } else {
        authError.classList.remove('hidden');
        passwordInput.classList.add('border-rose-500');
        passwordInput.focus();
        showToast("Contraseña incorrecta.", "warning");
        setTimeout(() => passwordInput.classList.remove('border-rose-500'), 1500);
    }
};

// Cargar información de una fecha específica en el gestor
function initScheduleManager(dateStr) {
    managerState.date = dateStr;
    const datePicker = document.getElementById('manageScheduleDatePicker');
    const dateHumanEl = document.getElementById('manageScheduleDateHuman');
    const closedToggle = document.getElementById('manageDayClosedToggle');

    if (datePicker) datePicker.value = dateStr;

    // Formatear texto humano de la fecha
    if (dateHumanEl) {
        const [y, m, d] = dateStr.split('-');
        const dateObj = new Date(Number(y), Number(m) - 1, Number(d));
        const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        dateHumanEl.innerText = `${dayNames[dateObj.getDay()]} ${d} de ${monthNames[dateObj.getMonth()]} de ${y}`;
    }

    // Cargar horarios guardados o predeterminados
    const saved = state.customSchedules ? state.customSchedules[dateStr] : null;
    if (saved) {
        managerState.isClosed = !!saved.isClosed;
        managerState.slots = Array.isArray(saved.slots) ? [...saved.slots] : [...TIME_SLOTS];
    } else {
        const [y, m, d] = dateStr.split('-');
        const isSunday = new Date(Number(y), Number(m) - 1, Number(d)).getDay() === 0;
        managerState.isClosed = isSunday;
        managerState.slots = isSunday ? [] : [...TIME_SLOTS];
    }

    if (closedToggle) closedToggle.checked = managerState.isClosed;
    updateManagerClosedLabel();
    renderManagerSlots();
}

function updateManagerClosedLabel() {
    const label = document.getElementById('manageDayClosedLabel');
    const slotsSection = document.getElementById('manageSlotsSection');
    if (label) {
        label.innerText = managerState.isClosed ? "Día Cerrado / No Disponible" : "Día Habilitado para Turnos";
        label.className = managerState.isClosed ? "text-xs font-mono text-rose-400 font-bold" : "text-xs font-mono text-barber-blue font-bold";
    }
    if (slotsSection) {
        slotsSection.style.opacity = managerState.isClosed ? '0.45' : '1';
    }
}

// Renders the slots inside the schedule manager modal
function renderManagerSlots() {
    const container = document.getElementById('managerSlotsContainer');
    if (!container) return;

    const allSlots = Array.from(new Set([...TIME_SLOTS, ...managerState.slots])).sort();

    container.innerHTML = allSlots.map(slot => {
        const isActive = managerState.slots.includes(slot);
        return `
            <button type="button" 
                    onclick="toggleManagerSlot('${slot}')" 
                    class="manager-slot-btn py-2.5 px-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-between ${isActive ? 'active-slot' : 'blocked-slot'}">
                <span>${slot} hs</span>
                <i class="fa-solid ${isActive ? 'fa-check text-[11px]' : 'fa-lock text-[10px]'}"></i>
            </button>
        `;
    }).join('');
}

window.toggleManagerSlot = function(slot) {
    if (managerState.slots.includes(slot)) {
        managerState.slots = managerState.slots.filter(s => s !== slot);
    } else {
        managerState.slots.push(slot);
        managerState.slots.sort();
    }
    renderManagerSlots();
};

window.setManagerDateOffset = function(offset) {
    const newDate = getFormattedDateOffset(offset);
    initScheduleManager(newDate);
};

window.enableAllManagerSlots = function() {
    managerState.slots = Array.from(new Set([...TIME_SLOTS, ...managerState.slots])).sort();
    managerState.isClosed = false;
    const toggle = document.getElementById('manageDayClosedToggle');
    if (toggle) toggle.checked = false;
    updateManagerClosedLabel();
    renderManagerSlots();
    showToast("Todos los horarios habilitados.", "info");
};

window.disableAllManagerSlots = function() {
    managerState.slots = [];
    renderManagerSlots();
    showToast("Todos los horarios bloqueados para esta fecha.", "info");
};

window.addCustomManagerSlot = function() {
    const input = document.getElementById('newCustomSlotInput');
    if (!input || !input.value) {
        showToast("Por favor selecciona una hora válida.", "warning");
        return;
    }
    const val = input.value;
    if (!managerState.slots.includes(val)) {
        managerState.slots.push(val);
        managerState.slots.sort();
        renderManagerSlots();
        showToast(`Horario ${val} hs agregado con éxito.`, "success");
    } else {
        showToast("Ese horario ya se encuentra en la lista.", "info");
    }
    input.value = '';
};

window.resetManagerSlotsToDefault = function() {
    if (confirm("¿Deseas restablecer los horarios de este día a los valores originales de fábrica?")) {
        delete state.customSchedules[managerState.date];
        localStorage.setItem('vbh_custom_schedules', JSON.stringify(state.customSchedules));
        initScheduleManager(managerState.date);
        initDatePicker();
        showToast("Horarios restablecidos a los valores por defecto.", "info");
    }
};

window.saveManagerSchedule = function() {
    if (!managerState.date) return;

    state.customSchedules[managerState.date] = {
        isClosed: managerState.isClosed,
        slots: [...managerState.slots].sort()
    };

    localStorage.setItem('vbh_custom_schedules', JSON.stringify(state.customSchedules));

    // Actualizar turnera pública instantáneamente
    initDatePicker();
    renderTimeSlots();

    const [year, month, day] = managerState.date.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    const modal = document.getElementById('scheduleManagerModal');
    if (modal) modal.classList.add('hidden');

    showToast(`¡Horarios del ${formattedDate} guardados exitosamente!`, "success");
};

// =========================================================================
// PANEL DE ADMINISTRACIÓN GENERAL DEL BARBERO
// =========================================================================

function initAdminModal() {
    const modal = document.getElementById('adminModal');
    const openBtn = document.getElementById('openAdminBtn');
    const footerLink = document.getElementById('footerAdminLink');
    const closeBtn = document.getElementById('closeAdminBtn');

    const tabReservasBtn = document.getElementById('tabReservasBtn');
    const tabConfigBtn = document.getElementById('tabConfigBtn');
    const tabReservasContent = document.getElementById('tabReservasContent');
    const tabConfigContent = document.getElementById('tabConfigContent');

    const openModal = () => {
        renderAdminBookings();
        renderAdminConfig();
        modal.classList.remove('hidden');
    };

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (footerLink) footerLink.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

    // Tabs toggle
    if (tabReservasBtn && tabConfigBtn) {
        tabReservasBtn.addEventListener('click', () => {
            tabReservasBtn.classList.add('border-barber-red', 'text-white');
            tabReservasBtn.classList.remove('border-transparent', 'text-gray-400');

            tabConfigBtn.classList.remove('border-barber-red', 'text-white');
            tabConfigBtn.classList.add('border-transparent', 'text-gray-400');

            tabReservasContent.classList.remove('hidden');
            tabConfigContent.classList.add('hidden');
        });

        tabConfigBtn.addEventListener('click', () => {
            tabConfigBtn.classList.add('border-barber-red', 'text-white');
            tabConfigBtn.classList.remove('border-transparent', 'text-gray-400');

            tabReservasBtn.classList.remove('border-barber-red', 'text-white');
            tabReservasBtn.classList.add('border-transparent', 'text-gray-400');

            tabConfigContent.classList.remove('hidden');
            tabReservasContent.classList.add('hidden');
        });
    }

    // Filter Admin
    const filterInput = document.getElementById('filterAdminInput');
    if (filterInput) {
        filterInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            renderAdminBookings(query);
        });
    }

    // Export JSON
    const exportBtn = document.getElementById('btnExportJSON');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.bookings, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", `turnos_barberia_${new Date().toISOString().split('T')[0]}.json`);
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
            showToast("Historial exportado correctamente.", "success");
        });
    }

    // Clear All
    const clearBtn = document.getElementById('btnClearAllBookings');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm("¿Estás seguro de que deseas eliminar todas las reservas registradas?")) {
                state.bookings = [];
                localStorage.setItem('vbh_bookings', JSON.stringify([]));
                renderAdminBookings();
                showToast("Se vació el listado de reservas.", "info");
            }
        });
    }

    // Save Phone Config
    const savePhoneBtn = document.getElementById('btnSaveConfigPhone');
    if (savePhoneBtn) {
        savePhoneBtn.addEventListener('click', () => {
            const rawVal = document.getElementById('configBarberPhone').value.trim();
            const phoneVal = normalizeWhatsAppNumber(rawVal);
            if (!phoneVal) {
                showToast("Por favor ingresa un número válido.", "warning");
                return;
            }
            state.barberPhone = phoneVal;
            localStorage.setItem('vbh_barber_phone', phoneVal);
            document.getElementById('configBarberPhone').value = phoneVal;
            updateWhatsAppLink();
            showToast(`Número de WhatsApp guardado (+${phoneVal}).`, "success");
        });
    }

    // Save Banking / Deposit Config
    const saveBankingBtn = document.getElementById('btnSaveBankingConfig');
    if (saveBankingBtn) {
        saveBankingBtn.addEventListener('click', () => {
            const aliasVal = document.getElementById('configBarberAlias').value.trim();
            const cbuVal = document.getElementById('configBarberCbu').value.trim();
            const holderVal = document.getElementById('configBarberHolder').value.trim();
            const percentVal = parseInt(document.getElementById('configDepositPercent').value, 10);

            if (aliasVal) {
                state.barberAlias = aliasVal;
                localStorage.setItem('vbh_barber_alias', aliasVal);
            }
            if (cbuVal) {
                state.barberCbu = cbuVal;
                localStorage.setItem('vbh_barber_cbu', cbuVal);
            }
            if (holderVal) {
                state.barberHolder = holderVal;
                localStorage.setItem('vbh_barber_holder', holderVal);
            }
            if (!isNaN(percentVal) && percentVal >= 10 && percentVal <= 100) {
                state.depositPercent = percentVal;
                localStorage.setItem('vbh_deposit_percent', percentVal.toString());
            }

            updateBookingSummary();
            showToast("Datos bancarios y porcentaje de seña actualizados.", "success");
        });
    }
}

function renderAdminBookings(filter = '') {
    const tbody = document.getElementById('adminBookingsTableBody');
    const countBadge = document.getElementById('totalBookingsCount');
    if (!tbody) return;

    let filtered = state.bookings;
    if (filter) {
        filtered = state.bookings.filter(b => 
            b.clientName.toLowerCase().includes(filter) || 
            b.clientPhone.includes(filter) ||
            b.id.toLowerCase().includes(filter) ||
            b.address.toLowerCase().includes(filter)
        );
    }

    if (countBadge) countBadge.innerText = state.bookings.length;

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="p-6 text-center text-gray-400 font-mono">
                    No se encontraron turnos registrados.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filtered.map(b => {
        const [y, m, d] = b.date.split('-');
        let statusBadge = '';
        if (b.status === 'Confirmado') statusBadge = 'bg-blue-600/20 text-blue-300 border border-blue-500/30';
        else if (b.status === 'Cancelado') statusBadge = 'bg-rose-500/20 text-rose-300 border border-rose-500/30';
        else statusBadge = 'bg-amber-500/20 text-amber-300 border border-amber-500/30';

        const depositVal = b.deposit || getDepositAmount(b.total);
        const depositStatus = b.depositStatus || "Pendiente";
        const depositClass = depositStatus === "Acreditada" 
            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" 
            : "bg-amber-500/20 text-amber-300 border border-amber-500/40";

        return `
            <tr class="hover:bg-dark-800 transition">
                <td class="p-3">
                    <span class="font-bold text-white font-mono block">#${b.id}</span>
                    <span class="text-[11px] text-gray-400 font-mono">${d}/${m} - ${b.time} hs</span>
                </td>
                <td class="p-3">
                    <span class="font-semibold text-white block">${b.clientName}</span>
                    <a href="https://wa.me/${b.clientPhone.replace(/[^0-9]/g, '')}" target="_blank" class="text-barber-blue hover:underline text-[11px] font-mono">
                        <i class="fa-brands fa-whatsapp"></i> ${b.clientPhone}
                    </a>
                </td>
                <td class="p-3">
                    <span class="text-xs text-gray-300 block max-w-xs truncate">${Array.isArray(b.services) ? b.services.join(', ') : b.services}</span>
                    <span class="text-[10px] text-gray-500 block">${b.address} (${b.zone})</span>
                </td>
                <td class="p-3 font-mono">
                    <span class="font-bold text-white block">${formatPrice(b.total)}</span>
                    <span class="text-[11px] text-gray-400">Saldo: ${formatPrice(b.balance || (b.total - depositVal))}</span>
                </td>
                <td class="p-3">
                    <button onclick="toggleBookingDepositStatus('${b.id}')" title="Clic para alternar estado de seña" class="text-[10px] px-2 py-1 rounded-lg ${depositClass} font-mono font-bold flex items-center gap-1">
                        <i class="fa-solid ${depositStatus === 'Acreditada' ? 'fa-check-circle' : 'fa-clock'}"></i>
                        <span>Seña: ${formatPrice(depositVal)}</span>
                    </button>
                    <span class="text-[9px] text-gray-400 block mt-0.5">${depositStatus}</span>
                </td>
                <td class="p-3">
                    <select onchange="changeBookingStatus('${b.id}', this.value)" class="text-[11px] px-2 py-1 rounded-lg ${statusBadge} bg-dark-950 border focus:outline-none cursor-pointer">
                        <option value="Pendiente" ${b.status === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                        <option value="Confirmado" ${b.status === 'Confirmado' ? 'selected' : ''}>Confirmado</option>
                        <option value="Cancelado" ${b.status === 'Cancelado' ? 'selected' : ''}>Cancelado</option>
                    </select>
                </td>
                <td class="p-3 text-right">
                    <button onclick="deleteBooking('${b.id}')" title="Eliminar Turno" class="text-gray-400 hover:text-rose-400 p-1 transition">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

window.toggleBookingDepositStatus = function(id) {
    const booking = state.bookings.find(b => b.id === id);
    if (booking) {
        booking.depositStatus = (booking.depositStatus === "Acreditada") ? "Pendiente" : "Acreditada";
        localStorage.setItem('vbh_bookings', JSON.stringify(state.bookings));
        renderAdminBookings();
        showToast(`Seña del turno #${id} marcada como: ${booking.depositStatus}`, "info");
    }
};

window.changeBookingStatus = function(id, newStatus) {
    const booking = state.bookings.find(b => b.id === id);
    if (booking) {
        booking.status = newStatus;
        localStorage.setItem('vbh_bookings', JSON.stringify(state.bookings));
        renderAdminBookings();
        renderTimeSlots();
        showToast(`Turno #${id} marcado como ${newStatus}.`, "info");
    }
};

window.deleteBooking = function(id) {
    if (confirm(`¿Eliminar la reserva #${id}?`)) {
        state.bookings = state.bookings.filter(b => b.id !== id);
        localStorage.setItem('vbh_bookings', JSON.stringify(state.bookings));
        renderAdminBookings();
        renderTimeSlots();
        showToast("Turno eliminado.", "info");
    }
};

function renderAdminConfig() {
    const phoneInput = document.getElementById('configBarberPhone');
    const nameInput = document.getElementById('configBarberName');
    const aliasInput = document.getElementById('configBarberAlias');
    const cbuInput = document.getElementById('configBarberCbu');
    const holderInput = document.getElementById('configBarberHolder');
    const percentInput = document.getElementById('configDepositPercent');
    const pricesList = document.getElementById('configPricesList');

    if (phoneInput) phoneInput.value = state.barberPhone;
    if (nameInput) nameInput.value = state.barberName;
    if (aliasInput) aliasInput.value = state.barberAlias;
    if (cbuInput) cbuInput.value = state.barberCbu;
    if (holderInput) holderInput.value = state.barberHolder;
    if (percentInput) percentInput.value = state.depositPercent;

    if (pricesList) {
        pricesList.innerHTML = state.services.map(s => `
            <div class="flex items-center justify-between p-3 rounded-xl bg-dark-800 border border-gray-800 text-xs">
                <span class="text-white font-medium">${s.name}</span>
                <div class="flex items-center gap-2">
                    <span class="text-gray-400 font-mono">$</span>
                    <input type="number" step="100" value="${s.price}" id="price_input_${s.id}" class="w-24 px-2 py-1 rounded bg-dark-900 border border-gray-700 text-white font-mono text-right focus:outline-none focus:border-barber-red">
                    <button onclick="saveServicePrice('${s.id}')" class="px-2.5 py-1 rounded bg-barber-red text-white font-bold hover:bg-barber-red-hover transition">
                        Guardar
                    </button>
                </div>
            </div>
        `).join('');
    }
}

window.saveServicePrice = function(serviceId) {
    const input = document.getElementById(`price_input_${serviceId}`);
    if (!input) return;
    const newPrice = Number(input.value);
    if (isNaN(newPrice) || newPrice <= 0) {
        showToast("Ingresa un precio válido.", "warning");
        return;
    }

    const service = state.services.find(s => s.id === serviceId);
    if (service) {
        service.price = newPrice;
        localStorage.setItem('vbh_services', JSON.stringify(state.services));
        initServicesCatalog();
        renderBookingServices();
        updateBookingSummary();
        showToast(`Precio de ${service.name} actualizado a ${formatPrice(newPrice)}.`, "success");
    }
};

// Toast Notifications System
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-slide-in pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl text-xs font-semibold backdrop-blur-md border ${
        type === 'success' 
            ? 'bg-blue-950/95 text-blue-100 border-barber-blue shadow-barber-blue/20' 
            : type === 'warning'
            ? 'bg-rose-950/95 text-rose-100 border-barber-red shadow-barber-red/20' 
            : 'bg-dark-900/95 text-gray-200 border-gray-700'
    }`;

    let icon = 'fa-circle-info text-barber-blue';
    if (type === 'success') icon = 'fa-circle-check text-emerald-400';
    if (type === 'warning') icon = 'fa-triangle-exclamation text-rose-400';

    toast.innerHTML = `
        <i class="fa-solid ${icon} text-sm"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3800);
}

// =========================================================================
// MÓDULO DE FINANZAS, COSTOS FIJOS E INVENTARIO (PROTEGIDO: colo13579246810gG)
// =========================================================================

let financeState = {
    currentTab: 'tabFinResumen',
    currentCategory: 'all',
    searchQuery: '',
    simCuts: 80,
    newItemType: 'inventory'
};

function initFinanceModule() {
    const authModal = document.getElementById('financeAuthModal');
    const finModal = document.getElementById('financeModal');
    
    // Botones de Apertura
    const openBtn = document.getElementById('openFinanceBtn');
    const navBtn = document.getElementById('navFinanceBtn');
    const footerLink = document.getElementById('footerFinanceLink');
    const adminGoBtn = document.getElementById('adminGoFinanceBtn');

    // Botones de Cierre
    const closeAuthBtn = document.getElementById('closeFinanceAuthBtn');
    const cancelAuthBtn = document.getElementById('cancelFinanceAuthBtn');
    const closeFinBtn = document.getElementById('closeFinanceModalBtn');
    const closeFinBtn2 = document.getElementById('closeFinanceModalBtn2');

    // Contraseña inputs
    const passwordInput = document.getElementById('financePasswordInput');
    const authError = document.getElementById('financeAuthError');
    const toggleEyeBtn = document.getElementById('toggleFinancePasswordEye');

    const openAuth = () => {
        if (passwordInput) passwordInput.value = '';
        if (authError) authError.classList.add('hidden');
        if (authModal) authModal.classList.remove('hidden');
        if (passwordInput) setTimeout(() => passwordInput.focus(), 150);
    };

    if (openBtn) openBtn.addEventListener('click', openAuth);
    if (navBtn) navBtn.addEventListener('click', openAuth);
    if (footerLink) footerLink.addEventListener('click', openAuth);
    if (adminGoBtn) {
        adminGoBtn.addEventListener('click', () => {
            const adminModal = document.getElementById('adminModal');
            if (adminModal) adminModal.classList.add('hidden');
            openAuth();
        });
    }

    if (closeAuthBtn) closeAuthBtn.addEventListener('click', () => authModal.classList.add('hidden'));
    if (cancelAuthBtn) cancelAuthBtn.addEventListener('click', () => authModal.classList.add('hidden'));

    if (closeFinBtn) closeFinBtn.addEventListener('click', () => finModal.classList.add('hidden'));
    if (closeFinBtn2) closeFinBtn2.addEventListener('click', () => finModal.classList.add('hidden'));

    // Toggle Eye Contraseña
    if (toggleEyeBtn && passwordInput) {
        toggleEyeBtn.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
            toggleEyeBtn.innerHTML = isPassword ? '<i class="fa-regular fa-eye-slash"></i>' : '<i class="fa-regular fa-eye"></i>';
        });
    }

    // Tabs inside Finance Modal
    const tabResumenBtn = document.getElementById('tabFinResumenBtn');
    const tabInventarioBtn = document.getElementById('tabFinInventarioBtn');
    const tabCostosFijosBtn = document.getElementById('tabFinCostosFijosBtn');
    const tabNuevoItemBtn = document.getElementById('tabFinNuevoItemBtn');

    if (tabResumenBtn) tabResumenBtn.addEventListener('click', () => switchFinanceTab('tabFinResumen'));
    if (tabInventarioBtn) tabInventarioBtn.addEventListener('click', () => switchFinanceTab('tabFinInventario'));
    if (tabCostosFijosBtn) tabCostosFijosBtn.addEventListener('click', () => switchFinanceTab('tabFinCostosFijos'));
    if (tabNuevoItemBtn) tabNuevoItemBtn.addEventListener('click', () => switchFinanceTab('tabFinNuevoItem'));

    // Buscador de Inventario
    const searchInput = document.getElementById('searchInventoryInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            financeState.searchQuery = e.target.value.toLowerCase().trim();
            renderFinanceInventory();
        });
    }

    // Slider del simulador de ganancias
    const simSlider = document.getElementById('simCutsSlider');
    if (simSlider) {
        simSlider.addEventListener('input', (e) => {
            financeState.simCuts = parseInt(e.target.value, 10);
            updateSimulationDisplay();
        });
    }

    // Formulario de nuevo ítem de inventario
    const formInv = document.getElementById('formNewInventoryItem');
    if (formInv) {
        formInv.addEventListener('submit', (e) => {
            e.preventDefault();
            saveNewInventoryItem();
        });
    }

    // Formulario de nuevo costo fijo
    const formCost = document.getElementById('formNewFixedCost');
    if (formCost) {
        formCost.addEventListener('submit', (e) => {
            e.preventDefault();
            saveNewFixedCost();
        });
    }
}

// Verificación de la Contraseña para Finanzas (colo13579246810gG)
window.verifyFinancePassword = function() {
    const passwordInput = document.getElementById('financePasswordInput');
    const authError = document.getElementById('financeAuthError');
    const authModal = document.getElementById('financeAuthModal');
    const finModal = document.getElementById('financeModal');

    if (!passwordInput) return;

    if (passwordInput.value === SCHEDULE_PASSWORD) {
        authModal.classList.add('hidden');
        authError.classList.add('hidden');
        passwordInput.value = '';

        // Abrir Modal de Finanzas
        finModal.classList.remove('hidden');
        switchFinanceTab('tabFinResumen');
        renderFinanceDashboard();
        renderFinanceInventory();
        renderFinanceFixedCosts();
        showToast("Contraseña correcta. Panel de Finanzas e Inventario desbloqueado.", "success");
    } else {
        authError.classList.remove('hidden');
        passwordInput.classList.add('border-rose-500');
        passwordInput.focus();
        showToast("Contraseña incorrecta. Inténtalo nuevamente.", "warning");
        setTimeout(() => passwordInput.classList.remove('border-rose-500'), 1500);
    }
};

window.openFinanceAuth = function() {
    const authModal = document.getElementById('financeAuthModal');
    const passwordInput = document.getElementById('financePasswordInput');
    const authError = document.getElementById('financeAuthError');
    if (passwordInput) passwordInput.value = '';
    if (authError) authError.classList.add('hidden');
    if (authModal) authModal.classList.remove('hidden');
    if (passwordInput) setTimeout(() => passwordInput.focus(), 150);
};

window.openFinanceModalDirect = function() {
    openFinanceAuth();
};

window.switchFinanceTab = function(targetTab) {
    financeState.currentTab = targetTab;

    const tabs = ['tabFinResumen', 'tabFinInventario', 'tabFinCostosFijos', 'tabFinNuevoItem'];
    tabs.forEach(tab => {
        const btn = document.getElementById(`${tab}Btn`);
        const content = document.getElementById(`${tab}Content`);

        if (tab === targetTab) {
            if (btn) {
                btn.classList.add('border-emerald-500', 'text-white');
                btn.classList.remove('border-transparent', 'text-gray-400');
            }
            if (content) content.classList.remove('hidden');
        } else {
            if (btn) {
                btn.classList.remove('border-emerald-500', 'text-white');
                btn.classList.add('border-transparent', 'text-gray-400');
            }
            if (content) content.classList.add('hidden');
        }
    });

    if (targetTab === 'tabFinResumen') renderFinanceDashboard();
    if (targetTab === 'tabFinInventario') renderFinanceInventory();
    if (targetTab === 'tabFinCostosFijos') renderFinanceFixedCosts();
};

function renderFinanceDashboard() {
    // 1. Costo Inicial / Inversión Inicial
    const totalInitialCost = state.inventory.reduce((acc, curr) => acc + (curr.qty * curr.unitPrice), 0);

    // 2. Costos Fijos Mensuales
    const totalFixedCosts = state.fixedCosts.reduce((acc, curr) => acc + curr.amount, 0);

    // 3. Tarifa de Corte Clásico para cálculo de Break-Even
    const standardCutPrice = state.services.find(s => s.id === 'corte-fade')?.price || 10000;
    const breakEvenCuts = Math.ceil(totalFixedCosts / standardCutPrice);

    // Actualizar elementos
    const kpiCostEl = document.getElementById('kpiInitialCost');
    const kpiInvEl = document.getElementById('kpiInventoryVal');
    const kpiFixedEl = document.getElementById('kpiFixedCosts');
    const kpiBreakEl = document.getElementById('kpiBreakEven');
    const invCountEl = document.getElementById('financeInvCount');

    if (kpiCostEl) kpiCostEl.innerText = formatPrice(totalInitialCost);
    if (kpiInvEl) kpiInvEl.innerText = formatPrice(totalInitialCost);
    if (kpiFixedEl) kpiFixedEl.innerText = formatPrice(totalFixedCosts);
    if (kpiBreakEl) kpiBreakEl.innerText = `${breakEvenCuts} Cortes`;
    if (invCountEl) invCountEl.innerText = state.inventory.length;

    updateSimulationDisplay();
}

function updateSimulationDisplay() {
    const cuts = financeState.simCuts;
    const standardCutPrice = state.services.find(s => s.id === 'corte-fade')?.price || 10000;
    const totalInitialCost = state.inventory.reduce((acc, curr) => acc + (curr.qty * curr.unitPrice), 0);
    const totalFixedCosts = state.fixedCosts.reduce((acc, curr) => acc + curr.amount, 0);

    const grossRevenue = cuts * standardCutPrice;
    const netProfit = grossRevenue - totalFixedCosts;
    const recoveryMonths = netProfit > 0 ? (totalInitialCost / netProfit).toFixed(1) : 'N/A';

    const cutsDisplay = document.getElementById('simCutsValueDisplay');
    const grossDisplay = document.getElementById('simGrossRevenue');
    const fixedDisplay = document.getElementById('simFixedCosts');
    const netDisplay = document.getElementById('simNetProfit');
    const recoveryDisplay = document.getElementById('simRecoveryTime');

    if (cutsDisplay) cutsDisplay.innerText = `${cuts} turnos / mes (~${(cuts / 26).toFixed(1)} por día)`;
    if (grossDisplay) grossDisplay.innerText = formatPrice(grossRevenue);
    if (fixedDisplay) fixedDisplay.innerText = formatPrice(totalFixedCosts);
    if (netDisplay) {
        netDisplay.innerText = formatPrice(netProfit);
        if (netProfit >= 0) {
            netDisplay.className = "text-base font-bold text-emerald-300 mt-1";
        } else {
            netDisplay.className = "text-base font-bold text-rose-400 mt-1";
        }
    }
    if (recoveryDisplay) {
        recoveryDisplay.innerText = netProfit > 0 ? `~${recoveryMonths} meses` : 'No amortiza';
    }
}

window.filterInventoryByCategory = function(category) {
    financeState.currentCategory = category;

    // Actualizar pills
    const pillsContainer = document.getElementById('invCategoryFilterPills');
    if (pillsContainer) {
        const buttons = pillsContainer.querySelectorAll('button');
        buttons.forEach(btn => {
            const cat = btn.getAttribute('data-cat');
            if (cat === category) {
                btn.className = "px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold";
            } else {
                btn.className = "px-3 py-1 rounded-full bg-dark-950 text-gray-400 hover:text-white border border-gray-800";
            }
        });
    }

    renderFinanceInventory();
};

function renderFinanceInventory() {
    const tbody = document.getElementById('inventoryTableBody');
    const tfoot = document.getElementById('inventoryTableFoot');
    if (!tbody) return;

    let items = state.inventory;

    // Filtro por categoría
    if (financeState.currentCategory && financeState.currentCategory !== 'all') {
        items = items.filter(item => item.category === financeState.currentCategory);
    }

    // Filtro por búsqueda
    if (financeState.searchQuery) {
        items = items.filter(item => 
            item.name.toLowerCase().includes(financeState.searchQuery) ||
            item.description.toLowerCase().includes(financeState.searchQuery) ||
            item.category.toLowerCase().includes(financeState.searchQuery)
        );
    }

    if (items.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="p-8 text-center text-gray-500 font-mono">
                    No se encontraron productos en el inventario que coincidan con la búsqueda.
                </td>
            </tr>
        `;
    } else {
        tbody.innerHTML = items.map(item => {
            const total = item.qty * item.unitPrice;
            let badgeClass = 'inv-badge-accesorios';
            if (item.category === 'Maquinaria') badgeClass = 'inv-badge-maquinaria';
            if (item.category === 'Herramientas') badgeClass = 'inv-badge-herramientas';
            if (item.category === 'Insumos') badgeClass = 'inv-badge-insumos';
            if (item.category === 'Movilidad') badgeClass = 'inv-badge-movilidad';

            return `
                <tr class="hover:bg-dark-800/60 transition group">
                    <td class="p-3.5">
                        <div class="flex items-center gap-2.5">
                            <div class="w-8 h-8 rounded-lg bg-dark-900 border border-gray-800 flex items-center justify-center text-xs text-gray-300">
                                <i class="fa-solid ${item.icon || 'fa-box'}"></i>
                            </div>
                            <span class="font-bold text-white capitalize">${item.name}</span>
                        </div>
                    </td>
                    <td class="p-3.5 font-mono text-gray-300">
                        ${item.description}
                    </td>
                    <td class="p-3.5 text-center font-mono font-bold text-white">
                        <span class="inline-block px-2.5 py-0.5 rounded-md bg-dark-950 border border-gray-800">
                            ${item.qty}
                        </span>
                    </td>
                    <td class="p-3.5 text-right font-mono text-gray-300">
                        ${formatPrice(item.unitPrice)}
                    </td>
                    <td class="p-3.5 text-right font-mono font-bold text-emerald-400">
                        ${formatPrice(total)}
                    </td>
                    <td class="p-3.5 text-center">
                        <span class="text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold ${badgeClass}">
                            ${item.category}
                        </span>
                    </td>
                    <td class="p-3.5 text-right">
                        <div class="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition">
                            <button onclick="editInventoryItem('${item.id}')" title="Editar cantidad o precio" class="p-1.5 text-gray-400 hover:text-blue-400 rounded hover:bg-dark-950">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button onclick="deleteInventoryItem('${item.id}')" title="Eliminar ítem" class="p-1.5 text-gray-400 hover:text-rose-400 rounded hover:bg-dark-950">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // Totales globales en el Footer
    const totalAllQty = state.inventory.reduce((acc, curr) => acc + curr.qty, 0);
    const totalAllCost = state.inventory.reduce((acc, curr) => acc + (curr.qty * curr.unitPrice), 0);

    if (tfoot) {
        tfoot.innerHTML = `
            <tr>
                <td colspan="2" class="p-4 text-xs font-bold uppercase tracking-wider text-white">
                    Total General de Inversión Inicial:
                </td>
                <td class="p-4 text-center text-sm font-bold text-white">
                    ${totalAllQty} u.
                </td>
                <td class="p-4 text-right text-xs text-gray-400">
                    Suma total:
                </td>
                <td class="p-4 text-right text-base font-bold text-emerald-400">
                    ${formatPrice(totalAllCost)}
                </td>
                <td colspan="2" class="p-4 text-center text-[11px] text-gray-400 font-sans">
                    ${state.inventory.length} productos registrados
                </td>
            </tr>
        `;
    }
}

function renderFinanceFixedCosts() {
    const container = document.getElementById('fixedCostsContainer');
    const totalDisplay = document.getElementById('fixedCostsTotalDisplay');
    if (!container) return;

    const totalFixed = state.fixedCosts.reduce((acc, curr) => acc + curr.amount, 0);
    if (totalDisplay) totalDisplay.innerText = `${formatPrice(totalFixed)} / mes`;

    container.innerHTML = state.fixedCosts.map(cost => `
        <div class="p-4 rounded-2xl bg-dark-900 border border-gray-800 hover:border-gray-700 transition flex items-center justify-between group">
            <div class="flex items-center gap-3.5">
                <div class="w-10 h-10 rounded-xl bg-dark-950 border border-rose-500/30 text-rose-400 flex items-center justify-center text-base">
                    <i class="fa-solid ${cost.icon || 'fa-receipt'}"></i>
                </div>
                <div>
                    <h5 class="font-bold text-white text-xs">${cost.name}</h5>
                    <p class="text-[11px] text-gray-400">${cost.description}</p>
                    <span class="text-[10px] font-mono text-gray-500">${cost.period || 'Mensual'}</span>
                </div>
            </div>
            <div class="text-right">
                <div class="text-sm font-mono font-bold text-rose-300">${formatPrice(cost.amount)}</div>
                <div class="flex items-center justify-end gap-1 mt-1 opacity-70 group-hover:opacity-100 transition">
                    <button onclick="editFixedCost('${cost.id}')" title="Modificar monto" class="text-gray-400 hover:text-blue-400 text-xs p-1">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button onclick="deleteFixedCost('${cost.id}')" title="Eliminar costo fijo" class="text-gray-400 hover:text-rose-400 text-xs p-1">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

window.setNewItemType = function(type) {
    financeState.newItemType = type;
    const invBtn = document.getElementById('formTypeInvBtn');
    const costBtn = document.getElementById('formTypeCostBtn');
    const invForm = document.getElementById('formNewInventoryItem');
    const costForm = document.getElementById('formNewFixedCost');

    if (type === 'inventory') {
        if (invBtn) {
            invBtn.className = "flex-1 py-2.5 rounded-lg bg-emerald-600 text-white flex items-center justify-center gap-2 transition";
        }
        if (costBtn) {
            costBtn.className = "flex-1 py-2.5 rounded-lg text-gray-400 hover:text-white flex items-center justify-center gap-2 transition";
        }
        if (invForm) invForm.classList.remove('hidden');
        if (costForm) costForm.classList.add('hidden');
    } else {
        if (costBtn) {
            costBtn.className = "flex-1 py-2.5 rounded-lg bg-rose-600 text-white flex items-center justify-center gap-2 transition";
        }
        if (invBtn) {
            invBtn.className = "flex-1 py-2.5 rounded-lg text-gray-400 hover:text-white flex items-center justify-center gap-2 transition";
        }
        if (costForm) costForm.classList.remove('hidden');
        if (invForm) invForm.classList.add('hidden');
    }
};

function saveNewInventoryItem() {
    const name = document.getElementById('newInvName').value.trim();
    const desc = document.getElementById('newInvDesc').value.trim();
    const cat = document.getElementById('newInvCategory').value;
    const qty = parseInt(document.getElementById('newInvQty').value, 10);
    const price = parseFloat(document.getElementById('newInvUnitPrice').value);

    if (!name || !desc || isNaN(qty) || qty <= 0 || isNaN(price) || price < 0) {
        showToast("Completa todos los campos obligatorios del producto.", "warning");
        return;
    }

    let icon = "fa-box";
    if (cat === "Maquinaria") icon = "fa-scissors";
    if (cat === "Herramientas") icon = "fa-wand-magic-sparkles";
    if (cat === "Accesorios") icon = "fa-grip-lines";
    if (cat === "Insumos") icon = "fa-spray-can";
    if (cat === "Movilidad") icon = "fa-motorcycle";

    const newItem = {
        id: "inv-" + Date.now(),
        name: name,
        description: desc,
        qty: qty,
        unitPrice: price,
        category: cat,
        icon: icon
    };

    state.inventory.push(newItem);
    localStorage.setItem('vbh_inventory', JSON.stringify(state.inventory));
    
    document.getElementById('formNewInventoryItem').reset();
    document.getElementById('newInvQty').value = 1;
    
    renderFinanceDashboard();
    renderFinanceInventory();
    showToast(`Producto "${name}" agregado al inventario.`, "success");
    switchFinanceTab('tabFinInventario');
}

function saveNewFixedCost() {
    const name = document.getElementById('newCostName').value.trim();
    const desc = document.getElementById('newCostDesc').value.trim();
    const amount = parseFloat(document.getElementById('newCostAmount').value);

    if (!name || isNaN(amount) || amount <= 0) {
        showToast("Por favor ingresa un concepto y monto válido.", "warning");
        return;
    }

    const newCost = {
        id: "fc-" + Date.now(),
        name: name,
        description: desc || "Gasto mensual recurrente",
        amount: amount,
        period: "Mensual",
        icon: "fa-receipt"
    };

    state.fixedCosts.push(newCost);
    localStorage.setItem('vbh_fixed_costs', JSON.stringify(state.fixedCosts));

    document.getElementById('formNewFixedCost').reset();

    renderFinanceDashboard();
    renderFinanceFixedCosts();
    showToast(`Costo fijo "${name}" registrado correctamente.`, "success");
    switchFinanceTab('tabFinCostosFijos');
}

window.editInventoryItem = function(id) {
    const item = state.inventory.find(i => i.id === id);
    if (!item) return;

    const newQtyStr = prompt(`Cantidad para "${item.name}":`, item.qty);
    if (newQtyStr === null) return;
    const newQty = parseInt(newQtyStr, 10);

    const newPriceStr = prompt(`Precio Unitario (p/u) para "${item.name}":`, item.unitPrice);
    if (newPriceStr === null) return;
    const newPrice = parseFloat(newPriceStr);

    if (isNaN(newQty) || newQty <= 0 || isNaN(newPrice) || newPrice < 0) {
        showToast("Valores inválidos. No se modificó el ítem.", "warning");
        return;
    }

    item.qty = newQty;
    item.unitPrice = newPrice;
    localStorage.setItem('vbh_inventory', JSON.stringify(state.inventory));

    renderFinanceDashboard();
    renderFinanceInventory();
    showToast(`Producto "${item.name}" actualizado.`, "success");
};

window.deleteInventoryItem = function(id) {
    const item = state.inventory.find(i => i.id === id);
    if (!item) return;

    if (confirm(`¿Eliminar "${item.name}" del inventario?`)) {
        state.inventory = state.inventory.filter(i => i.id !== id);
        localStorage.setItem('vbh_inventory', JSON.stringify(state.inventory));

        renderFinanceDashboard();
        renderFinanceInventory();
        showToast(`"${item.name}" eliminado del inventario.`, "info");
    }
};

window.editFixedCost = function(id) {
    const cost = state.fixedCosts.find(c => c.id === id);
    if (!cost) return;

    const newAmountStr = prompt(`Nuevo monto mensual para "${cost.name}":`, cost.amount);
    if (newAmountStr === null) return;
    const newAmount = parseFloat(newAmountStr);

    if (isNaN(newAmount) || newAmount <= 0) {
        showToast("Monto inválido.", "warning");
        return;
    }

    cost.amount = newAmount;
    localStorage.setItem('vbh_fixed_costs', JSON.stringify(state.fixedCosts));

    renderFinanceDashboard();
    renderFinanceFixedCosts();
    showToast(`Gasto "${cost.name}" actualizado a ${formatPrice(newAmount)}.`, "success");
};

window.deleteFixedCost = function(id) {
    const cost = state.fixedCosts.find(c => c.id === id);
    if (!cost) return;

    if (confirm(`¿Eliminar el costo fijo "${cost.name}"?`)) {
        state.fixedCosts = state.fixedCosts.filter(c => c.id !== id);
        localStorage.setItem('vbh_fixed_costs', JSON.stringify(state.fixedCosts));

        renderFinanceDashboard();
        renderFinanceFixedCosts();
        showToast(`Costo "${cost.name}" eliminado.`, "info");
    }
};

window.resetOriginalInventory = function() {
    if (confirm("¿Deseas restaurar la lista oficial de los 13 productos de la planilla original (Total: $4.830.000)?")) {
        state.inventory = JSON.parse(JSON.stringify(DEFAULT_INVENTORY));
        localStorage.setItem('vbh_inventory', JSON.stringify(state.inventory));

        state.fixedCosts = JSON.parse(JSON.stringify(DEFAULT_FIXED_COSTS));
        localStorage.setItem('vbh_fixed_costs', JSON.stringify(state.fixedCosts));

        renderFinanceDashboard();
        renderFinanceInventory();
        renderFinanceFixedCosts();
        showToast("Inventario y costos fijos restaurados a valores oficiales.", "success");
    }
};

window.exportInventoryJSON = function() {
    const exportData = {
        empresa: "VIP Barber Home",
        fechaExportacion: new Date().toISOString(),
        totalCostoInicial: state.inventory.reduce((acc, curr) => acc + (curr.qty * curr.unitPrice), 0),
        totalCostosFijosMensuales: state.fixedCosts.reduce((acc, curr) => acc + curr.amount, 0),
        inventario: state.inventory,
        costosFijos: state.fixedCosts
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `finanzas_inventario_barberia_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Datos de finanzas e inventario exportados correctamente.", "success");
};

