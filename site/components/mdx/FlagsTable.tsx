import { flags } from '@/config/tabler';
import { uiCdnUrl } from '@/config/site';

type Flag = {
  flag: string
  name: string
}

export default function FlagsTable () {

  return (
    <table className="table">
      <tbody>
        {flags.map((flag: Flag) => (
          <tr key={flag.flag}>
            <td>
              <img
                src={`${uiCdnUrl}/dist/img/flags/${flag.flag}.svg`}
                height="40"
                alt={flag.name}
                className="rounded border"
              />
            </td>
            <td className="d-none lg:d-table-cell">{flag.name}</td>
            <td>
              <code>{flag.flag}</code>
            </td>
            <td className="d-none lg:d-table-cell">
              <code>.flag-country-{flag.flag}</code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
