const ROOM_NUMBERS = [
    ...Array.from({ length: 8 }, (_, i) => (101 + i).toString()),
    ...Array.from({ length: 11 }, (_, i) => (203 + i).toString()),
];

const DAILY_RATE = 300_000;
const MONTHLY_RATE = 5_200_000;
const STORAGE_KEY = 'jsc-dormitory-state-v3';
const ADMIN_PASSWORD = 'jscbauxeo';
const DATE_OPTIONS = { year: 'numeric', month: '2-digit', day: '2-digit' };

const translations = {
    vi: {
        loginTitle: 'Chọn quyền truy cập',
        loginHint: 'Chọn vai trò phù hợp để tiếp tục sử dụng hệ thống.',
        loginAdmin: 'Đăng nhập quản trị',
        loginGuest: 'Khách đặt phòng',
        loginPasswordLabel: 'Nhập mật khẩu quản trị',
        loginPasswordPlaceholder: 'Nhập mật khẩu',
        loginConfirm: 'Vào hệ thống',
        loginCancel: 'Hủy',
        loginError: 'Mật khẩu chưa đúng.',
        appTitle: 'Ký túc xá chuyên gia - JSC',
        appSubtitle: 'Quản lý phòng & hợp đồng thuê hiệu quả',
        logout: 'Đăng xuất',
        dashboardTitle: 'Tổng quan',
        exportCsv: 'Xuất báo cáo CSV',
        resetData: 'Làm mới dữ liệu trống',
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
        requestListTitle: 'Yêu cầu đã gửi',
        requestListHint: 'Khách có thể theo dõi trạng thái phê duyệt.',
        requestListEmpty: 'Chưa có yêu cầu nào.',
        requestStatusPending: 'Đang chờ duyệt',
        requestStatusApproved: 'Đã duyệt',
        requestStatusRejected: 'Từ chối',
        requestActionEdit: 'Chỉnh sửa',
        requestActionApprove: 'Duyệt',
        requestActionReject: 'Từ chối',
        historyTitle: 'Lưu trữ trả phòng',
        historyHint: 'Chỉ hiển thị cho quản trị viên',
        historyEmpty: 'Chưa có phòng nào được trả.',
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
        toastRequestUpdated: 'Đã cập nhật yêu cầu.',
        toastRequestApproved: 'Đã duyệt yêu cầu và tạo hợp đồng.',
        toastRequestRejected: 'Đã từ chối yêu cầu.',
        toastRequestLocked: 'Yêu cầu đã được duyệt, không thể chỉnh sửa.',
        toastCheckout: 'Đã cập nhật trả phòng.',
        toastExtend: 'Đã gia hạn thời gian lưu trú.',
        toastReset: 'Đã làm mới dữ liệu trống.',
        toastTranslate: 'Đã chuyển sang tiếng Việt.',
        toastTranslateEn: 'Đã chuyển sang tiếng Anh.',
        csvHeader: ['Phòng', 'Khách thuê', 'Chức vụ', 'Ngày nhận', 'Ngày trả', 'Số ngày', 'Thành tiền (VND)', 'Ghi chú'],
        csvTitle: 'bao_cao_ky_tuc_xa.csv',
        validationDate: 'Ngày trả phòng phải sau ngày nhận phòng.',
        futureCheckinConfirm: 'Xác nhận khách đã nhận phòng cho phòng {room}?',
        requestApproveConfirm: 'Xác nhận duyệt yêu cầu cho phòng {room}?',
        requestRejectConfirm: 'Từ chối yêu cầu cho phòng {room}?',
        formSubmitAdmin: 'Lưu hợp đồng',
        formSubmitAdminUpdate: 'Cập nhật yêu cầu',
        formSubmitGuest: 'Gửi yêu cầu',
        formSubmitGuestUpdate: 'Cập nhật yêu cầu',
        formHintAdmin: '* Hệ thống tự động tính tiền dựa trên ngày nhận và trả phòng.',
        formHintGuest: '* Yêu cầu sẽ được gửi tới quản trị viên để xét duyệt.',
        formNoticeEditing: 'Đang chỉnh sửa yêu cầu cho phòng {room}.',
        requestUpdatedAt: 'Cập nhật: {date}'
    },
    en: {
        loginTitle: 'Select access role',
        loginHint: 'Choose the role you want to use in the system.',
        loginAdmin: 'Sign in as admin',
        loginGuest: 'Guest booking portal',
        loginPasswordLabel: 'Enter administrator password',
        loginPasswordPlaceholder: 'Enter password',
        loginConfirm: 'Enter dashboard',
        loginCancel: 'Cancel',
        loginError: 'Password is incorrect.',
        appTitle: 'JSC Expert Dormitory',
        appSubtitle: 'Track rooms & rental agreements effortlessly',
        logout: 'Sign out',
        dashboardTitle: 'Overview',
        exportCsv: 'Export CSV report',
        resetData: 'Reset to blank data',
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
        requestListTitle: 'Submitted requests',
        requestListHint: 'Guests can monitor approval status.',
        requestListEmpty: 'No requests yet.',
        requestStatusPending: 'Pending',
        requestStatusApproved: 'Approved',
        requestStatusRejected: 'Rejected',
        requestActionEdit: 'Edit',
        requestActionApprove: 'Approve',
        requestActionReject: 'Reject',
        historyTitle: 'Check-out archive',
        historyHint: 'Visible to administrators only',
        historyEmpty: 'No completed stays yet.',
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
        toastRequestUpdated: 'Request updated.',
        toastRequestApproved: 'Request approved and converted to an agreement.',
        toastRequestRejected: 'Request rejected.',
        toastRequestLocked: 'Approved requests cannot be edited.',
        toastCheckout: 'Check-out updated.',
        toastExtend: 'Stay extended.',
        toastReset: 'Blank dataset restored.',
        toastTranslate: 'Switched to Vietnamese.',
        toastTranslateEn: 'Switched to English.',
        csvHeader: ['Room', 'Guest', 'Position', 'Check-in', 'Check-out', 'Nights', 'Amount (VND)', 'Notes'],
        csvTitle: 'dormitory_report.csv',
        validationDate: 'Check-out date must be after check-in date.',
        futureCheckinConfirm: 'Confirm the guest has checked in to room {room}?',
        requestApproveConfirm: 'Approve the request for room {room}?',
        requestRejectConfirm: 'Reject the request for room {room}?',
        formSubmitAdmin: 'Save agreement',
        formSubmitAdminUpdate: 'Update request',
        formSubmitGuest: 'Submit request',
        formSubmitGuestUpdate: 'Update request',
        formHintAdmin: '* The system calculates fees automatically from check-in/check-out dates.',
        formHintGuest: '* Your request will wait for administrator approval before assignment.',
        formNoticeEditing: 'Editing request for room {room}.',
        requestUpdatedAt: 'Updated: {date}'
    }
};

const ACTION_CONFIG = {
    checkout: { icon: '🚪', variant: 'checkout', labelKey: 'actionCheckout' },
    extend: { icon: '🕒', variant: 'extend', labelKey: 'actionExtend' },
    arrive: { icon: '✅', variant: 'arrive', labelKey: 'actionArrive' },
};

const deepClone = (value) => (typeof structuredClone === 'function'
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value)));

const createId = () => (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`);

const defaultState = {
    rentals: [],
    requests: [],
    history: [],
    language: 'vi',
};

let state = loadState();
if (!Array.isArray(state.history)) {
    state.history = [];
}
let currentRole = null;
let editingRequestId = null;

state.requests = state.requests.map((request) => ({
    ...request,
    status: request.status ?? 'pending',
    checkOut: request.checkOut || null,
    notes: request.notes ?? '',
    guestRole: request.guestRole ?? '',
    createdAt: request.createdAt ?? new Date().toISOString(),
    updatedAt: request.updatedAt ?? request.createdAt ?? new Date().toISOString(),
}));

const elements = {
    overlay: document.getElementById('login-overlay'),
    adminLogin: document.getElementById('adminLogin'),
    guestLogin: document.getElementById('guestLogin'),
    roleSelection: document.getElementById('roleSelection'),
    adminForm: document.getElementById('adminAccessForm'),
    adminPassword: document.getElementById('adminPassword'),
    adminCancel: document.getElementById('adminCancel'),
    adminError: document.getElementById('adminPasswordError'),
    logout: document.getElementById('logoutButton'),
    occupiedCount: document.getElementById('occupiedCount'),
    expiringCount: document.getElementById('expiringCount'),
    monthlyRevenue: document.getElementById('monthlyRevenue'),
    requestCount: document.getElementById('requestCount'),
    roomTable: document.getElementById('roomTable'),
    historyTable: document.getElementById('historyTable'),
    expiringList: document.getElementById('expiringList'),
    rentalForm: document.getElementById('rentalForm'),
    roomSelect: document.getElementById('roomSelect'),
    statusFilter: document.getElementById('statusFilter'),
    requestList: document.getElementById('requestList'),
    exportCsv: document.getElementById('exportCsv'),
    resetData: document.getElementById('resetData'),
    langButtons: document.querySelectorAll('.language-switcher .lang'),
    formNotice: document.getElementById('formNotice'),
    formSubmit: document.querySelector('#rentalForm button[type="submit"]'),
    formHint: document.querySelector('.form-hint'),
    guestName: document.getElementById('guestName'),
    guestRole: document.getElementById('guestRole'),
    checkIn: document.getElementById('checkIn'),
    checkOut: document.getElementById('checkOut'),
    notes: document.getElementById('notes'),
};

init();

function init() {
    attachEventListeners();
    applyLanguage(state.language);
    updateRoleUI();
    showOverlay();
}

function attachEventListeners() {
    elements.adminLogin?.addEventListener('click', () => {
        elements.roleSelection?.classList.add('hidden');
        elements.adminForm?.classList.remove('hidden');
        elements.adminError?.classList.add('hidden');
        if (elements.adminPassword) {
            elements.adminPassword.value = '';
            elements.adminPassword.focus();
        }
    });

    elements.adminCancel?.addEventListener('click', () => {
        resetAdminAccess();
    });

    elements.adminForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        const password = elements.adminPassword?.value ?? '';
        if (password === ADMIN_PASSWORD) {
            currentRole = 'admin';
            document.body.classList.remove('guest-mode');
            hideOverlay();
            renderAll();
            updateRoleUI();
        } else {
            elements.adminError?.classList.remove('hidden');
            elements.adminPassword?.focus();
            elements.adminPassword?.select?.();
        }
    });

    elements.adminPassword?.addEventListener('input', () => {
        elements.adminError?.classList.add('hidden');
    });

    elements.guestLogin?.addEventListener('click', () => {
        currentRole = 'guest';
        document.body.classList.add('guest-mode');
        hideOverlay();
        renderAll();
        updateRoleUI();
    });

    elements.logout?.addEventListener('click', () => {
        currentRole = null;
        document.body.classList.remove('guest-mode');
        clearEditingRequest();
        showOverlay();
        renderAll();
        updateRoleUI();
    });

    elements.rentalForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(elements.rentalForm);
        const room = formData.get('roomSelect') ?? elements.roomSelect.value;
        const guestName = (formData.get('guestName') ?? elements.guestName?.value ?? '').toString().trim();
        const guestRole = (formData.get('guestRole') ?? elements.guestRole?.value ?? '').toString().trim();
        const checkIn = (formData.get('checkIn') ?? elements.checkIn?.value ?? '').toString();
        const checkOut = (formData.get('checkOut') ?? elements.checkOut?.value ?? '').toString();
        const notes = (formData.get('notes') ?? elements.notes?.value ?? '').toString().trim();

        if (!guestName || !checkIn) return;
        if (checkOut && parseDate(checkOut) <= parseDate(checkIn)) {
            toast('validationDate');
            return;
        }

        if (currentRole === 'guest') {
            handleGuestRequestSubmission({ room, guestName, guestRole, checkIn, checkOut, notes });
            return;
        }

        if (editingRequestId) {
            handleAdminRequestUpdate({ room, guestName, guestRole, checkIn, checkOut, notes });
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
        updateRoleUI();
        toast('toastSaved');
    });

    elements.statusFilter.addEventListener('change', renderRoomTable);

    elements.rentalForm.addEventListener('reset', () => {
        clearEditingRequest(false);
    });

    elements.requestList?.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const button = target.closest('button[data-request-action]');
        if (!(button instanceof HTMLElement)) return;
        const action = button.dataset.requestAction;
        const id = button.dataset.requestId;
        if (!action || !id) return;
        switch (action) {
            case 'edit':
                startEditRequest(id);
                break;
            case 'approve':
                handleApproveRequest(id);
                break;
            case 'reject':
                handleRejectRequest(id);
                break;
        }
    });

    elements.exportCsv.addEventListener('click', exportCsvReport);
    elements.resetData.addEventListener('click', () => {
        state = deepClone(defaultState);
        clearEditingRequest();
        saveState();
        populateRoomSelectors();
        renderAll();
        updateRoleUI();
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
        const button = target.closest('button[data-action]');
        if (!(button instanceof HTMLElement)) return;
        const action = button.dataset.action;
        if (!action) return;
        const room = button.dataset.room;
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
    renderHistory();
}

function renderDashboard() {
    const occupiedRooms = ROOM_NUMBERS.filter((room) => getRoomStatus(getLatestRentalForRoom(room)) === 'occupied');
    elements.occupiedCount.textContent = occupiedRooms.length.toString();

    const expiring = getExpiringRentals();
    elements.expiringCount.textContent = expiring.length.toString();

    const revenue = calculateMonthlyRevenue();
    elements.monthlyRevenue.textContent = formatCurrency(revenue, state.language);

    const pendingRequests = state.requests.filter((request) => (request.status ?? 'pending') === 'pending');
    elements.requestCount.textContent = pendingRequests.length.toString();
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
            <td class="cell-room">${room}</td>
            <td class="cell-status">${renderStatusTag(status, currentLang)}</td>
            <td class="cell-guest">${renderGuestInfo(rental, currentLang)}</td>
            <td class="cell-dates">${renderDateRange(rental)}</td>
            <td class="cell-amount">${rental ? formatCurrency(chargeInfo.amount, currentLang) : '-'}</td>
            <td class="cell-actions">${renderActions(room, status)}</td>
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
    const list = elements.requestList;
    if (!list) return;
    list.innerHTML = '';

    const requests = state.requests
        .slice()
        .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0));

    if (!requests.length) {
        const empty = document.createElement('li');
        empty.className = 'card empty';
        empty.textContent = translate('requestListEmpty');
        list.appendChild(empty);
        return;
    }

    requests.forEach((request) => {
        const status = request.status ?? 'pending';
        const item = document.createElement('li');
        item.className = 'card request-card';
        item.dataset.status = status;

        const header = document.createElement('div');
        header.className = 'request-header';

        const title = document.createElement('h4');
        title.className = 'card-title';
        title.textContent = `${request.room || '---'} · ${request.guestName}`;

        const statusTag = document.createElement('span');
        statusTag.className = `request-status ${status}`;
        statusTag.textContent = translateRequestStatus(status);

        header.append(title, statusTag);
        item.appendChild(header);

        const meta = document.createElement('div');
        meta.className = 'request-meta';

        const dates = document.createElement('p');
        const checkIn = request.checkIn ? formatDate(request.checkIn) : '—';
        const checkOut = request.checkOut ? formatDate(request.checkOut) : '—';
        dates.textContent = `${translate('formCheckin')}: ${checkIn} · ${translate('formCheckout')}: ${checkOut}`;
        meta.appendChild(dates);

        if (request.guestRole) {
            const role = document.createElement('p');
            role.textContent = `${translate('formPosition')}: ${request.guestRole}`;
            meta.appendChild(role);
        }

        if (request.notes) {
            const note = document.createElement('p');
            note.textContent = `${translate('formNotes')}: ${request.notes}`;
            meta.appendChild(note);
        }

        const updatedLabel = request.updatedAt ?? request.createdAt;
        if (updatedLabel) {
            const updated = document.createElement('p');
            updated.textContent = replacePlaceholders(translate('requestUpdatedAt'), {
                date: formatDate(updatedLabel),
            });
            meta.appendChild(updated);
        }

        item.appendChild(meta);

        const actions = buildRequestActions(request);
        if (actions) {
            item.appendChild(actions);
        }

        list.appendChild(item);
    });
}

function buildRequestActions(request) {
    const role = currentRole ?? 'admin';
    const status = request.status ?? 'pending';
    const container = document.createElement('div');
    container.className = 'request-actions';

    if (role === 'guest' && status === 'pending') {
        container.appendChild(createRequestActionButton('requestActionEdit', 'edit', request.id));
    }

    if (role === 'admin') {
        if (status === 'pending') {
            container.appendChild(createRequestActionButton('requestActionEdit', 'edit', request.id));
            container.appendChild(createRequestActionButton('requestActionApprove', 'approve', request.id, 'primary'));
            container.appendChild(createRequestActionButton('requestActionReject', 'reject', request.id, 'ghost danger'));
        }
    }

    return container.childElementCount ? container : null;
}

function createRequestActionButton(labelKey, action, id, className = 'ghost') {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = className;
    button.dataset.requestAction = action;
    button.dataset.requestId = id;
    button.textContent = translate(labelKey);
    return button;
}

function translateRequestStatus(status, lang = state.language) {
    switch (status) {
        case 'approved':
            return translate('requestStatusApproved', lang);
        case 'rejected':
            return translate('requestStatusRejected', lang);
        default:
            return translate('requestStatusPending', lang);
    }
}

function getRequestById(id) {
    return state.requests.find((request) => request.id === id) ?? null;
}

function handleGuestRequestSubmission({ room, guestName, guestRole, checkIn, checkOut, notes }) {
    const normalized = {
        room,
        guestName,
        guestRole,
        checkIn,
        checkOut: checkOut || null,
        notes,
    };

    if (editingRequestId) {
        const request = getRequestById(editingRequestId);
        if (!request) {
            clearEditingRequest();
            renderRequests();
            renderDashboard();
            return;
        }
        if (request.status !== 'pending') {
            toast('toastRequestLocked');
            clearEditingRequest();
            renderRequests();
            return;
        }

        Object.assign(request, normalized);
        request.updatedAt = new Date().toISOString();
        saveState();
        clearEditingRequest();
        renderRequests();
        renderDashboard();
        toast('toastRequestUpdated');
        return;
    }

    state.requests.push({
        id: createId(),
        ...normalized,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    });
    saveState();
    elements.rentalForm.reset();
    renderRequests();
    renderDashboard();
    updateRoleUI();
    toast('toastRequestSaved');
}

function handleAdminRequestUpdate({ room, guestName, guestRole, checkIn, checkOut, notes }) {
    if (!editingRequestId) return;
    const request = getRequestById(editingRequestId);
    if (!request) {
        clearEditingRequest();
        return;
    }
    if (request.status !== 'pending') {
        toast('toastRequestLocked');
        clearEditingRequest();
        renderRequests();
        return;
    }

    Object.assign(request, {
        room,
        guestName,
        guestRole,
        checkIn,
        checkOut: checkOut || null,
        notes,
    });
    request.updatedAt = new Date().toISOString();
    saveState();
    clearEditingRequest();
    renderRequests();
    renderDashboard();
    toast('toastRequestUpdated');
}

function startEditRequest(id) {
    const request = getRequestById(id);
    if (!request) return;
    if (request.status !== 'pending') {
        toast('toastRequestLocked');
        return;
    }

    editingRequestId = request.id;
    populateRoomSelectors();

    if (elements.roomSelect) {
        const options = Array.from(elements.roomSelect.options || []);
        const currentOption = options.find((option) => option.value === request.room);
        if (currentOption) {
            currentOption.disabled = false;
        }
        elements.roomSelect.value = request.room;
    }
    if (elements.guestName) elements.guestName.value = request.guestName ?? '';
    if (elements.guestRole) elements.guestRole.value = request.guestRole ?? '';
    if (elements.checkIn) elements.checkIn.value = request.checkIn ?? '';
    if (elements.checkOut) elements.checkOut.value = request.checkOut ?? '';
    if (elements.notes) elements.notes.value = request.notes ?? '';

    updateRoleUI();
    elements.guestName?.focus?.();
}

function clearEditingRequest(resetForm = true) {
    if (resetForm) {
        elements.rentalForm?.reset();
    }
    editingRequestId = null;
    populateRoomSelectors();
    updateRoleUI();
}

function handleApproveRequest(id) {
    if (currentRole !== 'admin') return;
    const request = getRequestById(id);
    if (!request || request.status !== 'pending') return;
    const confirmed = confirm(replacePlaceholders(translate('requestApproveConfirm'), { room: request.room }));
    if (!confirmed) return;

    const rental = {
        id: createId(),
        room: request.room,
        guestName: request.guestName,
        guestRole: request.guestRole,
        checkIn: request.checkIn,
        checkOut: request.checkOut || null,
        notes: request.notes,
        sourceRequestId: request.id,
    };

    state.rentals.push(rental);
    request.status = 'approved';
    request.linkedRentalId = rental.id;
    request.updatedAt = new Date().toISOString();
    saveState();

    if (editingRequestId === id) {
        clearEditingRequest();
    }

    populateRoomSelectors();
    renderAll();
    updateRoleUI();
    toast('toastRequestApproved');
}

function handleRejectRequest(id) {
    if (currentRole !== 'admin') return;
    const request = getRequestById(id);
    if (!request || request.status !== 'pending') return;
    const confirmed = confirm(replacePlaceholders(translate('requestRejectConfirm'), { room: request.room }));
    if (!confirmed) return;

    request.status = 'rejected';
    request.updatedAt = new Date().toISOString();
    saveState();

    if (editingRequestId === id) {
        clearEditingRequest();
    } else {
        updateRoleUI();
    }

    renderRequests();
    renderDashboard();
    toast('toastRequestRejected');
}

function updateRoleUI() {
    const role = currentRole ?? 'admin';
    document.body.classList.toggle('guest-mode', role === 'guest');
    updateFormCopy(role);
}

function updateFormCopy(role = currentRole ?? 'admin') {
    const submit = elements.formSubmit;
    const hint = elements.formHint;
    const notice = elements.formNotice;
    const activeRequest = editingRequestId ? getRequestById(editingRequestId) : null;
    const isEditingPending = Boolean(activeRequest && activeRequest.status === 'pending');

    if (submit) {
        let key;
        if (role === 'guest') {
            key = isEditingPending ? 'formSubmitGuestUpdate' : 'formSubmitGuest';
        } else if (isEditingPending) {
            key = 'formSubmitAdminUpdate';
        } else {
            key = 'formSubmitAdmin';
        }
        submit.textContent = translate(key);
    }

    if (hint) {
        const hintKey = role === 'guest' ? 'formHintGuest' : 'formHintAdmin';
        hint.textContent = translate(hintKey);
    }

    if (notice) {
        if (isEditingPending && activeRequest) {
            notice.textContent = replacePlaceholders(translate('formNoticeEditing'), { room: activeRequest.room });
            notice.classList.remove('hidden');
        } else {
            notice.classList.add('hidden');
            notice.textContent = '';
        }
    }
}

function renderHistory() {
    if (!elements.historyTable) return;
    const fragment = document.createDocumentFragment();

    if (!state.history.length) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 4;
        td.className = 'cell-empty';
        td.textContent = translate('historyEmpty');
        tr.appendChild(td);
        fragment.appendChild(tr);
    } else {
        state.history
            .slice()
            .sort((a, b) => parseDate(b.checkOut ?? b.checkIn) - parseDate(a.checkOut ?? a.checkIn))
            .forEach((record) => {
                const amount = record.amount ?? calculateCharge(record.checkIn, record.checkOut).amount;
                const role = record.guestRole ? ` · ${record.guestRole}` : '';
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td class="cell-room">${record.room}</td>
                    <td class="cell-guest"><strong>${record.guestName}</strong>${role}</td>
                    <td class="cell-dates">${renderDateRange(record)}</td>
                    <td class="cell-amount">${formatCurrency(amount, state.language)}</td>
                `;
                fragment.appendChild(tr);
            });
    }

    elements.historyTable.innerHTML = '';
    elements.historyTable.appendChild(fragment);
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
    if (currentRole !== 'admin') return '';
    const actions = [];
    if (status === 'occupied') {
        actions.push(renderActionButton('checkout', room));
        actions.push(renderActionButton('extend', room));
    } else if (status === 'upcoming') {
        actions.push(renderActionButton('arrive', room));
    }
    return actions.length ? `<div class="actions">${actions.join('')}</div>` : '';
}

function renderActionButton(action, room) {
    const config = ACTION_CONFIG[action];
    if (!config) return '';
    const label = translate(config.labelKey);
    return `<button type="button" class="icon-button" data-room="${room}" data-action="${action}" data-variant="${config.variant}" title="${label}" aria-label="${label}"><span aria-hidden="true">${config.icon}</span><span class="sr-only">${label}</span></button>`;
}

function handleCheckout(room) {
    if (currentRole !== 'admin') return;
    const rental = getLatestRentalForRoom(room);
    if (!rental) return;
    const confirmation = confirm(replacePlaceholders(translate('checkOutConfirm'), { room }));
    if (!confirmation) return;
    const today = toISODate(new Date());
    const charge = calculateCharge(rental.checkIn, today);
    const archived = {
        ...rental,
        checkOut: today,
        amount: charge.amount,
        days: charge.days,
        archivedAt: new Date().toISOString(),
    };
    state.rentals = state.rentals.filter((entry) => entry.id !== rental.id);
    state.history.unshift(archived);
    saveState();
    populateRoomSelectors();
    renderAll();
    toast('toastCheckout');
}

function handleExtend(room) {
    if (currentRole !== 'admin') return;
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
    if (currentRole !== 'admin') return;
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

    const rentals = [...state.rentals, ...state.history];
    rentals.forEach((rental) => {
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
    const rows = [...state.rentals, ...state.history].map((rental) => {
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

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
        const key = el.getAttribute('data-i18n-html');
        if (!key) return;
        el.innerHTML = translate(key, lang);
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

    populateRoomSelectors();
    renderAll();
    updateRoleUI();
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
            history: parsed.history ?? deepClone(defaultState.history),
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
    resetAdminAccess();
    elements.overlay.style.display = 'grid';
}

function hideOverlay() {
    elements.overlay.style.display = 'none';
}

function resetAdminAccess() {
    elements.roleSelection?.classList.remove('hidden');
    elements.adminForm?.classList.add('hidden');
    if (elements.adminPassword) {
        elements.adminPassword.value = '';
    }
    elements.adminError?.classList.add('hidden');
}
