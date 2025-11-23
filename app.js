// Store all entries
let entries = [];

// DOM elements
const quantityInput = document.getElementById('quantity');
const priceInput = document.getElementById('price');
const addBtn = document.getElementById('addBtn');
const entriesTable = document.getElementById('entriesTable');
const totalQuantityEl = document.getElementById('totalQuantity');
const totalCostEl = document.getElementById('totalCost');
const averagePriceEl = document.getElementById('averagePrice');

// Add entry function
function addEntry() {
    const quantity = parseFloat(quantityInput.value);
    const price = parseFloat(priceInput.value);

    // Validation
    if (!quantity || quantity <= 0) {
        alert('Please enter a valid quantity');
        quantityInput.focus();
        return;
    }

    if (!price || price <= 0) {
        alert('Please enter a valid price');
        priceInput.focus();
        return;
    }

    // Create entry object
    const entry = {
        id: Date.now(),
        quantity: quantity,
        price: price,
        totalCost: quantity * price
    };

    // Add to entries array
    entries.push(entry);

    // Clear inputs
    quantityInput.value = '';
    priceInput.value = '';
    quantityInput.focus();

    // Update UI
    renderEntries();
    calculateDCA();
}

// Render entries in table
function renderEntries() {
    entriesTable.innerHTML = '';

    if (entries.length === 0) {
        entriesTable.innerHTML = `
            <tr>
                <td colspan="5" class="px-4 py-8 text-center text-gray-500">
                    No entries yet. Add your first purchase above!
                </td>
            </tr>
        `;
        return;
    }

    entries.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.className = 'border-b border-gray-100 hover:bg-gray-50 transition duration-150';
        row.innerHTML = `
            <td class="px-4 py-3 text-sm text-gray-700">${index + 1}</td>
            <td class="px-4 py-3 text-sm text-gray-700">${entry.quantity.toLocaleString()}</td>
            <td class="px-4 py-3 text-sm text-gray-700">$${entry.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
            <td class="px-4 py-3 text-sm text-gray-700">$${entry.totalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
            <td class="px-4 py-3 text-center">
                <button 
                    onclick="deleteEntry(${entry.id})"
                    class="text-red-600 hover:text-red-800 font-medium text-sm transition duration-150"
                >
                    Delete
                </button>
            </td>
        `;
        entriesTable.appendChild(row);
    });
}

// Delete entry function
function deleteEntry(id) {
    entries = entries.filter(entry => entry.id !== id);
    renderEntries();
    calculateDCA();
}

// Calculate DCA
function calculateDCA() {
    if (entries.length === 0) {
        totalQuantityEl.textContent = '0';
        totalCostEl.textContent = '$0.00';
        averagePriceEl.textContent = '$0.00';
        return;
    }

    // Calculate totals
    const totalQuantity = entries.reduce((sum, entry) => sum + entry.quantity, 0);
    const totalCost = entries.reduce((sum, entry) => sum + entry.totalCost, 0);
    const averagePrice = totalCost / totalQuantity;

    // Update UI
    totalQuantityEl.textContent = totalQuantity.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    totalCostEl.textContent = '$' + totalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    averagePriceEl.textContent = '$' + averagePrice.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

// Event listeners
addBtn.addEventListener('click', addEntry);

// Allow Enter key to add entry
quantityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        priceInput.focus();
    }
});

priceInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addEntry();
    }
});

// Initialize
renderEntries();
