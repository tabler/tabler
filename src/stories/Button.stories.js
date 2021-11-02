export default {
  title: 'Example/Button',
};

const Template = ({ label, ...args }) => {
  return `<button class="btn">${label}</button>`;
};

export const Primary = () => `<button class="btn btn-primary">Button</button>`;

export const Secondary = () => `<button class="btn">Button</button>`;

export const Large = () => `<button class="btn btn-lg">Button</button>`;

export const Small = () => `<button class="btn btn-sm">Button</button>`;