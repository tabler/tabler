import { colors } from '@/config/tabler';

type Color = {
  name: string
  value: string
  variable?: string
}

export default function ColorsTable({ name }: { name: string }) {
  if (!colors[name]) {
    return null;
  }

  return (
    <div className="colors-table mt-5 mb-6">
      <div className="row">
        {colors[name].map((color: Color, i: number) => (
          <div className="col-3" key={i}>
            <div className="row g-3 items-center">
              <div className="col-auto">
                <div className="avatar avatar-lg" style={{ backgroundColor: color.value }}></div>
              </div>
              <div className="col">
                <div className="font-bold">{color.name}</div>
                <div>
                  <code>{color.value}</code>
                </div>
              </div>
              {/*<div className="col-auto">*/}
              {/*  <code>{color.variable}</code>*/}
              {/*</div>*/}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
