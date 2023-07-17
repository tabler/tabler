import { payments } from '@/config/tabler';
import { uiCdnUrl } from '@/config/site';

export default function PaymentsTable() {
  return (
    <table className="table">
      <tbody>
        {payments.map((payment) => (
          <tr key={payment.logo}>
            <td>
              <img
                src={`${uiCdnUrl}/dist/img/payments/${payment.logo}.svg`}
                height="40"
                alt={payment.name}
                className="rounded border"
              />
            </td>
            <td className="d-none lg:d-table-cell">
              <img
                src={`${uiCdnUrl}/dist/img/payments/${payment.logo}-dark.svg`}
                height="40"
                alt={payment.name}
                className="rounded border"
              />
            </td>
            <td className="d-none lg:d-table-cell">{payment.name}</td>
            <td>
              <code>{payment.logo}</code>
            </td>
            <td className="d-none lg:d-table-cell">
              <code>.payment-provider-{payment.logo}</code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
