type RequiredField = HTMLInputElement | HTMLTextAreaElement;

function validate(field: RequiredField): boolean {
  let message = '';
  if (!field.value.trim()) {
    message = field.dataset.missing ?? 'Vyplňte toto pole.';
  } else if (field.validity.typeMismatch) {
    message = 'Zadejte platnou e-mailovou adresu.';
  }

  field.setAttribute('aria-invalid', String(Boolean(message)));
  document.getElementById(field.id + '-error')!.textContent = message;
  return !message;
}

function enableDemo(form: HTMLFormElement) {
  const fields = [...form.querySelectorAll<RequiredField>('[required]')];
  const status = form.querySelector<HTMLElement>('[role="status"]')!;
  const service = form.querySelector('select')!;

  for (const field of fields) {
    field.addEventListener('blur', () => {
      if (field.value || field.hasAttribute('aria-invalid')) validate(field);
    });
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validate(field);
    });
  }

  form.addEventListener('input', () => { status.textContent = ''; });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const invalid = fields.filter(field => !validate(field));
    if (invalid.length) {
      status.textContent = '';
      invalid[0].focus();
      return;
    }
    status.textContent = 'Toto je ukázkový formulář. Žádné údaje nebyly odeslány.';
  });

  for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-service]')) {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      service.value = link.dataset.service ?? '';
      status.textContent = '';
    });
  }

  status.textContent = '';
  form.querySelector('fieldset')!.disabled = false;
}

const demoForm = document.querySelector<HTMLFormElement>('#servisni-formular[data-demo="true"]');
if (demoForm) enableDemo(demoForm);
