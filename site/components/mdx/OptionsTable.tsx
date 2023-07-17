import { FC, ReactNode } from 'react';





export function OptionsTable({ children }) {
  return (
    <div className="options-table">
      {children}
    </div>
  );
}

export function OptionTitle({ children }) {
  return (
    <div className="options-table-title not-markdown">
      {children}
    </div>
  );
}

export function OptionDescription({ children }) {
  return <div className="options-table-description">{children}</div>;
}
