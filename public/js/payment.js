 const tabs = document.querySelectorAll('.tab-btn');
  const methods = document.querySelectorAll('.payment-method');
  const form = document.getElementById('paymentForm');
  const errorMsg = document.getElementById('errorMsg');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      methods.forEach(m => m.classList.remove('active'));
      document.getElementById(tab.dataset.target).classList.add('active');
    });
  });

  document.getElementById('cardNumber').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    e.target.value = value.replace(/(.{4})/g, '$1 ').trim();
  });

  document.getElementById('expiry').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 3) {
      value = value.replace(/^(\d{2})(\d{1,2})$/, '$1/$2');
    }
    e.target.value = value;
  });

  // form.addEventListener('submit', (e) => {
  //   e.preventDefault();
  //   errorMsg.textContent = '';
  //   const activeTab = document.querySelector('.tab-btn.active').dataset.target;

  //   if (activeTab === 'card') {
  //     const name = document.getElementById('cardName').value.trim();
  //     const number = document.getElementById('cardNumber').value.replace(/\s/g, '');
  //     const expiry = document.getElementById('expiry').value.trim();
  //     const cvv = document.getElementById('cvv').value.trim();
  //     if (!name || number.length !== 16 || !/^\d{2}\/\d{2}$/.test(expiry) || cvv.length < 3) {
  //       errorMsg.textContent = 'Please enter valid card details.';
  //       return;
  //     }
  //   } else if (activeTab === 'upi') {
  //     const upiId = document.getElementById('upiId').value.trim();
  //     if (!upiId.includes('@')) {
  //       errorMsg.textContent = 'Please enter a valid UPI ID.';
  //       return;
  //     }
  //   }

  // });