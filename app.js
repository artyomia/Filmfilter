const ROOM_NUMBERS = [
    ...Array.from({ length: 8 }, (_, i) => (101 + i).toString()),
    ...Array.from({ length: 11 }, (_, i) => (203 + i).toString()),
];

const DAILY_RATE = 300_000;
const MONTHLY_RATE = 5_200_000;
const STORAGE_KEY = 'jsc-dormitory-state-v1';
const DATE_OPTIONS = { year: 'numeric', month: '2-digit', day: '2-digit' };

const translations = {
    vi: {
        loginTitle: 'Chọn quyền truy cập',
        loginHint: 'Chọn vai trò phù hợp để tiếp tục sử dụng hệ thống.',
        loginAdmin: 'Đăng nhập quản trị',
        loginGuest: 'Khách đặt phòng',
        appTitle: 'Ký túc xá chuyên gia - JSC',
        appSubtitle: 'Quản lý phòng & hợp đồng thuê hiệu quả',
        logout: 'Đăng xuất',
        dashboardTitle: 'Tổng quan',
        exportCsv: 'Xuất báo cáo CSV',
        resetData: 'Khôi phục dữ liệu mẫu',
        statOccupied: 'Phòng đang có khách',
        statExpiring: 'Phòng sắp hết hạn (7 ngày)',
        statRevenue: 'Doanh thu tháng này',
        statRequests: 'Yêu cầu đặt phòng mới',
        roomStatusTitle: 'Trạng thái phòng',
        filterStatus: 'Lọc trạng thái:',
        filterAll: 'Tất cả',
        filterOccupied: 'Đang ở',
        filterAvailable: 'Trống',
        filterUpcoming: 'Sắp nhận phòng',
        colRoom: 'Phòng',
        colStatus: 'Tình trạng',
        colGuest: 'Khách thuê',
        colDates: 'Ngày nhận / trả',
        colAmount: 'Tính tiền',
        colActions: 'Thao tác',
        expiringTitle: 'Phòng sắp hết hạn',
        expiringHint: 'Trong vòng 7 ngày tới',
        rentalFormTitle: 'Ghi nhận hợp đồng thuê',
        formRoom: 'Chọn phòng',
        formGuest: 'Tên chuyên gia',
        formGuestPlaceholder: 'Nhập họ tên chuyên gia',
        formPosition: 'Chức vụ (nếu có)',
        formRolePlaceholder: 'Ví dụ: Trưởng phòng kỹ thuật',
        formCheckin: 'Ngày nhận phòng',
        formCheckout: 'Ngày trả phòng',
        formNotes: 'Ghi chú',
        formNotesPlaceholder: 'Yêu cầu đặc biệt, phụ phí...',
        formSubmit: 'Lưu hợp đồng',
        formReset: 'Xóa thông tin',
        formHint: '* Hệ thống tự động tính tiền dựa trên ngày nhận và trả phòng.',
        requestTitle: 'Đăng ký phòng cho chuyên gia',
        requestName: 'Tên chuyên gia',
        requestEmail: 'Email liên hệ',
        requestRoom: 'Phòng mong muốn',
        requestCheckin: 'Ngày nhận',
        requestCheckout: 'Ngày trả dự kiến',
        requestNotes: 'Ghi chú thêm',
        requestNotesPlaceholder: 'Ví dụ: cần đưa đón sân bay',
        requestSubmit: 'Gửi yêu cầu',
        requestListTitle: 'Yêu cầu đã gửi',
        statusOccupied: 'Đang ở',
        statusAvailable: 'Trống',
        statusUpcoming: 'Sắp nhận phòng',
        statusHistory: 'Đã trả phòng',
        actionCheckout: 'Trả phòng hôm nay',
        actionExtend: 'Gia hạn',
        actionArrive: 'Xác nhận nhận phòng',
        actionView: 'Xem lịch sử',
        noGuest: 'Chưa có khách',
        checkOutConfirm: 'Xác nhận trả phòng ngay hôm nay cho phòng {room}?',
        extendPrompt: 'Nhập ngày trả phòng mới cho phòng {room} (YYYY-MM-DD):',
        extendInvalid: 'Ngày trả phòng mới phải sau ngày nhận phòng hiện tại.',
        toastSaved: 'Đã lưu hợp đồng mới.',
        toastRequestSaved: 'Đã gửi yêu cầu đặt phòng.',
        toastCheckout: 'Đã cập nhật trả phòng.',
        toastExtend: 'Đã gia hạn thời gian lưu trú.',
        toastReset: 'Đã khôi phục dữ liệu mẫu.',
        toastTranslate: 'Đã chuyển sang tiếng Việt.',
        toastTranslateEn: 'Đã chuyển sang tiếng Anh.',
        csvHeader: ['Phòng', 'Khách thuê', 'Chức vụ', 'Ngày nhận', 'Ngày trả', 'Số ngày', 'Thành tiền (VND)', 'Ghi chú'],
        csvTitle: 'bao_cao_ky_tuc_xa.csv',
        validationDate: 'Ngày trả phòng phải sau ngày nhận phòng.',
        futureCheckinConfirm: 'Xác nhận khách đã nhận phòng cho phòng {room}?'
    },
    en: {
        loginTitle: 'Select access role',
        loginHint: 'Choose the role you want to use in the system.',
        loginAdmin: 'Sign in as admin',
        loginGuest: 'Guest booking portal',
        appTitle: 'JSC Expert Dormitory',
        appSubtitle: 'Track rooms & rental agreements effortlessly',
        logout: 'Sign out',
        dashboardTitle: 'Overview',
        exportCsv: 'Export CSV report',
        resetData: 'Restore sample data',
        statOccupied: 'Occupied rooms',
        statExpiring: 'Expiring in 7 days',
        statRevenue: 'Revenue this month',
        statRequests: 'New booking requests',
        roomStatusTitle: 'Room status',
        filterStatus: 'Filter status:',
        filterAll: 'All',
        filterOccupied: 'Occupied',
        filterAvailable: 'Available',
        filterUpcoming: 'Upcoming',
        colRoom: 'Room',
        colStatus: 'Status',
        colGuest: 'Guest',
        colDates: 'Check-in / Check-out',
        colAmount: 'Charges',
        colActions: 'Actions',
        expiringTitle: 'Expiring rooms',
        expiringHint: 'Within the next 7 days',
        rentalFormTitle: 'Record rental agreement',
        formRoom: 'Select room',
        formGuest: 'Expert name',
        formGuestPlaceholder: 'Enter expert full name',
        formPosition: 'Position (optional)',
        formRolePlaceholder: 'E.g. Technical Director',
        formCheckin: 'Check-in date',
        formCheckout: 'Check-out date',
        formNotes: 'Notes',
        formNotesPlaceholder: 'Special requests, surcharges…',
        formSubmit: 'Save agreement',
        formReset: 'Clear form',
        formHint: '* The system calculates fees automatically from check-in/check-out dates.',
        requestTitle: 'Request a room for experts',
        requestName: 'Expert name',
        requestEmail: 'Contact email',
        requestRoom: 'Preferred room',
        requestCheckin: 'Check-in date',
        requestCheckout: 'Planned check-out',
        requestNotes: 'Extra notes',
        requestNotesPlaceholder: 'E.g. needs airport pick-up',
        requestSubmit: 'Send request',
        requestListTitle: 'Submitted requests',
        statusOccupied: 'Occupied',
        statusAvailable: 'Available',
        statusUpcoming: 'Upcoming',
        statusHistory: 'Checked out',
        actionCheckout: 'Check-out today',
        actionExtend: 'Extend stay',
        actionArrive: 'Mark as checked-in',
        actionView: 'View history',
        noGuest: 'No guest yet',
        checkOutConfirm: 'Confirm checking out room {room} today?',
        extendPrompt: 'Enter new check-out date for room {room} (YYYY-MM-DD):',
        extendInvalid: 'New check-out date must be after the current check-in date.',
        toastSaved: 'Rental agreement saved.',
        toastRequestSaved: 'Booking request submitted.',
        toastCheckout: 'Check-out updated.',
        toastExtend: 'Stay extended.',
        toastReset: 'Sample data restored.',
        toastTranslate: 'Switched to Vietnamese.',
        toastTranslateEn: 'Switched to English.',
        csvHeader: ['Room', 'Guest', 'Position', 'Check-in', 'Check-out', 'Nights', 'Amount (VND)', 'Notes'],
        csvTitle: 'dormitory_report.csv',
        validationDate: 'Check-out date must be after check-in date.',
        futureCheckinConfirm: 'Confirm the guest has checked in to room {room}?'
    }
};

const deepClone = (value) => (typeof structuredClone === 'function'
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value)));

const createId = () => (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`);

const defaultState = {
    rentals: [
        {
            id: createId(),
            room: '205',
            guestName: 'Kim Sungdae',
            guestRole: 'QA Specialist',
            checkIn: '2025-10-16',
            checkOut: '2025-11-22',
            notes: 'Ưu tiên phòng yên tĩnh',
        },
        {
            id: createId(),
            room: '207',
            guestName: 'Lee Hyunwoo',
            guestRole: 'Automation Lead',
            checkIn: '2025-10-01',
            checkOut: '2025-10-30',
            notes: 'Cần đưa đón sân bay',
        },
        {
            id: createId(),
            room: '208',
            guestName: 'Nguyễn Văn Bình',
            guestRole: 'Chuyên gia an ninh',
            checkIn: '2025-10-24',
            checkOut: null,
            notes: 'Ở lại đến khi dự án kết thúc',
        },
        {
            id: createId(),
            room: '210',
            guestName: 'Trần Thị Mai',
            guestRole: 'Finance Manager',
            checkIn: '2025-09-10',
            checkOut: '2025-10-05',
            notes: '',
        },
        {
            id: createId(),
            room: '211',
            guestName: 'Hong Youngou',
            guestRole: 'Project Director',
            checkIn: '2025-09-29',
            checkOut: '2025-11-01',
            notes: 'Yêu cầu bếp riêng',
        },
        {
            id: createId(),
            room: '106',
            guestName: 'Lê Hồng Phúc',
            guestRole: 'Data Analyst',
            checkIn: '2025-11-02',
            checkOut: null,
            notes: 'Check-in muộn 21:00',
        },
        {
            id: createId(),
            room: '203',
            guestName: 'Sato Aki',
            guestRole: 'Consultant',
            checkIn: '2025-11-05',
            checkOut: '2025-11-25',
            notes: '',
        },
    ],
    requests: [
        {
            id: createId(),
            guestName: 'Park Jimin',
            email: 'pjimin@example.com',
            room: '209',
            checkIn: '2025-12-01',
            checkOut: '2025-12-20',
            notes: 'Ưu tiên phòng gần thang máy',
            createdAt: new Date().toISOString(),
        },
        {
            id: createId(),
            guestName: 'Nguyễn Thảo Vy',
            email: 'thaovy@example.com',
            room: '104',
            checkIn: '2025-11-18',
            checkOut: '2025-11-27',
            notes: '',
            createdAt: new Date().toISOString(),
        },
    ],
    language: 'vi',
};

let state = loadState();
let currentRole = null;

const elements = {
    overlay: document.getElementById('login-overlay'),
    adminLogin: document.getElementById('adminLogin'),
    guestLogin: document.getElementById('guestLogin'),
    logout: document.getElementById('logoutButton'),
    occupiedCount: document.getElementById('occupiedCount'),
    expiringCount: document.getElementById('expiringCount'),
    monthlyRevenue: document.getElementById('monthlyRevenue'),
    requestCount: document.getElementById('requestCount'),
    roomTable: document.getElementById('roomTable'),
    expiringList: document.getElementById('expiringList'),
    rentalForm: document.getElementById('rentalForm'),
    roomSelect: document.getElementById('roomSelect'),
    statusFilter: document.getElementById('statusFilter'),
    requestForm: document.getElementById('requestForm'),
    requestList: document.getElementById('requestList'),
    requestRoom: document.getElementById('requestRoom'),
    exportCsv: document.getElementById('exportCsv'),
    resetData: document.getElementById('resetData'),
    langButtons: document.querySelectorAll('.language-switcher .lang'),
};

init();

function init() {
    attachEventListeners();
    applyLanguage(state.language);
    populateRoomSelectors();
    renderAll();
    showOverlay();
}

function attachEventListeners() {
    elements.adminLogin.addEventListener('click', () => {
        currentRole = 'admin';
        document.body.classList.remove('guest-mode');
        hideOverlay();
    });

    elements.guestLogin.addEventListener('click', () => {
        currentRole = 'guest';
        document.body.classList.add('guest-mode');
        hideOverlay();
    });

    elements.logout.addEventListener('click', () => {
        currentRole = null;
        showOverlay();
    });

    elements.rentalForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (currentRole === 'guest') return;

        const formData = new FormData(elements.rentalForm);
        const room = formData.get('roomSelect') ?? elements.roomSelect.value;
        const guestName = formData.get('guestName') ?? document.getElementById('guestName').value.trim();
        const guestRole = formData.get('guestRole') ?? document.getElementById('guestRole').value.trim();
        const checkIn = formData.get('checkIn') ?? document.getElementById('checkIn').value;
        const checkOut = formData.get('checkOut') ?? document.getElementById('checkOut').value;
        const notes = formData.get('notes') ?? document.getElementById('notes').value.trim();

        if (!guestName || !checkIn) return;
        if (checkOut && parseDate(checkOut) <= parseDate(checkIn)) {
            toast('validationDate');
            return;
        }

        state.rentals.push({
            id: createId(),
            room,
            guestName,
            guestRole,
            checkIn,
            checkOut: checkOut || null,
            notes,
        });

        saveState();
        elements.rentalForm.reset();
        populateRoomSelectors();
        renderAll();
        toast('toastSaved');
    });

    elements.statusFilter.addEventListener('change', renderRoomTable);

    elements.requestForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(elements.requestForm);
        const guestName = formData.get('requestGuest')?.toString().trim();
        const email = formData.get('requestEmail')?.toString().trim();
        const room = formData.get('requestRoom')?.toString();
        const checkIn = formData.get('requestCheckIn')?.toString();
        const checkOut = formData.get('requestCheckOut')?.toString();
        const notes = formData.get('requestNotes')?.toString().trim() ?? '';

        if (!guestName || !email || !checkIn || !checkOut) {
            return;
        }

        if (parseDate(checkOut) <= parseDate(checkIn)) {
            toast('validationDate');
            return;
        }

        state.requests.push({
            id: createId(),
            guestName,
            email,
            room,
            checkIn,
            checkOut,
            notes,
            createdAt: new Date().toISOString(),
        });
        saveState();
        elements.requestForm.reset();
        renderRequests();
        renderDashboard();
        toast('toastRequestSaved');
    });

    elements.exportCsv.addEventListener('click', exportCsvReport);
    elements.resetData.addEventListener('click', () => {
        state = deepClone(defaultState);
        saveState();
        populateRoomSelectors();
        renderAll();
        toast('toastReset');
    });

    elements.langButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (lang && state.language !== lang) {
                applyLanguage(lang);
                saveState();
                toast(lang === 'vi' ? 'toastTranslate' : 'toastTranslateEn');
            }
        });
    });

    elements.roomTable.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const action = target.dataset.action;
        if (!action) return;
        const room = target.dataset.room;
        if (!room) return;
        switch (action) {
            case 'checkout':
                handleCheckout(room);
                break;
            case 'extend':
                handleExtend(room);
                break;
            case 'arrive':
                handleArrive(room);
                break;
        }
    });
}

function populateRoomSelectors() {
    const currentLang = state.language;
    const selectElements = [elements.roomSelect, elements.requestRoom];
    selectElements.forEach((select) => {
        if (!select) return;
        select.innerHTML = '';
        ROOM_NUMBERS.forEach((room) => {
            const option = document.createElement('option');
            option.value = room;
            const latest = getLatestRentalForRoom(room);
            const status = getRoomStatus(latest);
            const labelStatus = translateStatus(status, currentLang);
            option.textContent = `${room} · ${labelStatus}`;
            if (select === elements.roomSelect && status === 'occupied') {
                option.disabled = true;
            }
            select.appendChild(option);
        });
    });
}

function renderAll() {
    renderDashboard();
    renderRoomTable();
    renderExpiring();
    renderRequests();
}

function renderDashboard() {
    const occupiedRooms = ROOM_NUMBERS.filter((room) => getRoomStatus(getLatestRentalForRoom(room)) === 'occupied');
    elements.occupiedCount.textContent = occupiedRooms.length.toString();

    const expiring = getExpiringRentals();
    elements.expiringCount.textContent = expiring.length.toString();

    const revenue = calculateMonthlyRevenue();
    elements.monthlyRevenue.textContent = formatCurrency(revenue, state.language);

    elements.requestCount.textContent = state.requests.length.toString();
}

function renderRoomTable() {
    const fragment = document.createDocumentFragment();
    const filter = elements.statusFilter.value;
    const currentLang = state.language;

    ROOM_NUMBERS.forEach((room) => {
        const rental = getLatestRentalForRoom(room);
        const status = getRoomStatus(rental);
        if (filter !== 'all' && status !== filter) return;

        const tr = document.createElement('tr');
        const chargeInfo = rental ? calculateCharge(rental.checkIn, rental.checkOut) : { amount: 0, days: 0 };

        tr.innerHTML = `
            <td>${room}</td>
            <td>${renderStatusTag(status, currentLang)}</td>
            <td>${renderGuestInfo(rental, currentLang)}</td>
            <td>${renderDateRange(rental)}</td>
            <td>${rental ? formatCurrency(chargeInfo.amount, currentLang) : '-'}</td>
            <td>${renderActions(room, status)}</td>
        `;
        fragment.appendChild(tr);
    });

    elements.roomTable.innerHTML = '';
    elements.roomTable.appendChild(fragment);
}

function renderExpiring() {
    const expiring = getExpiringRentals();
    const list = elements.expiringList;
    list.innerHTML = '';
    const template = document.getElementById('expiringCardTemplate');
    if (!template) return;

    expiring.forEach((item) => {
        const clone = template.content.cloneNode(true);
        const title = clone.querySelector('.card-title');
        const dates = clone.querySelector('.card-dates');
        const amount = clone.querySelector('.card-amount');
        if (title) title.textContent = `${item.room} · ${item.guestName}`;
        if (dates) {
            const checkout = formatDate(item.checkOut ?? new Date().toISOString());
            dates.textContent = `${translate('formCheckout')}: ${checkout}`;
        }
        if (amount) amount.textContent = `${translate('colAmount')}: ${formatCurrency(item.amount, state.language)}`;
        list.appendChild(clone);
    });
}

function renderRequests() {
    if (!elements.requestList) return;
    elements.requestList.innerHTML = '';
    const template = document.getElementById('requestCardTemplate');
    if (!template) return;

    state.requests
        .slice()
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .forEach((request) => {
            const clone = template.content.cloneNode(true);
            clone.querySelector('.card-title').textContent = `${request.guestName} · ${request.room}`;
            clone.querySelector('.card-subtitle').textContent = request.email;
            clone.querySelector('.card-dates').textContent = `${formatDate(request.checkIn)} → ${formatDate(request.checkOut)}`;
            clone.querySelector('.card-notes').textContent = request.notes || '—';
            elements.requestList.appendChild(clone);
        });
}

function renderStatusTag(status, lang) {
    const label = translateStatus(status, lang);
    return `<span class="status-tag status-${status}">● ${label}</span>`;
}

function renderGuestInfo(rental, lang) {
    if (!rental) return `<span class="hint">${translate('noGuest', lang)}</span>`;
    const role = rental.guestRole ? ` · ${rental.guestRole}` : '';
    return `<strong>${rental.guestName}</strong>${role}`;
}

function renderDateRange(rental) {
    if (!rental) return '—';
    const checkIn = formatDate(rental.checkIn);
    const checkOut = rental.checkOut ? formatDate(rental.checkOut) : '—';
    return `${checkIn} → ${checkOut}`;
}

function renderActions(room, status) {
    if (currentRole === 'guest') return '';
    const actions = [];
    if (status === 'occupied') {
        actions.push(`<button class="secondary" data-room="${room}" data-action="checkout">${translate('actionCheckout')}</button>`);
        actions.push(`<button class="ghost" data-room="${room}" data-action="extend">${translate('actionExtend')}</button>`);
    } else if (status === 'upcoming') {
        actions.push(`<button class="primary" data-room="${room}" data-action="arrive">${translate('actionArrive')}</button>`);
    }
    return actions.length ? `<div class="actions">${actions.join('')}</div>` : '';
}

function handleCheckout(room) {
    const rental = getLatestRentalForRoom(room);
    if (!rental) return;
    const confirmation = confirm(replacePlaceholders(translate('checkOutConfirm'), { room }));
    if (!confirmation) return;
    rental.checkOut = toISODate(new Date());
    saveState();
    renderAll();
    toast('toastCheckout');
}

function handleExtend(room) {
    const rental = getLatestRentalForRoom(room);
    if (!rental) return;
    const response = prompt(replacePlaceholders(translate('extendPrompt'), { room }), rental.checkOut ?? '');
    if (!response) return;
    if (parseDate(response) <= parseDate(rental.checkIn)) {
        toast('extendInvalid');
        return;
    }
    rental.checkOut = response;
    saveState();
    renderAll();
    toast('toastExtend');
}

function handleArrive(room) {
    const rental = getLatestRentalForRoom(room);
    if (!rental) return;
    const confirmed = confirm(replacePlaceholders(translate('futureCheckinConfirm'), { room }));
    if (!confirmed) return;
    rental.checkIn = toISODate(new Date());
    saveState();
    renderAll();
}

function getLatestRentalForRoom(room) {
    return state.rentals
        .filter((r) => r.room === room)
        .slice()
        .sort((a, b) => parseDate(b.checkIn) - parseDate(a.checkIn))[0] ?? null;
}

function getRoomStatus(rental) {
    if (!rental) return 'available';
    const today = startOfDay(new Date());
    const checkIn = parseDate(rental.checkIn);
    const checkOut = rental.checkOut ? parseDate(rental.checkOut) : null;
    if (checkIn > today) return 'upcoming';
    if (!checkOut || checkOut >= today) return 'occupied';
    return 'available';
}

function calculateCharge(checkIn, checkOut) {
    if (!checkIn) return { days: 0, amount: 0 };
    const start = parseDate(checkIn);
    const end = checkOut ? parseDate(checkOut) : startOfDay(new Date());
    if (end <= start) return { days: 0, amount: 0 };
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const amount = diffDays <= 20 ? diffDays * DAILY_RATE : Math.ceil(diffDays / 30) * MONTHLY_RATE;
    return { days: diffDays, amount };
}

function calculateMonthlyRevenue() {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    let total = 0;

    state.rentals.forEach((rental) => {
        const start = parseDate(rental.checkIn);
        const end = rental.checkOut ? parseDate(rental.checkOut) : startOfDay(new Date());
        if (end <= monthStart || start >= monthEnd) return;

        const overlapStart = start < monthStart ? monthStart : start;
        const overlapEnd = end > monthEnd ? monthEnd : end;
        if (overlapEnd <= overlapStart) return;

        const totalDays = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
        const overlapDays = Math.ceil((overlapEnd - overlapStart) / (1000 * 60 * 60 * 24));
        const charge = calculateCharge(rental.checkIn, rental.checkOut).amount;
        total += charge * (overlapDays / totalDays);
    });

    return Math.round(total);
}

function getExpiringRentals() {
    const today = startOfDay(new Date());
    const limit = new Date(today);
    limit.setDate(limit.getDate() + 7);
    return state.rentals
        .filter((rental) => {
            if (!rental.checkOut) return false;
            const checkOut = parseDate(rental.checkOut);
            const checkIn = parseDate(rental.checkIn);
            return checkOut >= today && checkOut <= limit && checkIn <= today;
        })
        .map((rental) => ({
            ...rental,
            amount: calculateCharge(rental.checkIn, rental.checkOut).amount,
        }))
        .sort((a, b) => parseDate(a.checkOut) - parseDate(b.checkOut));
}

function exportCsvReport() {
    const header = translations[state.language].csvHeader;
    const rows = state.rentals.map((rental) => {
        const charge = calculateCharge(rental.checkIn, rental.checkOut);
        return [
            rental.room,
            rental.guestName,
            rental.guestRole,
            formatDate(rental.checkIn),
            rental.checkOut ? formatDate(rental.checkOut) : '',
            charge.days.toString(),
            charge.amount.toString(),
            rental.notes ?? '',
        ];
    });

    const csvContent = [header, ...rows]
        .map((row) => row.map((cell) => `"${(cell ?? '').replaceAll('"', '""')}"`).join(','))
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = translations[state.language].csvTitle;
    link.click();
    URL.revokeObjectURL(link.href);
}

function applyLanguage(lang) {
    state.language = lang;
    document.documentElement.lang = lang;
    elements.langButtons.forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (!key) return;
        el.textContent = translate(key, lang);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (!key) return;
        el.setAttribute('placeholder', translate(key, lang));
    });

    renderAll();
}

function translate(key, lang = state.language) {
    return translations[lang]?.[key] ?? translations.vi[key] ?? key;
}

function translateStatus(status, lang = state.language) {
    switch (status) {
        case 'occupied':
            return translate('statusOccupied', lang);
        case 'available':
            return translate('statusAvailable', lang);
        case 'upcoming':
            return translate('statusUpcoming', lang);
        default:
            return translate('statusHistory', lang);
    }
}

function toast(key) {
    const message = translate(key);
    if (!message) return;
    window.dispatchEvent(new CustomEvent('app-toast', { detail: message }));
    // fallback simple toast using alert-like bubble
    simpleToast(message);
}

let toastTimeout;
function simpleToast(message) {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.position = 'fixed';
        toastContainer.style.bottom = '20px';
        toastContainer.style.right = '20px';
        toastContainer.style.display = 'grid';
        toastContainer.style.gap = '0.5rem';
        toastContainer.style.zIndex = '999';
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.background = 'rgba(15, 23, 42, 0.9)';
    toast.style.color = '#fff';
    toast.style.padding = '0.65rem 1rem';
    toast.style.borderRadius = '12px';
    toast.style.boxShadow = '0 15px 30px rgba(15, 23, 42, 0.25)';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';

    toastContainer.appendChild(toast);
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    });

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 2600);
}

function loadState() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return deepClone(defaultState);
        const parsed = JSON.parse(stored);
        return {
            rentals: parsed.rentals ?? deepClone(defaultState.rentals),
            requests: parsed.requests ?? deepClone(defaultState.requests),
            language: parsed.language ?? 'vi',
        };
    } catch (error) {
        console.error('Failed to parse stored state', error);
        return deepClone(defaultState);
    }
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function startOfDay(date) {
    const copy = new Date(date);
    copy.setHours(0, 0, 0, 0);
    return copy;
}

function parseDate(value) {
    const date = new Date(value);
    date.setHours(0, 0, 0, 0);
    return date;
}

function toISODate(date) {
    return date.toISOString().split('T')[0];
}

function formatDate(value) {
    if (!value) return '';
    return new Intl.DateTimeFormat(state.language === 'vi' ? 'vi-VN' : 'en-GB', DATE_OPTIONS).format(new Date(value));
}

function formatCurrency(amount, lang = state.language) {
    return new Intl.NumberFormat(lang === 'vi' ? 'vi-VN' : 'en-US', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0,
    }).format(Math.round(amount));
}

function replacePlaceholders(template, replacements) {
    return Object.entries(replacements).reduce(
        (acc, [key, value]) => acc.replaceAll(`{${key}}`, value),
        template,
    );
}

function showOverlay() {
    elements.overlay.style.display = 'grid';
}

function hideOverlay() {
    elements.overlay.style.display = 'none';
}
