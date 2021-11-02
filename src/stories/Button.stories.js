export default {
  title: 'Example/Button',
};

const Template = ({ label, ...args }) => {
  return `<button class="btn">${label}</button>`;
};

export const Primary = () => `<button class="btn btn-primary">Primary button</button>`;

export const Secondary = () => `<button class="btn">Secondary button</button>`;

export const Danger = () => `<button class="btn btn-danger">Danger button</button>`;

export const Large = () => `<button class="btn btn-lg">Large button</button>`;

export const Small = () => `<button class="btn btn-sm">Small button</button>`;