import Icon from '@/components/Icon';

export function TipBad({ children }) {
  return (
    <div className="tip font-medium">
      <Icon name="circle-x-filled" color="red" />
      {children}
    </div>
  );
}

export function TipGood({ children }) {
  return (
    <div className="tip font-medium">
      <Icon name="circle-check-filled" color="green" />
      {children}
    </div>
  );
}

export function TipChanges({ children }) {
  return (
    <div className="tip font-medium">
      <Icon name="alert-circle-filled" color="violet" />
      {children}
    </div>
  );
}
